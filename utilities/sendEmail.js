require("dotenv").config();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendEmail = async (data) => {
    const msg = {
        to: data.to, 
        from: 'dgolikova0@gmail.com', 
        subject: data.subject,
        text: data.text,
        html: data.html,
      }
      sgMail
        .send(msg)
        .then(() => {
          console.log('Email sent')
        })
        .catch((error) => {
          console.error(error)
        })
};

module.exports = sendEmail;
