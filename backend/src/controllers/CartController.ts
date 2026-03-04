import { Request, Response } from 'express';
import Cart from '../models/Cart';

// Add items to cart (create or update cart for user)
export const createCart = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });
    const { items } = req.body;
    if (!items || !Array.isArray(items)) {
      return res.status(400).json({ message: 'Items are required' });
    }
    let cart = await Cart.findOne({ user_id: userId });
    if (cart) {
      cart.items = items;
      await cart.save();
    } else {
      cart = await Cart.create({ user_id: userId, items });
    }
    res.status(201).json({ message: 'Cart updated', cart });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

// Get cart for user
export const getCart = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });
    const cart = await Cart.findOne({ user_id: userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

// Update cart items for user
export const updateCart = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });
    const { items } = req.body;
    const cart = await Cart.findOneAndUpdate(
      { user_id: userId },
      { items },
      { new: true }
    );
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    res.json({ message: 'Cart updated', cart });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

// Delete cart for user
export const deleteCart = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });
    await Cart.findOneAndDelete({ user_id: userId });
    res.json({ message: 'Cart deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};
