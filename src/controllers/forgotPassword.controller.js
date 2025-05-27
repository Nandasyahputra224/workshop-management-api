import prisma from "../config/prisma.js";
import crypto from "crypto";
import { sendEmail } from "../services/mailer.js";
import { htmlContent } from "../utils/templates/email.js";

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await prisma.users.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({
        message: "Email not found",
      });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 3600000);

    await prisma.passwordResetToken.create({
      data: {
        token,
        userId: user.id,
        expiresAt: expires,
      },
    });

    const actionUrl = `http://localhost:3000/reset-password`;
    const html = htmlContent(user.name, actionUrl, user.email);

    await sendEmail(email, "Reset Password", html);

    res.json({
      message: "password reset link sent to your email",
      token: token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
