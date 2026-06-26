import nodemailer from 'nodemailer';
import config from '../config/config.js';

const transporter = nodemailer.createTransport({
  host: config.email.host,
  port: config.email.port,
  secure: true,
  auth: {
    user: config.email.user,
    pass: config.email.password
  }
});

export const sendEmail = async (to, subject, html) => {
  try {
    await transporter.sendMail({
      from: config.email.user,
      to,
      subject,
      html
    });
    console.log(`Email inviato a ${to}`);
  } catch (error) {
    console.error('Errore invio email:', error);
    throw error;
  }
};

export const sendWelcomeEmail = async (nome, email) => {
  const html = `
    <h2>Benvenuto in Contact Project Manager!</h2>
    <p>Ciao ${nome},</p>
    <p>Ti ringraziamo per esserti registrato sulla nostra piattaforma.</p>
    <p>Ora puoi iniziare a gestire i tuoi progetti e contatti!</p>
    <a href="${process.env.FRONTEND_URL}/login">Accedi alla piattaforma</a>
  `;
  return sendEmail(email, 'Benvenuto in Contact Project Manager!', html);
};

export const sendPasswordResetEmail = async (email, resetToken) => {
  const html = `
    <h2>Ripristino Password</h2>
    <p>Hai richiesto il ripristino della password.</p>
    <p><a href="${process.env.FRONTEND_URL}/reset-password?token=${resetToken}">Clicca qui per ripristinare la password</a></p>
    <p>Se non hai richiesto il ripristino, ignora questo email.</p>
  `;
  return sendEmail(email, 'Ripristino Password', html);
};
