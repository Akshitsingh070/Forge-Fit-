import express from 'express';
import { createSession, updateSession, getSessionHistory } from '../controllers/sessionController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);
router.post('/', createSession);
router.put('/:id', updateSession);
router.get('/history', getSessionHistory);

export default router;
