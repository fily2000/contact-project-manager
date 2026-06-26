import express from 'express';
import { authenticate } from '../middleware/auth.js';
import {
  getSubscription,
  createSubscription,
  updateSubscription,
  cancelSubscription,
  getPlans,
  handleWebhook
} from '../controllers/subscriptionController.js';

const router = express.Router();

router.get('/plans', getPlans);
router.get('/', authenticate, getSubscription);
router.post('/', authenticate, createSubscription);
router.put('/', authenticate, updateSubscription);
router.delete('/', authenticate, cancelSubscription);
router.post('/webhook', handleWebhook);

export default router;
