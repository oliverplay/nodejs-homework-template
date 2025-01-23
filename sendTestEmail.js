import sgMail from '@sendgrid/mail';

// Directly set the API key for testing
sgMail.setApiKey('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');  // Replace with your real key

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
