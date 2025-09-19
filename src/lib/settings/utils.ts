import { db } from '@/lib/db';
import { eq } from 'drizzle-orm';
import { settingsTable } from '@/lib/schema';

/**
 * Get user settings from database
 * @param userId - The user ID to fetch settings for
 * @returns User settings or null if not found
 */
export async function getUserSettings(userId: string) {
  try {
    const settings = await db.select().from(settingsTable).where(eq(settingsTable.userId, userId));
    return settings.length > 0 ? settings[0] : null;
  } catch (error) {
    console.error('Error fetching user settings:', error);
    return null;
  }
}

/**
 * Save user settings to database
 * @param userId - The user ID to save settings for
 * @param settingsData - The settings data to save
 * @returns Saved settings object
 */
export async function saveUserSettings(userId: string, settingsData: any) {
  try {
    // Check if settings already exist for this user
    const existingSettings = await getUserSettings(userId);
    
    if (existingSettings) {
      // Update existing settings
      const result = await db.update(settingsTable)
        .set({ 
          ...settingsData, 
          updatedAt: new Date() 
        })
        .where(eq(settingsTable.userId, userId))
        .returning();
      
      return result[0];
    } else {
      // Insert new settings
      const result = await db.insert(settingsTable)
        .values({ 
          ...settingsData, 
          userId 
        })
        .returning();
      
      return result[0];
    }
  } catch (error) {
    console.error('Error saving user settings:', error);
    return null;
  }
}
