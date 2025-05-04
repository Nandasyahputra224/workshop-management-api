import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const hashedPw = await bcrypt.hash(password, 10);

    const isRole = role || "Mekanik";
    const user = await prisma.users.create({
      data: {
        name: name,
        email: email,
        password: hashedPw,
        role: isRole,
      },
    });

    res.status(201).json({
      message: "Create User Success",
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
