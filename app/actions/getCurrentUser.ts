import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
  try {
    const session = await getSession();

    // console.log('getCurrentUser >> session',session)

    if (!session?.user?.email) return null;

    // db 정보 체크.................................
    const currentUser = await prisma?.user.findUnique({
      where: {
        email: session.user.email as string
      }
    });
    if (!currentUser) return null;
    // db 정보 체크.................................

    return {
      ...currentUser,
      createdAt: currentUser.createdAt.toISOString(),
      updatedAt: currentUser.updatedAt.toISOString(),
      emailVerified: currentUser.emailVerified?.toISOString() || null
    };
  } catch (e) {
    return null;
  }
}
