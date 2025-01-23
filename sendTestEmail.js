import sgMail from '@sendgrid/mail';

require('dotenv').config();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: 'sorin.tene@gmail.com',  // Replace with your recipient email
  from: 'sorin.tene@outlook.com',  // Ensure this is the verified sender email
  subject: 'Test Email from SendGrid',
  text: 'This is a test email2.',
};

sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent successfully!');
  })
  .catch((error) => {
    console.error('Error sending email:', error.response ? error.response.body : error.message);
  });
