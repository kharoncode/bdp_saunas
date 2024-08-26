import { Lucia } from 'lucia';

import { Mysql2Adapter } from '@lucia-auth/adapter-mysql';
import mysql from 'mysql2/promise';
import { host_db } from '../host';

interface User {
  id: string;
  username: string;
  password: string;
}

interface Session {
  id: string;
  user_id: string;
  expires_at: Date;
}

const pool = mysql.createPool(host_db);

const adapter = new Mysql2Adapter(pool, {
  user: 'users',
  session: 'sessions',
});

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: process.env['NODE_ENV'] === 'production',
    },
  },
});

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: Omit<User, 'id'>;
  }
}
