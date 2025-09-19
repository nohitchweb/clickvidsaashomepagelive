import { NextRequest, NextResponse } from 'next/server';
import { validateAuthHeader, handleAuthError } from '@/lib/auth/utils';
import { getUserSettings, saveUserSettings } from '@/lib/settings/utils';

/**
 * Get user settings
 * @param request - Next.js request object
 * @returns User settings or default settings if none exist
 */
export async function GET(request: NextRequest): Promise<Response> {
  try {
    // Validate authentication
    const authResult = await validateAuthHeader(request);
    if (!authResult) {
      return handleAuthError('Invalid or missing authentication', 401);
    }
    const { session } = authResult;

    // Fetch settings for the authenticated user
    const settings = await getUserSettings(session.user.id);
    
    if (!settings) {
      // Return default settings if none exist
      return NextResponse.json({
        theme: 'light',
        language: 'en',
        notifications: true,
      });
    }
    
    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    );
  }
}

/**
 * Save user settings
 * @param request - Next.js request object with settings data
 * @returns Saved settings object
 */
export async function POST(request: NextRequest): Promise<Response> {
  try {
    // Parse request body
    const body = await request.json();
    
    // Validate authentication
    const authResult = await validateAuthHeader(request);
    if (!authResult) {
      return handleAuthError('Invalid or missing authentication', 401);
    }
    const { session } = authResult;

    // Save settings for the authenticated user
    const savedSettings = await saveUserSettings(session.user.id, body);
    
    if (!savedSettings) {
      return NextResponse.json(
        { error: 'Failed to save settings' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(savedSettings);
  } catch (error) {
    console.error('Error saving settings:', error);
    return NextResponse.json(
      { error: 'Failed to save settings' },
      { status: 500 }
    );
  }
}
