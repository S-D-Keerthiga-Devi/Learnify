import express from 'express';
import {
    getCourseProgress,
    markLectureComplete,
    getProgressStats,
} from '../controllers/progressController.js';
import { authenticateUser } from '../middleware/auth.js';

const router = express.Router();

// All progress routes require authentication
router.use(authenticateUser);

router.get('/stats', getProgressStats);
router.get('/:courseId', getCourseProgress);
router.post('/:courseId/lecture', markLectureComplete);

export default router;
