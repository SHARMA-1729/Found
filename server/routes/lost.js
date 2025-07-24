const express = require('express');
const router = express.Router();
require('dotenv').config();
const multer = require('multer');
const path = require('path');
const LostChild = require('../models/LostChild');
const FoundChild = require('../models/FoundChild');
const User = require('../models/User');
const auth = require('../middleware/auth');
const faceapi = require('face-api.js');
const { Canvas, Image, ImageData } = require('canvas');
const { createCanvas, loadImage } = require('canvas');
const { sendNotification } = require('../utils/notifications');
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

const modelsPath = path.join(__dirname, '../models');

const upload = multer({ dest: 'uploads/' });

// Model loading with flag
let modelsLoaded = false;
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
    modelsLoaded = true;
  } catch (err) {
    console.error('Error loading models:', err);
  }
})();

// GET all lost children (for dashboard)
router.get('/', auth, async (req, res) => {
  try {
    console.log('Fetching reports for userId:', req.user.id);
    const lostChildren = await LostChild.find({ userId: req.user.id });
    console.log('Found reports:', lostChildren.length);
    const response = lostChildren.map(child => ({
      ...child.toObject(),
      photo: `${req.protocol}://${req.get('host')}/uploads/${path.basename(child.photo)}`
    }));
    res.json(response.length > 0 ? response : []);
  } catch (err) {
    console.error('Error fetching reports:', err);
    res.status(500).json({ message: err.message });
  }
});

router.post('/report', auth, upload.single('photo'), async (req, res) => {
  console.log('Request received:', req.body);
  console.log('File received:', req.file);

  if (!modelsLoaded) {
    return res.status(500).json({ message: 'Face recognition models not loaded' });
  }

  const { name, age, skinColor, height, lastLocation, details } = req.body;
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No photo uploaded' });
    }

    const img = await loadImage(req.file.path);
    console.log('Image loaded successfully');
    const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
    if (!detections) {
      return res.status(400).json({ message: 'No face detected' });
    }
    console.log('Face detected, descriptor length:', detections.descriptor.length);

    const lostChild = new LostChild({
      userId: req.user.id,
      name,
      age: parseInt(age),
      skinColor,
      height,
      lastLocation,
      photo: req.file.path,
      details,
      facialDescriptor: Array.from(detections.descriptor),
    });
    await lostChild.save();
    console.log('Lost child saved to database');

    // Optimize: Fetch only recent found children (e.g., last 24 hours)
    const foundChildren = await FoundChild.find({
      createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
    });
    console.log('Checking matches with', foundChildren.length, 'recent found children');
    for (const found of foundChildren) {
      const distance = faceapi.euclideanDistance(detections.descriptor, found.facialDescriptor);
      console.log(`Distance with found child ${found._id}: ${distance}`);
      if (distance < 0.6 && Math.abs(found.approximateAge - parseInt(age)) <= 2) {
        const parent = await User.findById(lostChild.userId);
        const finder = await User.findById(found.userId);
        if (parent && finder) {
          sendNotification(parent.email, `Match found! Contact: ${finder.phone}, Location: ${found.location}`);
          sendNotification(finder.email, `Match found! Contact: ${parent.phone}`);
          console.log('Match found and notifications sent');
        } else {
          console.log('Failed to find parent or finder user');
        }
      }
    }

    res.json({ message: 'Lost child reported' });
  } catch (err) {
    console.error('Server error details:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;