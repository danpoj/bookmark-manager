import { ParticlesBackground } from '@/components/particles-background';
import { Providers } from '@/components/providers';
import { ThemeProvider } from '@/components/theme-provider';
import { siteConfig } from '@/site-config';
import type { Metadata, Viewport } from 'next';
import Image from 'next/image';
import './globals.css';

export const metadata: Metadata = {
  applicationName: '로나오프',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: '로나오프',
  },
  formatDetection: {
    telephone: false,
  },

  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  keywords: ['bookmark manager', 'bookmarks'],
  authors: [
    {
      name: 'danpoj',
      url: 'https://github.com/danpoj',
    },
  ],
  creator: 'danpoj',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: '@danpoj',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning className='text-[19px]'>
      <body
        className={`bg-[#fafafa] dark:bg-[#0a0a0a] overscroll-none overflow-y-hidden text-[18px]`}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <ParticlesBackground />
          <Providers>
            {children}

            <Image
              unoptimized
              src='/wave-light.svg'
              alt='background pattern'
              width={400}
              height={400}
              className='absolute inset-0 w-full h-full -z-50 object-cover'
            />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
