import express from 'express';
import {
    getAllCourses,
    getCourseById,
    getFeaturedCourses,
} from '../controllers/courseController.js';
import { optionalAuth } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', optionalAuth, getAllCourses);
router.get('/featured', getFeaturedCourses);
router.get('/:id', optionalAuth, getCourseById);

export default router;
