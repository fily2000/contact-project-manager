import Stripe from 'stripe';
import config from '../config/config.js';

const stripe = new Stripe(config.stripe.secretKey);

export const createStripeCustomer = async (email, name) => {
  try {
    const customer = await stripe.customers.create({
      email,
      name
    });
    return customer;
  } catch (error) {
    console.error('Errore creazione cliente Stripe:', error);
    throw error;
  }
};

export const createSubscription = async (customerId, priceId) => {
  try {
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent']
    });
    return subscription;
  } catch (error) {
    console.error('Errore creazione sottoscrizione:', error);
    throw error;
  }
};

export const cancelSubscription = async (subscriptionId) => {
  try {
    const subscription = await stripe.subscriptions.del(subscriptionId);
    return subscription;
  } catch (error) {
    console.error('Errore cancellazione sottoscrizione:', error);
    throw error;
  }
};

export const getPaymentIntent = async (clientSecret) => {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(clientSecret);
    return paymentIntent;
  } catch (error) {
    console.error('Errore recupero Payment Intent:', error);
    throw error;
  }
};
