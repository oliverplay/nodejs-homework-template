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
