import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'Il nome è obbligatorio'],
    trim: true
  },
  cognome: {
    type: String,
    required: [true, 'Il cognome è obbligatorio'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'L\'email è obbligatoria'],
    unique: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Email non valida']
  },
  password: {
    type: String,
    required: [true, 'La password è obbligatoria'],
    minlength: 8,
    select: false
  },
  ruolo: {
    type: String,
    enum: ['cliente', 'dipendente', 'freelancer', 'fornitore', 'costruttore', 'admin'],
    default: 'cliente'
  },
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  },
  avatar: String,
  telefono: String,
  azienda: String,
  attivo: {
    type: Boolean,
    default: true
  },
  twoFAEnabled: {
    type: Boolean,
    default: false
  },
  twoFASecret: String,
  ultimoAccesso: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password prima di salvare
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Metodo per comparare password
userSchema.methods.matchPassword = async function(passwordInserita) {
  return await bcrypt.compare(passwordInserita, this.password);
};

// Metodo per ottenere utente senza password
userSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  delete obj.twoFASecret;
  return obj;
};

export default mongoose.model('User', userSchema);
