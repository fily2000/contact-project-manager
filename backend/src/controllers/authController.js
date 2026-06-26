import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { AppError } from '../middleware/errorHandler.js';

const generateToken = (userId, email, ruolo) => {
  return jwt.sign(
    { userId, email, role: ruolo },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
};

export const register = async (req, res, next) => {
  try {
    const { nome, cognome, email, password, passwordConfirm, ruolo } = req.body;

    // Validazioni
    if (!nome || !cognome || !email || !password || !passwordConfirm) {
      throw new AppError('Tutti i campi sono obbligatori', 400);
    }

    if (password !== passwordConfirm) {
      throw new AppError('Le password non corrispondono', 400);
    }

    if (password.length < 8) {
      throw new AppError('La password deve avere almeno 8 caratteri', 400);
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new AppError('Questo email è già registrato', 409);
    }

    const user = await User.create({
      nome,
      cognome,
      email,
      password,
      ruolo: ruolo || 'cliente'
    });

    const token = generateToken(user._id, user.email, user.ruolo);

    res.status(201).json({
      success: true,
      message: 'Registrazione completata con successo',
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
      throw new AppError('Email e password sono obbligatori', 400);
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new AppError('Email o password non validi', 401);
    }

    const isPasswordValid = await user.matchPassword(password);
    if (!isPasswordValid) {
      throw new AppError('Email o password non validi', 401);
    }

    user.ultimoAccesso = new Date();
    await user.save();

    const token = generateToken(user._id, user.email, user.ruolo);

    res.status(200).json({
      success: true,
      message: 'Login effettuato con successo',
      token,
      user: user.toJSON()
    });
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Logout effettuato con successo'
  });
};
