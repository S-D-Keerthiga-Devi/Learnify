import { clerkClient } from '@clerk/clerk-sdk-node';
import User from '../models/User.js';

export const authenticateUser = async (req, res, next) => {
    try {
        // Get token from Authorization header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'No authorization token provided'
            });
        }

        const token = authHeader.substring(7); // Remove 'Bearer ' prefix

        // Verify token with Clerk
        const sessionClaims = await clerkClient.verifyToken(token);

        if (!sessionClaims) {
            return res.status(401).json({
                success: false,
                message: 'Invalid or expired token'
            });
        }

        // Get user from Clerk
        const clerkUser = await clerkClient.users.getUser(sessionClaims.sub);

        // Find or create user in our database
        const user = await User.findOrCreateFromClerk(clerkUser);

        // Attach user to request
        req.user = user;
        req.clerkUser = clerkUser;

        next();
    } catch (error) {
        console.error('Authentication error:', error);
        return res.status(401).json({
            success: false,
            message: 'Authentication failed',
            error: error.message
        });
    }
};

// Optional authentication - doesn't fail if no token
export const optionalAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.substring(7);
            const sessionClaims = await clerkClient.verifyToken(token);

            if (sessionClaims) {
                const clerkUser = await clerkClient.users.getUser(sessionClaims.sub);
                const user = await User.findOrCreateFromClerk(clerkUser);
                req.user = user;
                req.clerkUser = clerkUser;
            }
        }

        next();
    } catch (error) {
        // Continue without authentication
        next();
    }
};
