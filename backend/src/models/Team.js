import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'Il nome del team è obbligatorio'],
    trim: true
  },
  descrizione: String,
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  membri: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  chatInterna: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chat'
  },
  attivo: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Team', teamSchema);
