'use client';

import { useLogoutMutation } from '@/apis';
import { Button } from '@/components/ui/button';
import { LogOutIcon } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export const LogoutButton = () => {
  const logoutMutation = useLogoutMutation();

  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Button
            size='sm'
            variant='ghost'
            onClick={() => logoutMutation.mutate()}
            disabled={logoutMutation.isPending}
            className='space-x-1 text-muted-foreground'
          >
            <LogOutIcon className='stroke-[3px] size-4' />
          </Button>
        </TooltipTrigger>
        <TooltipContent side='right'>
          <p>Logout</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
