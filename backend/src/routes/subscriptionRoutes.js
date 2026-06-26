import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import {
  getCurrentSubscription,
  getAvailablePlans,
  upgradeSubscription,
  cancelSubscription
} from '../controllers/subscriptionController.js';

const router = express.Router();

router.get('/plans', getAvailablePlans);
router.get('/current', authenticate, getCurrentSubscription);
router.post('/upgrade', authenticate, upgradeSubscription);
router.post('/cancel', authenticate, cancelSubscription);

export default router;
