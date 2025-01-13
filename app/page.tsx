import { Bookmarks } from '@/components/bookmarks';
import { Folders } from '@/components/folders';
import { HeaderLogin } from '@/components/header-login';
import { ManageButton } from '@/components/manage-button';
import { Suspense } from 'react';

export default function Page() {
  return (
    <div className='border-x flex flex-col gap-4 relative w-screen min-h-screen max-w-[40rem] bg-background h-screen'>
      <div className='absolute top-0 inset-x-0 w-full bg-background z-50 p-2 flex justify-between items-center gap-2'>
        <HeaderLogin />
        <ManageButton />
      </div>

      <div className='p-2 pt-[4rem] flex-1 overflow-y-scroll'>
        <Suspense>
          <Folders />
        </Suspense>
        <Suspense fallback={<div>hello loading...</div>}>
          <Bookmarks />
        </Suspense>
      </div>
    </div>
  );
}
