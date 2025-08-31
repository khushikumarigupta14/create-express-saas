import { Router } from 'express';
import authRoutes from './authRoutes.js';
import userRoutes from './userRoutes.js';
import { healthCheck } from '../controllers/healthController.js';
const router = Router();
router.get('/health', healthCheck);
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
export default router;
