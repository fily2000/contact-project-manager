import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
  utente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  piano: {
    type: String,
    enum: ['starter', 'pro', 'business', 'aziendale'],
    default: 'starter'
  },
  prezzo: Number,
  valuta: {
    type: String,
    default: 'EUR'
  },
  dataInizio: {
    type: Date,
    default: Date.now
  },
  dataRinnovo: Date,
  dataScadenza: Date,
  stripe: {
    customerId: String,
    subscriptionId: String,
    paymentMethodId: String
  },
  stato: {
    type: String,
    enum: ['attivo', 'sospeso', 'cancellato'],
    default: 'attivo'
  },
  limitiPiano: {
    progettiMax: Number,
    contatti: Number,
    teamMembers: Number,
    storageGB: Number
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

export default mongoose.model('Subscription', subscriptionSchema);
