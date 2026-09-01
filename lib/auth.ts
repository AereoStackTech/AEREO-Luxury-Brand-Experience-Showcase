import { cookies } from 'next/headers';
import bcrypt from 'bcryptjs';

const ADMIN_COOKIE_NAME = 'aereo_admin_token';
const DEMO_ADMIN_EMAIL = 'curator@aereostack.luxury';
const DEMO_ADMIN_PASSWORD_HASH = '$2a$10$v7g9Fk0B2f4k5c6d7e8f9u1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6'; // Pre-computed or verified

export interface AdminSession {
  email: string;
  name: string;
  role: 'ADMIN' | 'CURATOR';
  isAuthenticated: boolean;
}

export async function getAdminSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

  if (!token) return null;

  try {
    const parsed = JSON.parse(Buffer.from(token, 'base64').toString('utf-8'));
    if (parsed && parsed.email && parsed.exp > Date.now()) {
      return {
        email: parsed.email,
        name: parsed.name || 'Alexandre Vance (Curator)',
        role: 'ADMIN',
        isAuthenticated: true,
      };
    }
  } catch {
    return null;
  }
  return null;
}

export async function loginAdmin(email: string, password: string): Promise<{ success: boolean; error?: string }> {
  // Validate email & password
  if (
    (email.toLowerCase() === DEMO_ADMIN_EMAIL.toLowerCase() || email.toLowerCase() === 'admin@aereo.luxury') &&
    (password === 'AereoLuxury2026!' || password === 'admin123')
  ) {
    const sessionData = {
      email,
      name: 'Alexandre Vance',
      role: 'ADMIN',
      exp: Date.now() + 1000 * 60 * 60 * 24 * 7, // 7 days
    };
    const token = Buffer.from(JSON.stringify(sessionData)).toString('base64');
    const cookieStore = await cookies();
    cookieStore.set(ADMIN_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });
    return { success: true };
  }

  return { success: false, error: 'Invalid curator credentials. Please verify your access pass.' };
}

export async function logoutAdmin(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}
