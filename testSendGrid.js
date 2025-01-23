import sgMail from '@sendgrid/mail';

sgMail.setApiKey('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'); // Replace with your API key

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
