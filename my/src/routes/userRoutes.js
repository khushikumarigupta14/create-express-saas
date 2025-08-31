import { Router } from 'express';
import { authenticate, authorize } from '../middlewares/auth.js';
import * as userController from '../controllers/userController.js';
import { USER_ROLES } from '../constants/index.js';
const router = Router();
router.get('/', authenticate, authorize(USER_ROLES.ADMIN), userController.getUsers);
router.get('/me', authenticate, userController.getMe);
export default router;
