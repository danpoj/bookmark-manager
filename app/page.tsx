import { Bookmarks } from '@/components/bookmarks';
import { Folders } from '@/components/folders';
import { HeaderLogin } from '@/components/header-login';
import { Sidebar } from '@/components/sidebar';
import { ThemeToggler } from '@/components/theme-toggler';
import { Suspense } from 'react';

export default function Page() {
  return (
    <main className='flex justify-center dark:text-[#c0cedc]'>
      <Sidebar />

      <div className='flex flex-col gap-4 relative w-screen min-h-screen max-w-[40rem] bg-background h-screen border-x'>
        <div className='absolute top-0 inset-x-0 w-full bg-background z-50 p-2 flex justify-between items-center gap-2'>
          <HeaderLogin />
          <ThemeToggler />
        </div>

        <div className='p-2 pt-[4rem] flex-1 overflow-y-scroll w-full'>
          <Suspense>
            <Folders />
          </Suspense>
          <Suspense>
            <Bookmarks />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
