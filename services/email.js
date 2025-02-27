require("dotenv").config();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendVerificationEmail = async (email, verificationToken) => {
  const msg = {
    to: email,
    from: process.env.SENDER_EMAIL, // <- Trebuie să fie doar un string valid, nu obiect!
    subject: "Verify your email",
    text: `Please verify your email by clicking the link: http://localhost:3001/users/verify/${verificationToken}`,
    html: `<strong>Please verify your email by clicking the link:</strong> <a href="http://localhost:3001/users/verify/${verificationToken}">Verify Email</a>`,
  };

  try {
    await sgMail.send(msg);
    console.log("Verification email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error.response.body.errors);
    throw new Error("Failed to send verification email");
  }
};

module.exports = { sendVerificationEmail };
