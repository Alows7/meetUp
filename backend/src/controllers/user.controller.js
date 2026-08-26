import prisma from "../config/prisma.js";

export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, email: true, pseudo: true },
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
    console.log("Error at getUsers controller", error);
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.params.id,
      },
      select: { id: true, email: true, pseudo: true },
    });
    if (!user) return res.status(404).json({ message: "user not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log("Error at getUser controller", error);
  }
};

export const createUser = async (req, res) => {
  try {
    const { pseudo, email, password } = req.body;
    const user = await prisma.user.create({
      data: {
        email,
        password,
        pseudo,
      },
      select: { id: true, email: true, pseudo: true },
    });
    if (!pseudo) res.status(400).json({ message: "A name is required" });
    res.status(201).json(user);
    console.log("User created successfully !");
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log("Error at createUser controller", error);
  }
};
export const updateUser = async (req, res) => {
  try {
    const { email, password, pseudo } = req.body;
    if (!pseudo || !email)
      res.status(400).json({ message: "Name and email are required" });
    const user = await prisma.user.update({
      where: {
        id: req.params.id,
      },
      data: {
        email,
        password,
        pseudo,
      },
      select: { id: true, email: true, pseudo: true },
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.log("Error at update controller", error);
  }
};

export const deleteUser = async (req, res) => {
  try {
    await prisma.user.delete({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error at deleteUser controllers ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
