import { Router } from 'express';
import * as authController from '../controllers/authController.js';
const router = Router();
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/refresh', authController.refresh);
router.post('/logout', authController.logout);
export default router;
