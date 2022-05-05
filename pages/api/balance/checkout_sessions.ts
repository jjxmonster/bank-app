import type { NextApiRequest, NextApiResponse } from 'next';

const stripe = require('stripe')(process.env.STRIPE_SECRET);

export default async function checkout_sessions(
   req: NextApiRequest,
   res: NextApiResponse
) {
   res.statusCode = 200;
   const stripeObject = await stripe.checkout.sessions.create({
      line_items: [
         {
            price: 'price_1KtqLFBjnaQx48NyGMy8hwcF',
            quantity: 1,
         },
      ],
      payment_method_types: ['card'],
      mode: 'payment',
      success_url: 'http://localhost:3000/result',
      cancel_url: 'http://localhost:3000/dashboard',
   });

   res.json(stripeObject);
}
