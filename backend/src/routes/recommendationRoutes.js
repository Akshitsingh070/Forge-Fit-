import express from 'express';
import { getRecommendations, dismissRecommendation } from '../controllers/recommendationController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);
router.get('/', getRecommendations);
router.put('/:id/dismiss', dismissRecommendation);

export default router;
