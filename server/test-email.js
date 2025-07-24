require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: '22bec109@gmail.com',  // Apni email daal
  subject: 'Test Email',
  text: 'This is a test email from your lost-and-found project.',
}, (err, info) => {
  if (err) console.error('Test error:', err);
  else console.log('Test email sent:', info.response);
});