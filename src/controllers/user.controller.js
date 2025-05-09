import { PrismaClient } from "@prisma/client";
import bcrypt, { hash } from "bcrypt";

const prisma = new PrismaClient();

export const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const emailExists = await prisma.users.findUnique({
      where: { email },
    });

    if (emailExists) {
      return res.status(409).json({
        message: "User email already exists",
      });
    }

    const hashedPw = await bcrypt.hash(password, 10);
    const isRole = role || "Mekanik";
    const user = await prisma.users.create({
      data: {
        name,
        email,
        password: hashedPw,
        role: isRole,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: false,
        role: true,
        createdAt: true,
        updatedAt: false,
        deletedAt: false,
      },
    });

    res.status(201).json({
      message: "Create user successfull!",
      data: user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const userList = async (req, res) => {
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
        updatedAt: true,
        deletedAt: false,
      },
    });

    res.status(200).json({
      data: users,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const userDetail = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await prisma.users.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        password: false,
        role: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: false,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      data: user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role, password } = req.body;

    const user = await prisma.users.findUnique({
      where: { id },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (email && email !== user.email) {
      const emailExist = await prisma.users.findUnique({
        where: { email },
      });
      if (emailExist) {
        return res.status(409).json({
          message: "Email already exists",
        });
      }
    }

    const hashedPw = await bcrypt.hash(password, 10);
    const updateUser = await prisma.users.update({
      where: { id },
      data: {
        name: name || user.name,
        email: email || user.email,
        role: role || user.role,
        password: hashedPw || user.password,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: false,
        role: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: false,
      },
    });

    res.status(200).json({
      message: "Update user successfull",
      data: updateUser,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.users.delete({
      where: { id },
    });

    res.status(204).json();
  } catch (err) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
