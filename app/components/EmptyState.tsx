'use client';

import { useRouter } from 'next/navigation';
import Heading from '@/app/components/Heading';
import Button from '@/app/components/Button';

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

const EmptyState = ({
  title = 'No exact matches',
  subtitle = 'Try changing or removing some of your filters',
  showReset
}: EmptyStateProps) => {
  const router = useRouter();
  return (
    <div
      className={`
            h-[60vh]
            flex
            flex-col
            gap-2
            justify-center
            items-center
      `}
    >
      <Heading center={true} title={title} subtitle={subtitle} />
      <div className={'w-48 mt-4'}>
        {showReset && (
          <Button label={'Remove all filters'} onClick={() => router.push('/')} outline={true} />
        )}
      </div>
    </div>
  );
};

export default EmptyState;
