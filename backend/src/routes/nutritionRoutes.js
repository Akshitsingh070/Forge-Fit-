import express from 'express';
import { getNutritionGuidance } from '../controllers/nutritionController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);
router.get('/', getNutritionGuidance);

export default router;
