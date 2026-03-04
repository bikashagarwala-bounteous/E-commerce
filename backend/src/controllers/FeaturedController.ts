import { Request, Response } from 'express';
import Featured from '../models/Featured';

export const createFeatured = async (req: Request, res: Response) => {
  try {
    const { product_id } = req.body;
    if (!product_id) return res.status(400).json({ message: 'Product ID is required' });
    const featured = await Featured.create({ product_id });
    res.status(201).json({ message: 'Featured item created', featured });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

export const getFeatured = async (req: Request, res: Response) => {
  try {
    const featured = await Featured.findById(req.params.id);
    if (!featured) return res.status(404).json({ message: 'Featured item not found' });
    res.json(featured);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

export const updateFeatured = async (req: Request, res: Response) => {
  try {
    const { product_id } = req.body;
    const featured = await Featured.findByIdAndUpdate(
      req.params.id,
      { product_id },
      { new: true }
    );
    if (!featured) return res.status(404).json({ message: 'Featured item not found' });
    res.json({ message: 'Featured item updated', featured });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

export const deleteFeatured = async (req: Request, res: Response) => {
  try {
    const featured = await Featured.findByIdAndDelete(req.params.id);
    if (!featured) return res.status(404).json({ message: 'Featured item not found' });
    res.json({ message: 'Featured item deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};
