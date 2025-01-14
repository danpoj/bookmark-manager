import BlurFade from '@/components/ui/blur-fade';
import { Button } from '@/components/ui/button';
import SparklesText from '@/components/ui/sparkles-text';
import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='pt-20 max-w-[40rem] mx-auto flex flex-col items-center gap-6 z-5'>
      <section className='flex flex-col items-center gap-4'>
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

      <div className='flex flex-col'>
        <Image
          src='/ddung-e-doodle.svg'
          alt='ddung-e'
          width={400}
          height={400}
          className='w-52'
        />
        <Button asChild className='w-full' variant='outline'>
          <Link href='/login'>Go Home</Link>
        </Button>
      </div>
    </div>
  );
}
