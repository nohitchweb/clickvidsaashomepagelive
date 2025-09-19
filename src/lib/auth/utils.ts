import { NextRequest, NextResponse } from 'next/server';
import { lucia } from '@/lib/auth/lucia';

/**
 * Extract and validate authentication token from request
 * @param request - Next.js request object
 * @returns Valid session object or null if invalid
 */
export async function validateAuthHeader(request: NextRequest): Promise<{ session: any; token: string } | null> {
  try {
    // Extract authorization token from header
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return null;
    }

    // Parse token from "Bearer <token>" format
    const token = authHeader.split(' ')[1];
    if (!token) {
      return null;
    }

    // Validate session using Lucia
    const session = await lucia.validateSession(token);
    if (!session) {
      return null;
    }

    return { session, token };
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
}

/**
 * Handle authentication errors consistently
 * @param message - Error message to return
 * @param status - HTTP status code
 * @returns NextResponse with error
 */
export function handleAuthError(message: string, status: number = 401): NextResponse {
  return NextResponse.json(
    { error: message },
    { status }
  );
}
