import mysql from 'serverless-mysql';

export const db = mysql({
   config: {
      host: 'localhost',
      port: 3306,
      database: 'bank_app',
      user: 'root',
      password: 'Database!',
   },
});
