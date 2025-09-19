import { Lucia } from 'lucia';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { env } from '@/env';

// Create a new connection to the database
const client = postgres(env.DATABASE_URL);
const db = drizzle(client);

// Create Lucia instance
export const lucia = new Lucia({
  adapter: new DrizzleAdapter(db, users, sessions, key),
  env: process.env.NODE_ENV === 'development' ? 'DEV' : 'PROD',
  // Other Lucia configuration options
});

// Export types
export type Auth = typeof lucia;
export type User = ReturnType<typeof lucia.getUserAttributes>;
export type Session = ReturnType<typeof lucia.validateSession>;
