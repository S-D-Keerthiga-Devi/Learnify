import express from 'express';
import {
    enrollInCourse,
    getUserEnrollments,
    unenrollFromCourse,
    checkEnrollment,
} from '../controllers/enrollmentController.js';
import { authenticateUser } from '../middleware/auth.js';

const router = express.Router();

// All enrollment routes require authentication
router.use(authenticateUser);

router.post('/', enrollInCourse);
router.get('/', getUserEnrollments);
router.delete('/:courseId', unenrollFromCourse);
router.get('/check/:courseId', checkEnrollment);

export default router;
