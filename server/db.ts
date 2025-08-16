import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "@shared/schema";
import { Pool } from 'pg';
import { neon } from "@neondatabase/serverless";
import "dotenv/config";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL not set");
}

// Use different connection methods based on environment
let db;

if (process.env.NODE_ENV === 'production') {
  // For Vercel/production, use Neon serverless client
  console.log('Using Neon serverless client for database connection');
  const sql = neon(process.env.DATABASE_URL!);
  db = drizzle(sql, { schema });
} else {
  // For local development, use regular Pool
  console.log('Using regular Pool for database connection');
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
  db = drizzle(pool, { schema });
}

export { db };
