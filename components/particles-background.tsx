'use client';

import Particles from '@/components/ui/particles';

export function ParticlesBackground() {
  return (
    <div className='fixed flex w-screen h-screen inset-0 flex-col items-center justify-center overflow-hidden rounded-lg border bg-transparent md:shadow-xl pointer-events-none'>
      <span className='sr-only'>particles</span>
      <Particles
        className='absolute inset-0 z-0'
        quantity={100}
        ease={80}
        color={'#ffffff'}
        refresh
      />
    </div>
  );
}
