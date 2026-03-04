import { Request, Response } from 'express';
import Product from '../models/Product';

// Create a new product
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { title, description, price, product_image } = req.body;
    if (!title || !description || !price || !product_image) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const product = await Product.create({ title, description, price, product_image });
    res.status(201).json({ message: 'Product created', product });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

// Get a single product by ID
export const getProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

// Update a product by ID
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { title, description, price, product_image } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { title, description, price, product_image },
      { new: true }
    );
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product updated', product });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

// Delete a product by ID
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};
