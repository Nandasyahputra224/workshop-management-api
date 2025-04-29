import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const addUser = async (req, res) => {
  try {
    const { id, name, email, password } = req.body;
    const hashedPw = await bcrypt.hash(password, 10);
    const user = await prisma.users.create({
      data: {
        id,
        name,
        email,
        password: hashedPw,
      },
    });

    res.status(201).json({
      message: "Add User Sucess",
      data: user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const showUsers = async (req, res) => {
  try {
    const users = await prisma.users.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        password: false,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    res.status(200).json({
      data: users,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
