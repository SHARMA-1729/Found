require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendNotification = async (to, message) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Lost and Found Child Match Notification',
    text: message,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    return info;
  } catch (err) {
    console.error('Notification error:', err);
    throw err; // Error propagate karne ke liye
  }
};

module.exports = { sendNotification };