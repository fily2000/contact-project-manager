import mongoose from 'mongoose';

const stepSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  descrizione: String,
  stato: {
    type: String,
    enum: ['non_iniziato', 'in_corso', 'finito'],
    default: 'non_iniziato'
  },
  ordine: Number,
  dataInizio: Date,
  dataFine: Date,
  responsabile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  file: [{
    nome: String,
    url: String,
    tipo: String,
    dataCaricamento: Date
  }]
}, { _id: true });

const projectSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'Il nome del progetto è obbligatorio'],
    trim: true
  },
  descrizione: String,
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contact',
    required: true
  },
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  },
  responsabile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  step: [stepSchema],
  statoAttuale: {
    type: String,
    enum: ['non_iniziato', 'in_corso', 'finito'],
    default: 'non_iniziato'
  },
  raci: [
    {
      attività: String,
      responsible: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      accountable: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      consulted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
      informed: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
    }
  ],
  budget: Number,
  dataInizio: Date,
  dataScadenza: Date,
  dataFine: Date,
  chat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chat'
  },
  file: [{
    nome: String,
    url: String,
    tipo: String,
    linkDrive: String,
    dataCaricamento: Date
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Hook per passare al prossimo step quando uno è finito
projectSchema.methods.transitionToNextStep = async function() {
  const currentStepIndex = this.step.findIndex(s => s.stato !== 'finito');
  
  if (currentStepIndex !== -1 && currentStepIndex < this.step.length - 1) {
    this.step[currentStepIndex + 1].stato = 'in_corso';
    this.step[currentStepIndex + 1].dataInizio = new Date();
  }
};

export default mongoose.model('Project', projectSchema);
