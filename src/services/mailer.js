import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_MAIL_USERNAME,
    pass: process.env.SMTP_MAIL_PASSWORD,
  },
});

export const sendEmail = async (to, subject, html) => {
  await transporter.sendMail({
    from: `"Brother's MSC" <${process.env.SMTP_MAIL_USERNAME}>`,
    to,
    subject,
    html,
  });
};
