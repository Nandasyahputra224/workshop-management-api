import prisma from "../config/prisma.js";
import bcrypt, { hash } from "bcrypt";
import { formatDate } from "../utils/formatDate.js";

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
      },
    });

    const response = {
      ...user,
      createdAt: formatDate(user.createdAt),
    };

    res.status(201).json({
      message: "Create user successfull!",
      data: response,
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
      },
    });

    const response = users.map((user) => ({
      ...user,
      createdAt: formatDate(user.createdAt),
      updatedAt: formatDate(user.updatedAt),
    }));

    res.status(200).json({
      data: response,
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
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const response = {
      ...user,
      createdAt: formatDate(user.createdAt),
      updatedAt: formatDate(user.updatedAt),
    };

    res.status(200).json({
      data: response,
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

    let hashedPw;
    if (password) {
      hashedPw = await bcrypt.hash(password, 10);
    }

    const updateUser = await prisma.users.update({
      where: { id },
      data: {
        name: name ?? user.name,
        email: email ?? user.email,
        role: role ?? user.role,
        ...(hashedPw && { password: hashedPw }),
      },
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

    const response = {
      ...updateUser,
      createdAt: formatDate(updateUser.createdAt),
      updatedAt: formatDate(updateUser.updatedAt),
    };

    res.status(200).json({
      message: "Update user successfull",
      data: response,
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
