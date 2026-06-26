import User from '../models/User.js';
import Project from '../models/Project.js';
import Team from '../models/Team.js';
import Contact from '../models/Contact.js';
import { AppError } from '../middleware/errorHandler.js';

export const createInternalAccount = async (req, res, next) => {
  try {
    const { nome, cognome, email, password, ruolo } = req.body;
    
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new AppError('Email già utilizzata', 400);
    }

    const user = await User.create({
      nome,
      cognome,
      email,
      password,
      ruolo: ruolo || 'dipendente'
    });

    res.status(201).json({
      success: true,
      message: 'Account interno creato',
      user: user.toJSON()
    });
  } catch (error) {
    next(error);
  }
};

export const createClientCredentials = async (req, res, next) => {
  try {
    const { nome, cognome, email, password, azienda } = req.body;
    
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new AppError('Email già utilizzata', 400);
    }

    const user = await User.create({
      nome,
      cognome,
      email,
      password,
      ruolo: 'cliente',
      azienda
    });

    res.status(201).json({
      success: true,
      message: 'Credenziali cliente create',
      user: user.toJSON()
    });
  } catch (error) {
    next(error);
  }
};

export const getDashboard = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments({ attivo: true });
    const totalProjects = await Project.countDocuments();
    const totalTeams = await Team.countDocuments({ attivo: true });
    const totalContacts = await Contact.countDocuments({ attivo: true });

    const recentProjects = await Project.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('cliente', 'nome');

    res.json({
      success: true,
      dashboard: {
        totalUsers,
        totalProjects,
        totalTeams,
        totalContacts,
        recentProjects
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ attivo: true }).select('-password');
    res.json({
      success: true,
      count: users.length,
      users
    });
  } catch (error) {
    next(error);
  }
};

export const getAllProjects = async (req, res, next) => {
  try {
    const projects = await Project.find()
      .populate('cliente', 'nome')
      .populate('responsabile', 'nome cognome')
      .sort({ createdAt: -1 });
    res.json({
      success: true,
      count: projects.length,
      projects
    });
  } catch (error) {
    next(error);
  }
};
