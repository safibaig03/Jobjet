// server/db.ts

import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from '@shared/schema';
import "dotenv/config";

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

// This creates a special connection pool that is safe for serverless environments.
const sql = neon(process.env.DATABASE_URL);

// This creates your Drizzle client using the serverless-safe connection.
export const db = drizzle(sql, { schema });