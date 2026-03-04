import { Router } from 'express';
import { createProduct, getProduct, updateProduct, deleteProduct } from '../controllers/ProductController';

const router = Router();

router.post('/', createProduct);
router.get('/:id', getProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;
