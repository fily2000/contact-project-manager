import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  updateProjectStep,
  addFileToProject,
  updateProjectRaci
} from '../controllers/projectController.js';

const router = express.Router();

router.post('/', authenticate, createProject);
router.get('/', authenticate, getProjects);
router.get('/:id', authenticate, getProjectById);
router.put('/:id', authenticate, updateProject);
router.delete('/:id', authenticate, authorize('admin'), deleteProject);
router.put('/:id/step/:stepIndex', authenticate, updateProjectStep);
router.post('/:id/file', authenticate, addFileToProject);
router.put('/:id/raci', authenticate, updateProjectRaci);

export default router;
