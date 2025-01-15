'use client';

import { useEffect } from 'react';
import { editStore } from '@/components/store/edit-store';

export const KeyboardEventListener = () => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // if (event.key === '/' && event.ctrlKey) {
      //   event.preventDefault();
      //   const $searchInput = document.getElementById('search-input');
      //   $searchInput?.focus();

      //   return;
      // }

      if (event.key === 'Escape') {
        editStore.isAdding = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return null;
};
