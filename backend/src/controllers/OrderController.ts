import { Request, Response } from 'express';
import Order from '../models/Order';

// Place a new order
export const createOrder = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });
    const { items, payment_method, expected_delivery_date, shipping_address, total_amount } = req.body;
    if (!items || !payment_method || !expected_delivery_date || !shipping_address || !total_amount) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const order = await Order.create({
      user_id: userId,
      items,
      payment_method,
      expected_delivery_date,
      shipping_address,
      total_amount,
    });
    res.status(201).json({ message: 'Order placed', order });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

// Get a single order by ID (only for the user who placed it)
export const getOrder = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });
    const order = await Order.findOne({ _id: req.params.id, user_id: userId });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

// Update order status (user can only cancel, admin can update status)
export const updateOrder = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });
    const { status } = req.body;
    const order = await Order.findOneAndUpdate(
      { _id: req.params.id, user_id: userId },
      { status },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: 'Order not found or not authorized' });
    res.json({ message: 'Order updated', order });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

// Delete order (user can delete their own order)
export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) return res.status(401).json({ message: 'Unauthorized' });
    const order = await Order.findOneAndDelete({ _id: req.params.id, user_id: userId });
    if (!order) return res.status(404).json({ message: 'Order not found or not authorized' });
    res.json({ message: 'Order deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};
