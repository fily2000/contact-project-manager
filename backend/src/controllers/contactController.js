import Contact from '../models/Contact.js';
import { AppError } from '../middleware/errorHandler.js';

export const createContact = async (req, res, next) => {
  try {
    const { nome, email, tipo, telefono, azienda } = req.body;
    const contact = await Contact.create({
      nome,
      email,
      tipo,
      telefono,
      azienda,
      professionista: req.user.id
    });
    res.status(201).json({
      success: true,
      message: 'Contatto creato',
      contact
    });
  } catch (error) {
    next(error);
  }
};

export const getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find({ professionista: req.user.id })
      .populate('professionista', 'nome cognome email');
    res.json({
      success: true,
      count: contacts.length,
      contacts
    });
  } catch (error) {
    next(error);
  }
};

export const getContactById = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id)
      .populate('professionista')
      .populate('progetti');
    if (!contact) {
      throw new AppError('Contatto non trovato', 404);
    }
    res.json({
      success: true,
      contact
    });
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true, runValidators: true }
    );
    res.json({
      success: true,
      message: 'Contatto aggiornato',
      contact
    });
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    await Contact.findByIdAndUpdate(req.params.id, { attivo: false });
    res.json({
      success: true,
      message: 'Contatto disattivato'
    });
  } catch (error) {
    next(error);
  }
};
