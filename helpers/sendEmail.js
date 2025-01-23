import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const apiKey = process.env.SENDGRID_API_KEY;

if (!apiKey || !apiKey.startsWith('SG.')) {
  console.error('Invalid SendGrid API key.');
  process.exit(1); // Terminate the app if the API key is invalid
}

sgMail.setApiKey(apiKey);
console.log('SendGrid API key set successfully');

export default sgMail;
