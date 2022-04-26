import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../lib/db';

export default async function users(req: NextApiRequest, res: NextApiResponse) {
   try {
      const results = await db.query('SELECT * FROM users');
      console.log(results);
      await db.end();
   } catch (error) {
      return { error };
   }
}
