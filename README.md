# Contact Project Manager - SaaS Platform

Piattaforma SaaS completa per la gestione dei contatti e dei progetti con chat interna, amministrazione, RACI, caricamento file multimediali, chat esterna e gestione dello stato dei progetti.

## 🎯 Funzionalità Principali

### 1. **Homepage**
- Landing page attraente con informazioni sulla piattaforma
- Call-to-action per login e iscrizione
- Sezione spiegazione delle funzionalità

### 2. **Autenticazione**
- Login con email-password
- Registrazione clienti
- Recupero password
- 2FA per admin

### 3. **Chat Interna**
- Comunicazione tra dipendenti
- Chat per team
- Notifiche real-time

### 4. **Chat Esterna**
- Contatti: Clienti, Freelancer, Fornitori, Costruttori, Terze parti
- Comunicazione centralizzata

### 5. **Admin Panel**
- Creazione account interni
- Creazione credenziali cliente
- Gestione 2-3 admin
- Creazione team

### 6. **Gestione Team**
- Creazione team con nomi personalizzati
- Chat interna al team (C.I.T)
- Assegnazione membri

### 7. **RACI**
- Matrice RACI per i progetti
- Ruoli: Responsible, Accountable, Consulted, Informed

### 8. **C.F.M.P (Caricamento File Multimediali Progetto)**
- Upload tramite link Google Drive
- Gestione file per progetto
- Condivisione automatica file

### 9. **Stato Progetti**
- Step progetti customizzabili
- Stati: Non iniziato, In corso, Finito
- Transizione automatica tra step
- Condivisione automatica file finali

### 10. **Piani di Pagamento**
- Starter
- Pro
- Business
- Aziendale

## 🏗️ Struttura del Progetto

```
contact-project-manager/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── services/
│   │   └── app.js
│   ├── .env.example
│   ├── package.json
│   └── README.md
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── styles/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
├── docs/
│   ├── API.md
│   ├── DATABASE.md
│   └── SETUP.md
└── docker-compose.yml
```

## 🛠️ Stack Tecnologico

- **Frontend**: React 18 + TypeScript + Vite
- **Backend**: Node.js + Express
- **Database**: MongoDB con Mongoose
- **Real-time**: Socket.io
- **Autenticazione**: JWT + bcrypt
- **Pagamenti**: Stripe
- **File Storage**: Google Drive API
- **Deploy**: Docker

## 📦 Installazione e Setup

### Prerequisiti
- Node.js 16+
- MongoDB
- Google Drive API credentials
- Stripe API keys

### Clone e Setup
```bash
git clone https://github.com/fily2000/contact-project-manager.git
cd contact-project-manager

# Backend
cd backend
npm install
cp .env.example .env
npm run dev

# Frontend (in nuovo terminale)
cd frontend
npm install
npm run dev
```

## 📚 Documentazione

- [API Endpoints](./docs/API.md)
- [Schema Database](./docs/DATABASE.md)
- [Guida Setup](./docs/SETUP.md)

## 🔐 Sicurezza

- JWT per autenticazione
- Bcrypt per password hashing
- CORS configurato
- Validation input lato server
- Rate limiting

## 📝 Lingua

L'intera applicazione è in **italiano**.

## 📄 Licenza

MIT

---

**Creato per**: Gestione efficiente di progetti e contatti con piattaforma SaaS scalabile.
