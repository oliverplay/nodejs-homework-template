require("dotenv").config();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendEmail = async (data) => {
    try {
        const msg = {
            to: data.to, 
            from: 'dgolikova0@gmail.com',  
            subject: data.subject,
            text: data.text,
            html: data.html,
        };

        await sgMail.send(msg);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error.response?.body || error.message);
        throw error;
    }
};

module.exports = sendEmail;
