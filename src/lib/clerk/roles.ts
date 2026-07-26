import { auth, currentUser } from '@clerk/nextjs/server';

export type UserRole = 'admin' | 'user' | 'vip';

export async function checkRole(role: UserRole): Promise<boolean> {
  const { sessionClaims } = await auth();
  const userRole = (sessionClaims?.metadata as { role?: string })?.role || 'user';
  return userRole === role;
}

export async function isAdmin(): Promise<boolean> {
  return checkRole('admin');
}

export async function getUserRole(): Promise<UserRole> {
  const { sessionClaims } = await auth();
  const role = (sessionClaims?.metadata as { role?: string })?.role;
  if (role === 'admin') return 'admin';
  if (role === 'vip') return 'vip';
  return 'user';
}

export async function getAuthenticatedUser() {
  const user = await currentUser();
  if (!user) return null;

  const role = (user.publicMetadata?.role as UserRole) || 'user';

  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.emailAddresses[0]?.emailAddress,
    imageUrl: user.imageUrl,
    role,
  };
}
