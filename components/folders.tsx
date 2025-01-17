'use client';

import { useFolders } from '@/apis';
import { AddBookmarkDialog } from '@/components/add-bookmark-dialog';
import { AddFolderDialog } from '@/components/add-folder-dialog';
import { RemoveFolderDialog } from '@/components/remove-folder-dialog';
import { RenameFolderDialog } from '@/components/rename-folder-dialog';
import { FoldersSkeleton } from '@/components/skeletons';
import { editStore } from '@/components/store/edit-store';
import { Badge } from '@/components/ui/badge';
import { EllipsisIcon } from 'lucide-react';
import { useQueryState } from 'nuqs';
import { useEffect } from 'react';
import { useSnapshot } from 'valtio';
import { Button } from '@/components/ui/button';

export const Folders = () => {
  const [folderID, setFolderID] = useQueryState('f');
  const { isManagingBookmarks, isManagingFolders } = useSnapshot(editStore);
  const { data: folders, isPending, isError } = useFolders();

  useEffect(() => {
    if ((!folderID || Number.isNaN(folderID)) && folders && folders.length > 0)
      setFolderID(String(folders?.[0].id));
  }, [folderID, folders, setFolderID]);

  if (isPending) return <FoldersSkeleton />;

  if (isError) return 'error - GET folders';

  const folder = folders?.find((f) => String(f.id) === folderID);

  return (
    <div className='space-y-3 pb-2'>
      <div className='flex gap-2 items-center'>
        <Button
          onClick={() => (editStore.isManagingFolders = !isManagingFolders)}
          size='icon'
          variant={isManagingFolders ? 'secondary' : 'ghost'}
          className='size-8'
        >
          <EllipsisIcon className='size-5' />
        </Button>

        {isManagingFolders && <AddFolderDialog />}
      </div>
      <div className='space-x-1.5 flex flex-wrap gap-y-3'>
        {folders.map((folder) => (
          <Badge
            key={folder.id}
            onClick={() => setFolderID(String(folder.id))}
            variant={Number(folderID) === folder.id ? 'gray' : 'secondary'}
            size='lg'
            className='gap-1.5 cursor-pointer'
          >
            {folder.name}

            {isManagingFolders && <RemoveFolderDialog folder={folder} />}
          </Badge>
        ))}
      </div>

      {folder ? (
        <div className='flex items-center gap-1 pt-6'>
          <div className='flex items-center gap-1'>
            <Button
              onClick={() =>
                (editStore.isManagingBookmarks = !isManagingBookmarks)
              }
              size='icon'
              variant={isManagingBookmarks ? 'secondary' : 'ghost'}
              className='size-8'
            >
              <EllipsisIcon className='size-5' />
            </Button>
          </div>
          <p className='p-1 text-xl font-bold truncate'>{folder.name}</p>
          <div className='flex gap-1'>
            {isManagingBookmarks && <RenameFolderDialog folder={folder} />}
            {isManagingBookmarks && <AddBookmarkDialog folder={folder} />}
          </div>
        </div>
      ) : (
        <p className='p-1 pt-7 text-2xl font-bold'>FOLDER NOT FOUND</p>
      )}
    </div>
  );
};
