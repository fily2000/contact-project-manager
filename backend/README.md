# Backend - Contact Project Manager

Backend API per la piattaforma SaaS Contact Project Manager.

## 🚀 Avvio Rapido

### Installazione
```bash
npm install
```

### Configurazione
```bash
cp .env.example .env
# Modifica .env con i tuoi dati
```

### Avvio Development
```bash
npm run dev
```

### Avvio Produzione
```bash
npm start
```

## 📁 Struttura

```
src/
├── config/          # Configurazioni (database, etc)
├── controllers/     # Logica business
├── middleware/      # Middleware (auth, errors)
├── models/          # Mongoose schemas
├── routes/          # Route definizioni
├── services/        # Servizi esterni (Stripe, Drive)
└── app.js          # Entry point
```

## 🔗 API Endpoints Principali

### Autenticazione
- `POST /api/auth/register` - Registrazione
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout

### Utenti
- `GET /api/users/profile` - Profilo utente
- `PUT /api/users/profile` - Aggiorna profilo
- `GET /api/users` - Lista utenti (admin)

### Progetti
- `POST /api/projects` - Crea progetto
- `GET /api/projects` - Lista progetti
- `GET /api/projects/:id` - Dettagli progetto
- `PUT /api/projects/:id` - Aggiorna progetto
- `PUT /api/projects/:id/step/:stepIndex` - Aggiorna step
- `POST /api/projects/:id/file` - Carica file

### Chat
- `POST /api/chats` - Crea chat
- `GET /api/chats` - Lista chat
- `POST /api/chats/:id/message` - Invia messaggio
- `GET /api/chats/:id/messages` - Leggi messaggi

### Team
- `POST /api/teams` - Crea team
- `GET /api/teams` - Lista team
- `POST /api/teams/:id/member` - Aggiungi membro

### Contatti
- `POST /api/contacts` - Crea contatto
- `GET /api/contacts` - Lista contatti
- `GET /api/contacts/:id` - Dettagli contatto

### Amministrazione
- `POST /api/admin/account/internal` - Crea account interno
- `POST /api/admin/account/client-credentials` - Crea credenziali cliente
- `GET /api/admin/dashboard` - Dashboard admin

## 🔐 Autenticazione

Tutti gli endpoint protetti richiedono un JWT nel header:
```
Authorization: Bearer <token>
```

## 📚 Documentazione API Completa

Vedi [API.md](../docs/API.md)

## 🧪 Testing

```bash
npm test
```

## 📝 Variabili d'Ambiente

Vedi `.env.example` per tutte le variabili necessarie.

## 🛠️ Dipendenze Principali

- **express** - Framework web
- **mongoose** - ODM MongoDB
- **jsonwebtoken** - JWT auth
- **bcryptjs** - Password hashing
- **stripe** - Pagamenti
- **socket.io** - Real-time
- **dotenv** - Env variables

## 📞 Supporto

Per problemi o domande, contatta lo sviluppatore.
