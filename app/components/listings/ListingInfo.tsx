'use client';

import { SafeUser } from '@/app/types';
import { IconType } from 'react-icons';
import useCountries from '@/app/hooks/useCountries';
import Avatar from '@/app/components/Avatar';
import ListingCategory from '@/app/components/listings/ListingCategory';
import dynamic from "next/dynamic";


const Map = dynamic(() => import('../Map'), {
    ssr: false
});
interface ListingInfo {
  user: SafeUser;
  category:
    | {
        label: string;
        icon: IconType;
        description: string;
      }
    | undefined;
  description: string;
  roomCount: number;
  guestCount: number;

  bathroomCount: number;

  locationValue: string;
}

const ListingInfo = ({
  user,
  category,
  description,
  roomCount,
  guestCount,
  bathroomCount,
  locationValue
}: ListingInfo) => {
  const { getByValue } = useCountries();
  const coordinates = getByValue(locationValue)?.latlng;

  return (
    <div className={'flex flex-col col-span-4 gap-8'}>
      <div className={'flex flex-col gap-2'}>
        <div
          className={`
                    text-lg
                    font-semibold
                    flex
                    items-center
                    gap-2
              `}
        >
          <div>Hosted by {user?.name}</div>
          <Avatar src={user?.image} />
        </div>
        <div
          className={`
                flex
                items-center
                gap-4
                font-light
                text-neutral-500
          `}
        >
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathroomCount} bathrooms</div>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category.label}
          description={category.description}
        />
      )}
        <hr/>
        <div className={'text-lg font-light text-neutral-500'}>
            {description}
        </div>
        <hr/>

        <Map center={coordinates}/>
    </div>
  );
};

export default ListingInfo;
