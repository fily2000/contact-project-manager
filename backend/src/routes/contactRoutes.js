import express from 'express';
import { authenticate } from '../middleware/auth.js';
import {
  createContact,
  getContacts,
  getContactById,
  updateContact,
  deleteContact,
  getContactProjects,
  getExternalChat
} from '../controllers/contactController.js';

const router = express.Router();

router.post('/', authenticate, createContact);
router.get('/', authenticate, getContacts);
router.get('/:id', authenticate, getContactById);
router.put('/:id', authenticate, updateContact);
router.delete('/:id', authenticate, deleteContact);
router.get('/:id/projects', authenticate, getContactProjects);
router.get('/:id/chat', authenticate, getExternalChat);

export default router;
