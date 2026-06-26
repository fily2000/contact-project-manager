import User from '../models/User.js';
import { AppError } from '../middleware/errorHandler.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res, next) => {
  try {
    const { nome, cognome, email, password, ruolo } = req.body;

    if (!nome || !cognome || !email || !password) {
      throw new AppError('Compila tutti i campi obbligatori', 400);
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new AppError('Email già registrata', 400);
    }

    const user = await User.create({
      nome,
      cognome,
      email,
      password,
      ruolo: ruolo || 'cliente'
    });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    res.status(201).json({
      success: true,
      message: 'Registrazione completata',
      token,
      user: user.toJSON()
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new AppError('Email e password obbligatorie', 400);
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.matchPassword(password))) {
      throw new AppError('Credenziali non valide', 401);
    }

    user.ultimoAccesso = new Date();
    await user.save();

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );

    res.json({
      success: true,
      message: 'Login effettuato',
      token,
      user: user.toJSON()
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    res.json({
      success: true,
      message: 'Logout effettuato'
    });
  } catch (error) {
    next(error);
  }
};
