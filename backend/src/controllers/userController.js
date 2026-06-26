import User from '../models/User.js';
import { AppError } from '../middleware/errorHandler.js';

export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      throw new AppError('Utente non trovato', 404);
    }
    res.json({
      success: true,
      user: user.toJSON()
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { nome, cognome, telefono, azienda, avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { nome, cognome, telefono, azienda, avatar, updatedAt: new Date() },
      { new: true, runValidators: true }
    );
    res.json({
      success: true,
      message: 'Profilo aggiornato',
      user: user.toJSON()
    });
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
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

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { attivo: false },
      { new: true }
    );
    res.json({
      success: true,
      message: 'Utente disattivato'
    });
  } catch (error) {
    next(error);
  }
};
