import Subscription from '../models/Subscription.js';
import { AppError } from '../middleware/errorHandler.js';

const plans = [
  {
    id: 'starter',
    nome: 'Starter',
    prezzo: 9.99,
    limitiPiano: { progettiMax: 5, contatti: 50, teamMembers: 2, storageGB: 5 }
  },
  {
    id: 'pro',
    nome: 'Pro',
    prezzo: 29.99,
    limitiPiano: { progettiMax: 50, contatti: 500, teamMembers: 10, storageGB: 50 }
  },
  {
    id: 'business',
    nome: 'Business',
    prezzo: 99.99,
    limitiPiano: { progettiMax: 500, contatti: 5000, teamMembers: 50, storageGB: 500 }
  },
  {
    id: 'aziendale',
    nome: 'Aziendale',
    prezzo: -1, // Contattare
    limitiPiano: { progettiMax: -1, contatti: -1, teamMembers: -1, storageGB: -1 }
  }
];

export const getAvailablePlans = (req, res) => {
  res.json({
    success: true,
    plans
  });
};

export const getCurrentSubscription = async (req, res, next) => {
  try {
    let subscription = await Subscription.findOne({ utente: req.user.id });
    if (!subscription) {
      // Crea subscription starter di default
      subscription = await Subscription.create({
        utente: req.user.id,
        piano: 'starter',
        prezzo: 9.99,
        limitiPiano: plans[0].limitiPiano
      });
    }
    res.json({
      success: true,
      subscription
    });
  } catch (error) {
    next(error);
  }
};

export const upgradeSubscription = async (req, res, next) => {
  try {
    const { piano } = req.body;
    const planData = plans.find(p => p.id === piano);
    if (!planData) {
      throw new AppError('Piano non trovato', 404);
    }

    let subscription = await Subscription.findOne({ utente: req.user.id });
    if (!subscription) {
      subscription = await Subscription.create({
        utente: req.user.id,
        piano,
        prezzo: planData.prezzo,
        limitiPiano: planData.limitiPiano
      });
    } else {
      subscription.piano = piano;
      subscription.prezzo = planData.prezzo;
      subscription.limitiPiano = planData.limitiPiano;
      subscription.dataRinnovo = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
      await subscription.save();
    }

    res.json({
      success: true,
      message: 'Sottoscrizione aggiornata',
      subscription
    });
  } catch (error) {
    next(error);
  }
};

export const cancelSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findOneAndUpdate(
      { utente: req.user.id },
      { stato: 'cancellato' },
      { new: true }
    );
    res.json({
      success: true,
      message: 'Sottoscrizione cancellata',
      subscription
    });
  } catch (error) {
    next(error);
  }
};
