import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "@shared/schema";
import { Pool } from 'pg';
import "dotenv/config";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL not set");
}

// Use different connection methods based on environment
let db;

// For local development, use regular Pool
console.log('Using regular Pool for database connection');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
db = drizzle(pool, { schema });

export { db };
