import Project from '../models/Project.js';
import { AppError } from '../middleware/errorHandler.js';

export const createProject = async (req, res, next) => {
  try {
    const { nome, descrizione, cliente, team, responsabile } = req.body;
    const project = await Project.create({
      nome,
      descrizione,
      cliente,
      team,
      responsabile: responsabile || req.user.id
    });
    res.status(201).json({
      success: true,
      message: 'Progetto creato',
      project
    });
  } catch (error) {
    next(error);
  }
};

export const getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find()
      .populate('cliente')
      .populate('team')
      .populate('responsabile', 'nome cognome email');
    res.json({
      success: true,
      count: projects.length,
      projects
    });
  } catch (error) {
    next(error);
  }
};

export const getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('cliente')
      .populate('team')
      .populate('responsabile')
      .populate('raci.responsible')
      .populate('raci.accountable')
      .populate('raci.consulted')
      .populate('raci.informed');
    if (!project) {
      throw new AppError('Progetto non trovato', 404);
    }
    res.json({
      success: true,
      project
    });
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );
    res.json({
      success: true,
      message: 'Progetto aggiornato',
      project
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({
      success: true,
      message: 'Progetto eliminato'
    });
  } catch (error) {
    next(error);
  }
};

export const updateProjectStep = async (req, res, next) => {
  try {
    const { stepIndex } = req.params;
    const { stato } = req.body;
    const project = await Project.findById(req.params.id);
    if (!project) {
      throw new AppError('Progetto non trovato', 404);
    }
    if (project.step[stepIndex]) {
      project.step[stepIndex].stato = stato;
      if (stato === 'in_corso') {
        project.step[stepIndex].dataInizio = new Date();
      }
      if (stato === 'finito') {
        project.step[stepIndex].dataFine = new Date();
      }
      await project.save();
    }
    res.json({
      success: true,
      message: 'Step aggiornato',
      project
    });
  } catch (error) {
    next(error);
  }
};

export const addFileToProject = async (req, res, next) => {
  try {
    const { nome, url, tipo, linkDrive } = req.body;
    const project = await Project.findById(req.params.id);
    if (!project) {
      throw new AppError('Progetto non trovato', 404);
    }
    project.file.push({
      nome,
      url,
      tipo,
      linkDrive,
      dataCaricamento: new Date()
    });
    await project.save();
    res.json({
      success: true,
      message: 'File aggiunto',
      project
    });
  } catch (error) {
    next(error);
  }
};

export const updateProjectRaci = async (req, res, next) => {
  try {
    const { raci } = req.body;
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { raci },
      { new: true }
    );
    res.json({
      success: true,
      message: 'RACI aggiornata',
      project
    });
  } catch (error) {
    next(error);
  }
};
