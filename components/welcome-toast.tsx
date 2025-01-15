'use client';

import { useEffect } from 'react';
import { toast } from 'sonner';

export function WelcomeToast() {
  useEffect(() => {
    const isShowWelcomeToast = localStorage.getItem('is_show_welcome_toast');

    if (window.innerHeight < 850) return;
    if (!isShowWelcomeToast || isShowWelcomeToast !== 'no') {
      toast('🚀 Welcome to Bookmark Manager!', {
        id: 'welcome-toast',
        duration: Infinity,
        onDismiss: () => {
          localStorage.setItem('is_show_welcome_toast', 'no');
        },
        description: (
          <>
            Supabase 학습용으로 만든 북마크 관리 사이트입니다.
            <hr className='my-2' />
            Supabase, Next.js fullstack demo website. <br />
            <a
              href='https://github.com/danpoj/bookmark-manager'
              className='font-semibold text-accent1 hover:underline'
              target='_blank'
            >
              Get the Source
            </a>
            .
          </>
        ),
      });
    }
  }, []);

  return null;
}
