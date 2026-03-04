import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma';

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { title, description, price, product_image } = req.body;
    if (!title || !description || !price || !product_image) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const product = await prisma.product.create({
      data: {
        title,
        description,
        price: parseFloat(price),
        productImage: product_image,
      },
    });
    res.status(201).json({ message: 'Product created', product });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const product = await prisma.product.findUnique({ where: { id: Array.isArray(req.params.id) ? req.params.id[0] : req.params.id } });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { title, description, price, product_image } = req.body;
    const product = await prisma.product.update({
      where: { id: Array.isArray(req.params.id) ? req.params.id[0] : req.params.id },
      data: {
        title,
        description,
        price: parseFloat(price),
        productImage: product_image,
      },
    });
    res.json({ message: 'Product updated', product });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    await prisma.product.delete({ where: { id: Array.isArray(req.params.id) ? req.params.id[0] : req.params.id } });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};
