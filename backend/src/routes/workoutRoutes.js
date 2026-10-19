import express from 'express';
import { getTodayWorkout, getWorkoutById } from '../controllers/workoutController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);
router.get('/today', getTodayWorkout);
router.get('/:id', getWorkoutById);

export default router;
