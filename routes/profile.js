import express from 'express';
import { updateProfile, getProfile } from '../controllers/profileController.js';
import {authMiddleware} from '../middleware/authMiddleware.js';  // ✅ Import Auth Middleware

const router = express.Router();

// GET Profile (Protected Route)
router.get('/', authMiddleware, getProfile);

// Update Profile (Optional, if needed)
router.put('/', authMiddleware, updateProfile);

export default router;
