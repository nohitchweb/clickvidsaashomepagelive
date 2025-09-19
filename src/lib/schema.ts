import { pgTable, serial, text, boolean, timestamp } from 'drizzle-orm/pg-schema';

/**
 * Database schema for user settings
 * Stores user-specific preferences and configurations
 * 
 * Fields:
 * - id: Primary key
 * - userId: Foreign key to users table
 * - theme: UI theme preference (light/dark)
 * - language: Language preference
 * - notifications: Notification toggle
 * - createdAt: Timestamp when record was created
 * - updatedAt: Timestamp when record was last updated
 */
export const settingsTable = pgTable('settings', {
  // Primary key
  id: serial('id').primaryKey(),
  
  // Foreign key linking to users table
  userId: text('user_id').notNull(),
  
  // User interface settings
  theme: text('theme').default('light'),
  language: text('language').default('en'),
  
  // Feature toggles
  notifications: boolean('notifications').default(true),
  
  // Timestamps
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
