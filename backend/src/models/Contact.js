import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'Il nome è obbligatorio'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'L\'email è obbligatoria'],
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Email non valida']
  },
  telefono: String,
  azienda: String,
  tipo: {
    type: String,
    enum: ['cliente', 'freelancer', 'fornitore', 'costruttore', 'servizio_terze_parti', 'studio'],
    required: true
  },
  indirizzo: String,
  città: String,
  provincia: String,
  cap: String,
  paese: String,
  sito: String,
  note: String,
  professionista: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  chatEsterna: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chat'
  },
  progetti: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project'
    }
  ],
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

export default mongoose.model('Contact', contactSchema);
