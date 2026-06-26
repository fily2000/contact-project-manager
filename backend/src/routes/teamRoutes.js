import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import {
  createTeam,
  getTeams,
  getTeamById,
  updateTeam,
  deleteTeam,
  addMember,
  removeMember,
  getTeamChat
} from '../controllers/teamController.js';

const router = express.Router();

router.post('/', authenticate, authorize('admin'), createTeam);
router.get('/', authenticate, getTeams);
router.get('/:id', authenticate, getTeamById);
router.put('/:id', authenticate, authorize('admin'), updateTeam);
router.delete('/:id', authenticate, authorize('admin'), deleteTeam);
router.post('/:id/member', authenticate, authorize('admin'), addMember);
router.delete('/:id/member/:memberId', authenticate, authorize('admin'), removeMember);
router.get('/:id/chat', authenticate, getTeamChat);

export default router;
