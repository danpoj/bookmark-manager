'use client';

import { useFolders } from '@/apis';
import { Loader2 } from 'lucide-react';
import { useQueryState } from 'nuqs';
import { useEffect } from 'react';
import { useSnapshot } from 'valtio';
import { AddBookmarkDialog } from './add-bookmark-dialog';
import { AddFolderDialog } from './add-folder-dialog';
import { RemoveFolderDialog } from './remove-folder-dialog';
import { editStore } from './store/edit-store';
import { Badge } from './ui/badge';
import { RenameFolderDialog } from './rename-folder-dialog';

export const Folders = () => {
  const [folderID, setFolderID] = useQueryState('f');
  const { isManaging } = useSnapshot(editStore);
  const { data: folders, isPending, isError } = useFolders();

  useEffect(() => {
    if ((!folderID || Number.isNaN(folderID)) && folders && folders.length > 0)
      setFolderID(String(folders?.[0].id));
  }, [folderID, folders, setFolderID]);

  if (isPending)
    return (
      <div className='p-3'>
        <Loader2 className='animate-spin size-4' />
      </div>
    );

  if (isError) return 'error - GET folders';

  const folder = folders?.find((f) => String(f.id) === folderID);

  return (
    <div className='space-y-3 pb-2'>
      <div className='flex gap-2 items-center'>
        <p className='text-xl font-mono font-bold'>folders</p>
        <AddFolderDialog />
      </div>
      <div className='space-x-1.5 flex'>
        {folders.map((folder) => (
          <Badge
            key={folder.id}
            onClick={() => setFolderID(String(folder.id))}
            variant={Number(folderID) === folder.id ? 'teal' : 'gray-subtle'}
            size='lg'
            className='gap-1.5'
          >
            {folder.name}

            {isManaging && <RemoveFolderDialog folder={folder} />}
          </Badge>
        ))}
      </div>

      {folder && (
        <div className='flex items-center gap-2 pt-6'>
          <p className='p-1 text-2xl font-bold font-mono'>{folder.name}</p>

          <div className='flex items-center gap-2'>
            <RenameFolderDialog folder={folder} />
            <AddBookmarkDialog folder={folder} />
          </div>
        </div>
      )}
    </div>
  );
};
