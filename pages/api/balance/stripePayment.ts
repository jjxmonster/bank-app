import type { NextApiRequest, NextApiResponse } from 'next';

const stripe = require('stripe')(process.env.STRIPE_SECRET);

export default async function stripePayment(
   req: NextApiRequest,
   res: NextApiResponse
) {
   res.statusCode = 200;
   const stripeObject = await stripe.checkout.sessions.create({
      line_items: [
         {
            price_data: {
               currency: 'usd',
               product_data: {
                  name: 'prod_Lb2QSfNBuH4hZs',
               },
               unit_amount: 2000,
            },
            quantity: 1,
         },
      ],
      payment_method_types: ['card'],
      mode: 'payment',
      success_url: 'https://localhost:3000/dashboard',
      cancel_url: 'https://localhost:3000/dashboard',
   });

   res.json(stripeObject);
}
