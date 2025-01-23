import sgMail from '@sendgrid/mail';

require('dotenv').config();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: 'test@example.com', // Replace with your recipient email
  from: 'your_verified_email@example.com', // Replace with your verified sender email
  subject: 'Test Email',
  text: 'This is a test email sent using SendGrid.',
};

sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent successfully!');
  })
  .catch((error) => {
    console.error('Error sending email:', error.response ? error.response.body : error.message);
  });
