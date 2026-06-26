import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import { 
  getProfile, 
  updateProfile, 
  getUsers,
  deleteUser 
} from '../controllers/userController.js';

const router = express.Router();

router.get('/profile', authenticate, getProfile);
router.put('/profile', authenticate, updateProfile);
router.get('/', authenticate, authorize('admin'), getUsers);
router.delete('/:id', authenticate, authorize('admin'), deleteUser);

export default router;
