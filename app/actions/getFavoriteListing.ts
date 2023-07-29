import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';

export default async function getFavoriteListing() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return [];

    const favorites = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || [])]
        }
      }
    });

    return favorites;
  } catch (e: any) {
    throw new Error(e);
  }
}
