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

router.post('/', authenticate, createTeam);
router.get('/', authenticate, getTeams);
router.get('/:id', authenticate, getTeamById);
router.put('/:id', authenticate, updateTeam);
router.delete('/:id', authenticate, authorize('admin'), deleteTeam);
router.post('/:id/member', authenticate, addMember);
router.delete('/:id/member/:memberId', authenticate, removeMember);
router.get('/:id/chat', authenticate, getTeamChat);

export default router;
