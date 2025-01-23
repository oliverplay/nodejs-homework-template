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
