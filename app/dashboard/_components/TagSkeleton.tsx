import { Card } from '@radix-ui/themes';
import React from 'react';
import Skeleton from 'react-loading-skeleton';

const TagSkeleton = () => {
  const numberOfSkeletons = 40;

  const skeletonArray = Array.from({ length: numberOfSkeletons }, (_, i) => i + 1);

  return (
    <Card className="tag-list col-span-1 md:col-span-2 lg:col-span-1 mb-5">
      <h1 className="text-2xl">Tags</h1>
      <div className="list my-5 grid grid-cols-4 gap-1">
        {skeletonArray.map((tag, i) => (
          <Skeleton key={i} width={60} height={23} />
        ))}
      </div>
    </Card>
  );
};

export default TagSkeleton;
