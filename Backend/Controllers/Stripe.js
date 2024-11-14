import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51Q9hCRKrBgfqkwHlYfXnqCTl4OAVDkevZEBJbc5FLzzfXgi8cFY8rXkN6EAm6FWU8Ii1ZsepHQF3sxGSKiswY0i800nShpw6nr'); // Replace with your actual Stripe secret key

const customers = {};

const StripePayment = async (req, res) => {
  const { amount, user } = req.body;

  try {
    // Create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Amount in cents
      currency: 'usd',
      receipt_email: user.email,
    });

    // Store or update customer data
    if (!customers[user.email]) {
      // New customer
      customers[user.email] = {
        customerId: paymentIntent.customer, // Store the customer ID from Stripe
        email: user.email,
        name: user.name,
        created: new Date().toISOString(),
        cardId: null, // Placeholder for future use
        totalSpend: amount,
        paymentCount: 1,
        refundedVolume: 0,
        disputeLosses: 0,
      };
    } else {
      // Update existing customer data
      const customer = customers[user.email];
      customer.totalSpend += amount;
      customer.paymentCount += 1;
    }

    // Send back the client secret for Stripe Elements
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).send({ error: 'Failed to create payment intent' });
  }
};

export default StripePayment;
