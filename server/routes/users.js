import express from 'express';
import {
    getCurrentUser,
    updateUserProfile,
} from '../controllers/userController.js';
import { authenticateUser } from '../middleware/auth.js';

const router = express.Router();

// All user routes require authentication
router.use(authenticateUser);

router.get('/me', getCurrentUser);
router.put('/me', updateUserProfile);

export default router;
