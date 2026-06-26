import Chat from '../models/Chat.js';
import { AppError } from '../middleware/errorHandler.js';

export const createChat = async (req, res, next) => {
  try {
    const { nome, tipo, partecipanti, team, progetto } = req.body;
    const chat = await Chat.create({
      nome,
      tipo,
      partecipanti,
      team,
      progetto
    });
    res.status(201).json({
      success: true,
      message: 'Chat creata',
      chat
    });
  } catch (error) {
    next(error);
  }
};

export const getChats = async (req, res, next) => {
  try {
    const chats = await Chat.find()
      .populate('partecipanti', 'nome cognome email')
      .populate('team')
      .populate('progetto');
    res.json({
      success: true,
      count: chats.length,
      chats
    });
  } catch (error) {
    next(error);
  }
};

export const getChatById = async (req, res, next) => {
  try {
    const chat = await Chat.findById(req.params.id)
      .populate('partecipanti', 'nome cognome email')
      .populate('messaggi.mittente', 'nome cognome email avatar')
      .populate('messaggi.leggiDa', 'nome cognome');
    if (!chat) {
      throw new AppError('Chat non trovata', 404);
    }
    res.json({
      success: true,
      chat
    });
  } catch (error) {
    next(error);
  }
};

export const sendMessage = async (req, res, next) => {
  try {
    const { testo, allegati } = req.body;
    const chat = await Chat.findById(req.params.id);
    if (!chat) {
      throw new AppError('Chat non trovata', 404);
    }
    chat.messaggi.push({
      mittente: req.user.id,
      testo,
      allegati,
      dataInvio: new Date()
    });
    await chat.save();
    res.json({
      success: true,
      message: 'Messaggio inviato',
      chat
    });
  } catch (error) {
    next(error);
  }
};

export const getMessages = async (req, res, next) => {
  try {
    const chat = await Chat.findById(req.params.id)
      .populate('messaggi.mittente', 'nome cognome email avatar');
    if (!chat) {
      throw new AppError('Chat non trovata', 404);
    }
    res.json({
      success: true,
      count: chat.messaggi.length,
      messaggi: chat.messaggi
    });
  } catch (error) {
    next(error);
  }
};

export const markAsRead = async (req, res, next) => {
  try {
    const chat = await Chat.findById(req.params.id);
    const messaggio = chat.messaggi.id(req.params.messageId);
    if (!messaggio) {
      throw new AppError('Messaggio non trovato', 404);
    }
    if (!messaggio.leggiDa.includes(req.user.id)) {
      messaggio.leggiDa.push(req.user.id);
    }
    await chat.save();
    res.json({
      success: true,
      message: 'Messaggio segnato come letto'
    });
  } catch (error) {
    next(error);
  }
};

export const deleteMessage = async (req, res, next) => {
  try {
    const chat = await Chat.findById(req.params.id);
    chat.messaggi.id(req.params.messageId).deleteOne();
    await chat.save();
    res.json({
      success: true,
      message: 'Messaggio eliminato'
    });
  } catch (error) {
    next(error);
  }
};
