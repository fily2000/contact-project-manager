import Team from '../models/Team.js';
import { AppError } from '../middleware/errorHandler.js';

export const createTeam = async (req, res, next) => {
  try {
    const { nome, descrizione, membri } = req.body;
    const team = await Team.create({
      nome,
      descrizione,
      admin: req.user.id,
      membri: membri || [req.user.id]
    });
    res.status(201).json({
      success: true,
      message: 'Team creato',
      team
    });
  } catch (error) {
    next(error);
  }
};

export const getTeams = async (req, res, next) => {
  try {
    const teams = await Team.find()
      .populate('admin', 'nome cognome email')
      .populate('membri', 'nome cognome email avatar');
    res.json({
      success: true,
      count: teams.length,
      teams
    });
  } catch (error) {
    next(error);
  }
};

export const getTeamById = async (req, res, next) => {
  try {
    const team = await Team.findById(req.params.id)
      .populate('admin', 'nome cognome email')
      .populate('membri', 'nome cognome email avatar')
      .populate('chatInterna');
    if (!team) {
      throw new AppError('Team non trovato', 404);
    }
    res.json({
      success: true,
      team
    });
  } catch (error) {
    next(error);
  }
};

export const updateTeam = async (req, res, next) => {
  try {
    const team = await Team.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true }
    );
    res.json({
      success: true,
      message: 'Team aggiornato',
      team
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTeam = async (req, res, next) => {
  try {
    await Team.findByIdAndUpdate(req.params.id, { attivo: false });
    res.json({
      success: true,
      message: 'Team disattivato'
    });
  } catch (error) {
    next(error);
  }
};

export const addMember = async (req, res, next) => {
  try {
    const { memberId } = req.body;
    const team = await Team.findById(req.params.id);
    if (!team) {
      throw new AppError('Team non trovato', 404);
    }
    if (!team.membri.includes(memberId)) {
      team.membri.push(memberId);
      await team.save();
    }
    res.json({
      success: true,
      message: 'Membro aggiunto',
      team
    });
  } catch (error) {
    next(error);
  }
};

export const removeMember = async (req, res, next) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) {
      throw new AppError('Team non trovato', 404);
    }
    team.membri = team.membri.filter(m => m.toString() !== req.params.memberId);
    await team.save();
    res.json({
      success: true,
      message: 'Membro rimosso',
      team
    });
  } catch (error) {
    next(error);
  }
};

export const getTeamChat = async (req, res, next) => {
  try {
    const team = await Team.findById(req.params.id).populate('chatInterna');
    if (!team) {
      throw new AppError('Team non trovato', 404);
    }
    res.json({
      success: true,
      chat: team.chatInterna
    });
  } catch (error) {
    next(error);
  }
};
