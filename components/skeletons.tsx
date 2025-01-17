import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';

export const BookmarksSkeleton = () => {
  return (
    <div className='space-y-1 pt-4'>
      {new Array(6).fill(0).map((_, i) => (
        <Skeleton key={i} className='h-7' />
      ))}
    </div>
  );
};

export const BookmarkLoader = () => {
  return (
    <div className='p-4 pt-8 flex items-center justify-center'>
      <Image
        src='/arrow-rotate-2.svg'
        width={40}
        height={40}
        alt='loader doodle'
        className='animate-spin'
      />
    </div>
  );
};

export const FoldersSkeleton = () => {
  return (
    <div className='space-y-4'>
      <div className='flex gap-2'>
        <Skeleton className='w-20 h-8' />
        <Skeleton className='size-8' />
      </div>
      <div className='flex gap-1.5 flex-wrap'>
        {new Array(4).fill(0).map((_, i) => (
          <Skeleton key={i} className='w-20 h-6 rounded-full' />
        ))}
      </div>
      <div className='flex gap-2 pt-8'>
        <Skeleton className='w-32 h-8' />
        <Skeleton className='size-8' />
      </div>
    </div>
  );
};
