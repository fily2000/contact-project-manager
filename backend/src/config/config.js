import dotenv from 'dotenv';

dotenv.config();

const config = {
  // Server
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  apiUrl: process.env.API_URL || 'http://localhost:5000',

  // Database
  mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/contact-project-manager',

  // JWT
  jwtSecret: process.env.JWT_SECRET || 'super-secret-key-change-in-production',
  jwtExpire: process.env.JWT_EXPIRE || '7d',

  // Frontend
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',

  // Stripe
  stripe: {
    publicKey: process.env.STRIPE_PUBLIC_KEY,
    secretKey: process.env.STRIPE_SECRET_KEY,
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET
  },

  // Google Drive
  googleDrive: {
    apiKey: process.env.GOOGLE_DRIVE_API_KEY,
    clientId: process.env.GOOGLE_DRIVE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_DRIVE_CLIENT_SECRET
  },

  // Email
  email: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    user: process.env.SMTP_USER,
    password: process.env.SMTP_PASSWORD
  }
};

export default config;
