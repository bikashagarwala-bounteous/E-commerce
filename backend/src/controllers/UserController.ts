import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role, address } = req.body;
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
        role,
        address: {
          create: address,
        },
      },
      include: { address: true },
    });
    res.status(201).json({ message: "User created", user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: Array.isArray(req.params.id) ? req.params.id[0] : req.params.id,
      },
      include: { address: true },
    });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;
    const user = await prisma.user.update({
      where: {
        id: Array.isArray(req.params.id) ? req.params.id[0] : req.params.id,
      },
      data: { name, email, password, role },
      include: { address: true },
    });
    res.json({ message: "User updated", user });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    await prisma.user.delete({
      where: {
        id: Array.isArray(req.params.id) ? req.params.id[0] : req.params.id,
      },
    });
    res.json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};
