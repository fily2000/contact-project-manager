import express from 'express';
import { authenticate } from '../middleware/auth.js';
import {
  createChat,
  getChats,
  getChatById,
  sendMessage,
  getMessages,
  markAsRead,
  deleteMessage
} from '../controllers/chatController.js';

const router = express.Router();

router.post('/', authenticate, createChat);
router.get('/', authenticate, getChats);
router.get('/:id', authenticate, getChatById);
router.post('/:id/message', authenticate, sendMessage);
router.get('/:id/messages', authenticate, getMessages);
router.put('/:id/message/:messageId/read', authenticate, markAsRead);
router.delete('/:id/message/:messageId', authenticate, deleteMessage);

export default router;
