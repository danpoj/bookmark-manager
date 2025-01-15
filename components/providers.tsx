'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { Suspense, useState, type ReactNode } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/theme-provider';
import { WelcomeToast } from '@/components/welcome-toast';

export const Providers = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 3 * 60 * 1000,
          },
        },
      })
  );

  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='system'
      enableSystem
      disableTransitionOnChange
    >
      <NuqsAdapter>
        <QueryClientProvider client={queryClient}>
          {children}

          <Suspense fallback={null}>
            <Toaster richColors closeButton />
            <WelcomeToast />
          </Suspense>
        </QueryClientProvider>
      </NuqsAdapter>
    </ThemeProvider>
  );
};
