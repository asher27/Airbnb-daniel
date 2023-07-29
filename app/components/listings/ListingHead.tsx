'use client';

import { SafeUser } from '@/app/types';
import useCountries from '@/app/hooks/useCountries';
import Heading from '@/app/components/Heading';
import Image from 'next/image';
import HeartButton from '@/app/components/HeartButton';

interface ListingHeadProps {
  id: string;
  title: string;
  imageSrc: string;
  locationValue: string;
  currentUser?: SafeUser | null;
}

const ListingHead = ({ id, title, imageSrc, locationValue, currentUser }: ListingHeadProps) => {
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);

  return (
    <>
      <Heading title={title} subtitle={`${location?.region}, ${location?.label}`} />
      <div
        className={`
            w-full
            h-[60vh]
            overflow-hidden
            rounded-xl
            relative
        `}
      >
        <Image src={imageSrc} alt={'Image'} fill className={'object-cover w-full'} />
        <div className={'absolute top-5 right-5'}>
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default ListingHead;
