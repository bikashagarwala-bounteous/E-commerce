import { Router } from 'express';
import { createFeatured, getFeatured, updateFeatured, deleteFeatured } from '../controllers/FeaturedController';

const router = Router();

router.post('/', createFeatured);
router.get('/:id', getFeatured);
router.put('/:id', updateFeatured);
router.delete('/:id', deleteFeatured);

export default router;
