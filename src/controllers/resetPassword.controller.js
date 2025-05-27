import prisma from "../config/prisma.js";
import bcrypt from "bcrypt";

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
    });

    if (!resetToken || resetToken.expiresAt < new Date()) {
      return res.status(400).json({
        message: "Token is invalid or expired",
      });
    }

    const hashed = await bcrypt.hash(newPassword, 10);

    await prisma.users.update({
      where: { id: resetToken.userId },
      data: { password: hashed },
    });
    await prisma.passwordResetToken.delete({ where: { token } });
    res.status(200).json({
      message: "Reset password successfully ",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
