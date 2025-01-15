import BlurFade from '@/components/ui/blur-fade';
import SparklesText from '@/components/ui/sparkles-text';
import Image from 'next/image';
import { SidebarLogin } from '@/components/sidebar-login';

export const Sidebar = () => {
  return (
    <aside className='relative py-6 hidden lg:flex flex-col gap-6 items-end h-screen overflow-y-scroll pr-4'>
      <section className='flex flex-col items-end gap-4'>
        <BlurFade delay={0.15} inView className='flex'>
          <SparklesText
            text='Bookmarks'
            className='text-5xl'
            sparklesCount={4}
            as={<h1 />}
          />
          <Image
            unoptimized
            src='/doodle_189.svg'
            alt='doodle!'
            width={100}
            height={100}
            className='w-16'
          />
        </BlurFade>
        <BlurFade delay={0.15 * 2} inView>
          <h2 className='text-pretty text-xl tracking-tighter flex flex-col items-end text-primary/90'>
            <span>supercharge your internet research</span>
            <span>and effortlessly organize your bookmarks.</span>
          </h2>
        </BlurFade>
      </section>

      <Image
        src='/underline_8.svg'
        alt='underline'
        width={400}
        height={200}
        className='w-52'
      />

      <SidebarLogin />
    </aside>
  );
};
