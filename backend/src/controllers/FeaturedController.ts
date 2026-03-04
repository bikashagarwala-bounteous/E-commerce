import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const createFeatured = async (req: Request, res: Response) => {
  try {
    const { product_id } = req.body;
    if (!product_id)
      return res.status(400).json({ message: "Product ID is required" });
    const featured = await prisma.featured.create({
      data: {
        productId: product_id,
      },
    });
    res.status(201).json({ message: "Featured item created", featured });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

export const getFeatured = async (req: Request, res: Response) => {
  try {
    const featured = await prisma.featured.findUnique({
      where: {
        id: Array.isArray(req.params.id) ? req.params.id[0] : req.params.id,
      },
    });
    if (!featured)
      return res.status(404).json({ message: "Featured item not found" });
    res.json(featured);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

export const updateFeatured = async (req: Request, res: Response) => {
  try {
    const { product_id } = req.body;
    const featured = await prisma.featured.update({
      where: {
        id: Array.isArray(req.params.id) ? req.params.id[0] : req.params.id,
      },
      data: { productId: product_id },
    });
    res.json({ message: "Featured item updated", featured });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};

export const deleteFeatured = async (req: Request, res: Response) => {
  try {
    await prisma.featured.delete({
      where: {
        id: Array.isArray(req.params.id) ? req.params.id[0] : req.params.id,
      },
    });
    res.json({ message: "Featured item deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
};
