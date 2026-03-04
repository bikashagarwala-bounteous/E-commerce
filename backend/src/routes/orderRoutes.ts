import { Router } from 'express';
import { createOrder, getOrder, updateOrder, deleteOrder } from '../controllers/OrderController';

const router = Router();

router.post('/', createOrder);
router.get('/:id', getOrder);
router.put('/:id', updateOrder);
router.delete('/:id', deleteOrder);

export default router;
