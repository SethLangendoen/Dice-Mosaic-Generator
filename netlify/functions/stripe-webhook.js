const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

// In-memory storage for payment status (for simplicity)
let paymentStatus = {};

exports.handler = async (event, context) => {
  const sig = event.headers['stripe-signature'];
  let stripeEvent;

  try {
    stripeEvent = stripe.webhooks.constructEvent(event.body, sig, endpointSecret);
  } catch (err) {
    return {
      statusCode: 400,
      body: `Webhook Error: ${err.message}`,
    };
  }

  if (stripeEvent.type === 'checkout.session.async_payment_succeeded') {
    const session = stripeEvent.data.object;
    // Save payment status with session ID
    paymentStatus[session.id] = 'succeeded';
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ received: true }),
  };
};
