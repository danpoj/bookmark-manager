'use client';

import { useSnapshot } from 'valtio';
import { editStore } from '@/components/store/edit-store';
import { Button } from '@/components/ui/button';

export const ManageButton = () => {
  const { isManaging } = useSnapshot(editStore);

  return (
    <Button
      onClick={() => (editStore.isManaging = !isManaging)}
      size='sm'
      variant='outline'
      className='uppercase text-xs'
    >
      manage
    </Button>
  );
};
