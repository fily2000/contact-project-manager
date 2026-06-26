import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import {
  createInternalAccount,
  createClientCredentials,
  getDashboard,
  getAllUsers,
  getAllProjects
} from '../controllers/adminController.js';

const router = express.Router();

router.post('/account/internal', authenticate, authorize('admin'), createInternalAccount);
router.post('/account/client-credentials', authenticate, authorize('admin'), createClientCredentials);
router.get('/dashboard', authenticate, authorize('admin'), getDashboard);
router.get('/users', authenticate, authorize('admin'), getAllUsers);
router.get('/projects', authenticate, authorize('admin'), getAllProjects);

export default router;
