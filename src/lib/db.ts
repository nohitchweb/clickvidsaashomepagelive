import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { env } from '@/env';

// Create a new connection to the database
const client = postgres(env.DATABASE_URL);
export const db = drizzle(client);
