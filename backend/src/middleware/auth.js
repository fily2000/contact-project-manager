import jwt from 'jsonwebtoken';
import { AppError } from './errorHandler.js';

export const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      throw new AppError('Token mancante', 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      throw new AppError('Token scaduto', 401);
    }
    throw new AppError('Token non valido', 401);
  }
};

export const authorize = (role) => {
  return async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user || user.ruolo !== role) {
        throw new AppError('Non autorizzato', 403);
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};
