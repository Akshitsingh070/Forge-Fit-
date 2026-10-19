import express from 'express';
import { saveAssessment, getAssessment } from '../controllers/assessmentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);
router.post('/', saveAssessment);
router.get('/', getAssessment);

export default router;
