'use client';

import { SearchIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';

export const SearchBar = () => {
  return (
    <div className='absolute top-0 inset-x-0 w-full p-4 border-b bg-background z-50'>
      <div className='relative'>
        <Input
          autoComplete='off'
          id='search-input'
          placeholder='Search'
          className='pl-7'
        />
        <SearchIcon className='absolute top-1/2 left-2 -translate-y-1/2 size-4 stroke-primary/50' />
      </div>
    </div>
  );
};
