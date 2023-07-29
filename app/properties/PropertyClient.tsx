'use client';
import { Listing } from '@prisma/client';
import { SafeUser } from '@/app/types';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import Container from '@/app/components/Container';
import Heading from '@/app/components/Heading';
import ListingCard from '@/app/components/listings/ListingCard';

interface PropertyClientProps {
  listings: Listing[];
  currentUser?: SafeUser | null;
}

const PropertyClient = ({ listings, currentUser }: PropertyClientProps) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success('Listing deleted');
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error);
          router.refresh();
        })
        .finally(() => {
          setDeletingId('');
        });
    },
    [router]
  );

  return (
    <Container>
      <Heading title={'Properties'} subtitle={'List of your properties'} />
      <div
        className={`mt-10
              grid
              grid-cols-1
              sm:grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4
              xl:grid-cols-5
              2xl:grid-cols-6
              gap-8
        `}
      >
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            currentUser={currentUser}
            actionLabel={'Delete Property'}
            actionId={listing.id}
            onAction={onCancel}
            disabled={listing.id === deletingId}
          />
        ))}
      </div>
    </Container>
  );
};

export default PropertyClient;
