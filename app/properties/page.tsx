import getCurrentUser from "@/app/actions/getCurrentUser";
import EmptyState from "@/app/components/EmptyState";
import getListings from "@/app/actions/getListings";
import PropertyClient from "@/app/properties/PropertyClient";

const PropertiesPage = async () => {

    const currentUser = await getCurrentUser();
    if (!currentUser) {
        return <EmptyState title={'Unauthorized'} subtitle={'Please Login'} />;
    }

    const listings = await getListings({ userId: currentUser.id });
    if (listings.length === 0) {
        return (
          <EmptyState
            title={'No properties found'}
            subtitle={'Looks like you have no properties '}
          />
        );
    }


  return (
      <PropertyClient
          listings={listings}
          currentUser={currentUser}
          />
  );
}

export default PropertiesPage;
