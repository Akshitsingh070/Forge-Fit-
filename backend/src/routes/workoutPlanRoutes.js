import express from 'express';
import { getWorkoutPlan, generateWorkoutPlan, updateWorkoutPlan } from '../controllers/workoutPlanController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);
router.get('/', getWorkoutPlan);
router.post('/generate', generateWorkoutPlan);
router.put('/', updateWorkoutPlan);

export default router;
