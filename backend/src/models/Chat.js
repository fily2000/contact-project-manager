import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  mittente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  testo: {
    type: String,
    required: true
  },
  allegati: [{
    nome: String,
    url: String,
    tipo: String
  }],
  dataInvio: {
    type: Date,
    default: Date.now
  },
  letto: {
    type: Boolean,
    default: false
  },
  leggiDa: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, { _id: true });

const chatSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    trim: true
  },
  tipo: {
    type: String,
    enum: ['interna', 'esterna', 'team', 'progetto'],
    required: true
  },
  partecipanti: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  },
  progetto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  },
  messaggi: [messageSchema],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Chat', chatSchema);
