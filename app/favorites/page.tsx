import getCurrentUser from '@/app/actions/getCurrentUser';
import EmptyState from '@/app/components/EmptyState';
import getFavoriteListing from '@/app/actions/getFavoriteListing';
import FavoritesClient from "@/app/favorites/FavoritesClient";

const FavoritesPage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return <EmptyState title={'Unauthorized'} subtitle={'Please Login'} />;
  }

  const favoriteListings = await getFavoriteListing();
  if (favoriteListings.length === 0) {
    return (
      <EmptyState
        title={'No favorites found'}
        subtitle={'Looks like you have no favorite listings.'}
      />
    );
  }

  return (
      <FavoritesClient
        listings={favoriteListings}
        currentUser={currentUser}
        />
  )
};

export default FavoritesPage;
