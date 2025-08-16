import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "@shared/schema";
import { Pool } from 'pg';
import "dotenv/config";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL not set");
}

// Use Pool for database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool, { schema });


export { db };
