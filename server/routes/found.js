const express = require('express');
require('dotenv').config();
const router = express.Router();
const multer = require('multer');
const path = require('path');
const FoundChild = require('../models/FoundChild');
const LostChild = require('../models/LostChild');
const User = require('../models/User');
const auth = require('../middleware/auth');
const faceapi = require('face-api.js');
const { Canvas, Image, ImageData } = require('canvas');
const { createCanvas, loadImage } = require('canvas'); // Explicitly import loadImage
const { sendNotification } = require('../utils/notifications');
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

// Define the correct path to the models directory
const modelsPath = path.join(__dirname, '../models');

const upload = multer({ dest: 'uploads/' });

// Load face-api.js models with error handling
(async () => {
  try {
    console.log('Loading SSD Mobilenetv1...');
    await faceapi.nets.ssdMobilenetv1.loadFromDisk(modelsPath);
    console.log('SSD Mobilenetv1 loaded');

    console.log('Loading Face Landmark 68...');
    await faceapi.nets.faceLandmark68Net.loadFromDisk(modelsPath);
    console.log('Face Landmark 68 loaded');

    console.log('Loading Face Recognition...');
    await faceapi.nets.faceRecognitionNet.loadFromDisk(modelsPath);
    console.log('Face Recognition loaded');
  } catch (err) {
    console.error('Error loading models:', err);
  }
})();




router.post('/report', auth, upload.single('photo'), async (req, res) => {
  console.log('Request received:', req.body);
  console.log('File received:', req.file);

  const { location, approximateAge, appearance, contact } = req.body;
  try {
    // Check if file is uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'No photo uploaded' });
    }

    // Load and process image
    const img = await loadImage(req.file.path);
    console.log('Image loaded successfully');
    const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
    if (!detections) {
      return res.status(400).json({ message: 'No face detected in the image' });
    }
    console.log('Face detected, descriptor length:', detections.descriptor.length);

    // Save to database with converted descriptor
    const foundChild = new FoundChild({
      userId: req.user.id,
      location,
      photo: req.file.path,
      approximateAge: parseInt(approximateAge), // Ensure it's a number
      appearance,
      contact,
      facialDescriptor: Array.from(detections.descriptor), // Convert Float32Array to array
    });
    await foundChild.save();
    console.log('Found child saved to database');

    // Check for matches
    const lostChildren = await LostChild.find();
    console.log('Checking matches with', lostChildren.length, 'lost children');
    for (const lost of lostChildren) {
      const distance = faceapi.euclideanDistance(detections.descriptor, lost.facialDescriptor);
      console.log(`Distance with lost child ${lost._id}: ${distance}`);
      if (distance < 0.6 && Math.abs(lost.age - parseInt(approximateAge)) <= 2) {
        const parent = await User.findById(lost.userId);
        const finder = await User.findById(foundChild.userId);
        if (parent && finder) {
          try {
            await sendNotification(parent.email, `Match found! Contact: ${finder.phone}, Location: ${foundChild.location}`);
            await sendNotification(finder.email, `Match found! Contact: ${parent.phone}`);
            console.log('Match found and notifications sent');
          } catch (notifyErr) {
            console.error('Notification error:', notifyErr.message);
          }
        } else {
          console.log('Failed to find parent or finder user');
        }
      }
    }

    res.json({ message: 'Found child reported' });
  } catch (err) {
    console.error('Server error details:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;