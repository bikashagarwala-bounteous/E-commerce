import { Router } from 'express';
import { createCart, getCart, updateCart, deleteCart } from '../controllers/CartController';

const router = Router();

router.post('/', createCart);
router.get('/:id', getCart);
router.put('/:id', updateCart);
router.delete('/:id', deleteCart);

export default router;
