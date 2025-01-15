import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { dbClient } from './supabase/client';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const decodeHTMLEntities = ({ str }: { str: string }) => {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = str;
  return textarea.value;
};

export const getFaviconURL = ({ domain }: { domain: string }) =>
  `https://www.google.com/s2/favicons?sz=64&domain=${domain}`;

export const getSession = async () => {
  const supabase = dbClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session || !session.user) return null;

  return session.user;
};
