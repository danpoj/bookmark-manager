'use client';

import { useSnapshot } from 'valtio';
import { editStore } from './store/edit-store';
import { Button } from './ui/button';

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
