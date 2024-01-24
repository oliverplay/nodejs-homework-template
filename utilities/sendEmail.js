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
            };
      sgMail
        .send(msg)
        .then(() => {
          console.log('Email sent successfully')
        })
        .catch((error) => {
            console.log(process.env.SENDGRID_API_KEY)
          console.error(error)
        })
};

module.exports = sendEmail;


    // try {
    //     const msg = {
    //         to: data.to, 
    //         from: 'dgolikova0@gmail.com',  
    //         subject: data.subject,
    //         text: data.text,
    //         html: data.html,
    //     };

    //     await sgMail.send(msg);
    //     console.log('Email sent successfully');
    // } catch (error) {
    //     console.error('Error sending email:', error.response?.body || error.message);
    //     throw error;
    // }