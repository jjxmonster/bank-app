import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../lib/db';
import type { User } from './users/addUser';

type RowDataPacket = import('mysql2').RowDataPacket;

export default async function users(req: NextApiRequest, res: NextApiResponse) {
   try {
      const results = await db.query<User>('SELECT * FROM users');
      await db.end();
      res.status(200).json(results);
   } catch (error) {
      return { error };
   }
}
