'use client';

import Image from 'next/image';

export const InitialFallback = () => {
  return (
    <aside className='flex flex-col items-center pt-20 gap-6'>
      <section className='flex flex-col items-end gap-4'>
        <div className='flex'>
          <h1 className='text-5xl font-bold'>Bookmarks</h1>
          <Image
            unoptimized
            src='/doodle_189.svg'
            alt='doodle!'
            width={100}
            height={100}
            className='w-16'
          />
        </div>
        <div>
          <h2 className='text-pretty text-xl tracking-tighter flex flex-col items-end text-primary/90'>
            <span>supercharge your internet research</span>
            <span>and effortlessly organize your bookmarks.</span>
          </h2>
        </div>
      </section>

      <Image
        src='/underline_8.svg'
        alt='underline'
        width={400}
        height={200}
        className='w-52'
      />

      <Image
        src='/arrow-rotate.svg'
        alt='arrow rotate'
        width={200}
        height={200}
        className='w-12 animate-spin-reverse'
      />
    </aside>
  );
};
