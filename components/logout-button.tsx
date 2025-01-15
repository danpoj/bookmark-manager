'use client';

import { useLogoutMutation } from '@/apis';
import { Button } from '@/components/ui/button';
import { LuLogOut } from 'react-icons/lu';

export const LogoutButton = () => {
  const logoutMutation = useLogoutMutation();

  return (
    <Button
      size='sm'
      variant='ghost'
      onClick={() => logoutMutation.mutate()}
      disabled={logoutMutation.isPending}
      className='space-x-1'
    >
      <span className='uppercase font-semibold'>logout</span>
      <LuLogOut className='stroke-[3px] rotate-180' />
    </Button>
  );
};
