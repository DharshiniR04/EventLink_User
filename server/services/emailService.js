const nodemailer = require('nodemailer');
const path = require('path');
require('dotenv').config();


const whatsappInviteLink = process.env.whatsappInviteLink;
const resetLink = process.env.Password_Recover;

const sendWelcomeEmail = async (name, to, subject, text, imagePath) => {

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: subject,
    html: `
      <h1>Welcome to Our TechFest, ${name}!</h1>
      <p>${text}</p>
      <p>We're excited to have you with us.</p>
      <p><strong>Best Regards,</strong></p>
      <p>EventLink</p>
      <p>Join our <strong>WhatsApp Group</strong> for the latest updates and discussions!</p>
      <a href="${whatsappInviteLink}" target="_blank">Join WhatsApp Group</a>
      <img src="cid:embeddedImage" alt="Welcome Image" />
    `,
    attachments: [
      {
        filename: path.basename(imagePath),
        path: imagePath,
        cid: 'embeddedImage'
      }
    ]
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw error;
  }
};


const sendPasswordRecoveryEmail = async (to) => {
  console.log(to);
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: 'Password Recovery - Reset Your Password',
    html: `
      <h1>Password Reset Request</h1>
      <p>Hello from EventLink,</p>
      <p>It seems like you requested a password reset. Please click the link below to reset your password:</p>
      <a href="${resetLink}">Reset Password</a>
      <p>If you did not request this, please ignore this email.</p>
      <br>
      <p><strong>Best Regards,</strong></p>
      <p>EventLink</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw error;
  }
};


const sendEventBookConfirmationEmail = async (to, teamleadname, teamleadmail, eventname) => {
 
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: 'Event Booking Confirmation',
    html: `
      <h1>Event Booking Confirmation</h1>
      <p>Dear Participant,</p>
      <p>Thank you for registering the event: <strong>${eventname}</strong>.</p>
      <p>The Initiation for the registration was begin by</p>
      <p><strong>Name:</strong> ${teamleadname}<br>
      <strong>Email:</strong> ${teamleadmail}</p>
      <p>Please complete the payment process through the EventLink portal in the profile section to secure your attendance.</p>
      <p>If you have any questions, feel free to reach out.</p>
      <p><strong>Best Regards,</strong></p>
      <p>The EventLink Team</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  sendWelcomeEmail, sendPasswordRecoveryEmail, sendEventBookConfirmationEmail
};
