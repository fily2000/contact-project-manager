import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import {
  createInternalAccount,
  createClientCredentials,
  getAdminDashboard,
  getAllUsers,
  getAllProjects,
  getAllContacts,
  getSystemStats
} from '../controllers/adminController.js';

const router = express.Router();

// Tutti gli endpoint admin richiedono autenticazione e ruolo admin
router.use(authenticate, authorize('admin'));

router.post('/account/internal', createInternalAccount);
router.post('/account/client-credentials', createClientCredentials);
router.get('/dashboard', getAdminDashboard);
router.get('/users', getAllUsers);
router.get('/projects', getAllProjects);
router.get('/contacts', getAllContacts);
router.get('/stats', getSystemStats);

export default router;
