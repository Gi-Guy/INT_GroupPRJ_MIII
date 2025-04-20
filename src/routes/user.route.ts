import { Router } from 'express';
import { register, loginUser, getAllUsers, getCurrentUser, logoutUser } from '../controllers/user.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();
router.post('/register', register);
router.post('/login', loginUser);
router.get('/me', authenticate, getCurrentUser);
router.get('/', getAllUsers);
router.get('/logout', authenticate, logoutUser);
export default router;