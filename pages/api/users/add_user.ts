import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/db';

export default async function add_user(
   req: NextApiRequest,
   res: NextApiResponse
) {
   try {
      const {
         firstName,
         lastName,
         city,
         zip,
         authId,
         accountNumber,
         cardNumber,
      } = req.body;

      const results = await db.query(
         'INSERT INTO users(auth_id, first_name, last_name, city, zip, acc_number, card_number, balance) VALUES(?,?,?,?,?,?,?,?)',
         [authId, firstName, lastName, city, zip, accountNumber, cardNumber, 0]
      );

      await db.end();
      res.status(200).json(results);
   } catch (error) {
      console.log(error);
      return res.status(500).send({ success: false });
   }
}
