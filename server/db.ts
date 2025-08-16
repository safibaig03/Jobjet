import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "@shared/schema";
import "dotenv/config";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL not set");
}

// Use different connection methods based on environment
let db;
if (process.env.NODE_ENV === 'production') {
  // For Vercel/serverless environment, use Neon's serverless driver
  console.log('Using Neon serverless driver for database connection');
  try {
    // Configure the Neon HTTP client with proper options
    const sql = neon(process.env.DATABASE_URL, { 
      fetchOptions: {
        cache: 'no-store',
      }
    });
    db = drizzle(sql, { schema });
    console.log('Neon serverless driver initialized successfully');
  } catch (error) {
    console.error('Error initializing Neon serverless driver:', error);
    throw error;
  }
} else {
  // For local development, use regular Pool
  console.log('Using regular Pool for database connection');
  const { Pool } = require('pg');
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
  db = drizzle(pool, { schema });
}

export { db };
