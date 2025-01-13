import { Providers } from '@/components/providers';
import { Sidebar } from '@/components/sidebar';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Image from 'next/image';
import './globals.css';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { dbServer } from '@/lib/supabase/server';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Bookmark Manager',
  description:
    'supercharge your internet research and effortlessly organize your bookmarks.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await dbServer();
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    staleTime: Infinity,
    queryKey: ['user'],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      return user;
    },
  });

  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-[#fafafa] overscroll-none overflow-y-hidden`}
      >
        <Providers>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <main className='flex justify-center'>
              <Sidebar />
              {children}
            </main>

            <Image
              unoptimized
              src='/wave.svg'
              alt='background pattern'
              width={400}
              height={400}
              className='absolute inset-0 w-full h-full -z-50 object-cover'
            />
          </HydrationBoundary>
        </Providers>
      </body>
    </html>
  );
}
