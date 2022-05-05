import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../lib/db';

export default async function get_user(
   req: NextApiRequest,
   res: NextApiResponse
) {
   try {
      const authId = req.query.id;

      const results = await db.query(
         `SELECT id, auth_id, first_name, last_name, city, zip, acc_number, card_number, balance FROM users WHERE auth_id = '${authId}'`
      );

      await db.end();
      res.status(200).json(results);
   } catch (error) {
      return res.status(500).send({ success: false });
   }
}
