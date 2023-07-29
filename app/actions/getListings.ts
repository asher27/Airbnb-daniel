import prisma from '@/app/libs/prismadb';

export interface IListingsParams {
  userId?: string;
  locationValue: string;

  startDate?: string;
  endDate?: string;

  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;

  category?: string;
}

export default async function getListings(params: IListingsParams) {
  try {
    const {
      userId,
      locationValue,
      startDate,
      endDate,
      guestCount,
      roomCount,
      bathroomCount,
      category
    } = params;

    let query: any = {};
    if (userId) query.userId = userId;

    if (locationValue) query.locationValue = locationValue;

    if (roomCount) query.roomCount = { gte: +roomCount };
    if (bathroomCount) query.bathroomCount = { gte: +bathroomCount };
    if (guestCount) query.guestCount = { gte: +guestCount };

    if (category) query.category = category;

    // 위치가 맨 아래에 있어야 함......................
    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate }
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate }
              }
            ]
          }
        }
      }
    }


    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc'
      }
    });

    return listings;
  } catch (e) {
    throw new Error();
  }
}
