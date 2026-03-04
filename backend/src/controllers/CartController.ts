import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const createCart = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    const { items } = req.body;
    if (!items || !Array.isArray(items)) {
      return res.status(400).json({ message: "Items are required" });
    }

    await prisma.cart.deleteMany({ where: { userId } });
    const cart = await prisma.cart.create({
      data: {
        userId,
        items: {
          create: items.map((item: any) => ({
            productId: item.product_id,
            quantity: item.quantity,
            totalPrice: item.total_price,
          })),
        },
      },
      include: { items: true },
    });
    res.status(201).json({ message: "Cart updated", cart });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

export const getCart = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    const cart = await prisma.cart.findFirst({
      where: { userId },
      include: { items: true },
    });
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

export const updateCart = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    const { items } = req.body;
    await prisma.cart.deleteMany({ where: { userId } });
    const cart = await prisma.cart.create({
      data: {
        userId,
        items: {
          create: items.map((item: any) => ({
            productId: item.product_id,
            quantity: item.quantity,
            totalPrice: item.total_price,
          })),
        },
      },
      include: { items: true },
    });
    res.json({ message: "Cart updated", cart });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

export const deleteCart = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });
    await prisma.cart.deleteMany({ where: { userId } });
    res.json({ message: "Cart deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};
