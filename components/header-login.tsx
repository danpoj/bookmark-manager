'use client';

import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { RiKakaoTalkFill } from 'react-icons/ri';
import { useLoginMutation, useUser } from '@/apis';
import { LogoutButton } from '@/components/logout-button';
import { Button } from '@/components/ui/button';

export const HeaderLogin = () => {
  const loginMutation = useLoginMutation();
  const { data: user, isPending } = useUser();

  if (isPending) return null;
  if (user) return <LogoutButton />;

  return (
    <div className='flex gap-1'>
      <Button
        variant='outline'
        className='gap-2'
        onClick={() => loginMutation.mutate({ provider: 'google' })}
        disabled={loginMutation.isPending}
      >
        <FcGoogle className='scale-[150%]' />
      </Button>
      <Button
        variant='outline'
        className='bg-[#FEE500] hover:bg-[#FEE500]/80 gap-2'
        onClick={() => loginMutation.mutate({ provider: 'kakao' })}
        disabled={loginMutation.isPending}
      >
        <RiKakaoTalkFill className='scale-[170%]' />
      </Button>
      <Button
        className='relative gap-2'
        variant='default'
        onClick={() => loginMutation.mutate({ provider: 'github' })}
        disabled={loginMutation.isPending}
      >
        <FaGithub className='scale-[150%]' />
      </Button>
    </div>
  );
};
