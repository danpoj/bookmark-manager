'use client';

import { useBookmarks, useDeleteFolderMutation, useFolders } from '@/apis';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tables } from '@/database.types';
import { getFaviconURL } from '@/lib/utils';
import { XIcon } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

export const RemoveFolderDialog = ({
  folder,
}: {
  folder: Tables<'folders'>;
}) => {
  const [open, setOpen] = useState(false);
  const { data: bookmarks } = useBookmarks({ folderId: String(folder.id) });
  const deleteFolderMutation = useDeleteFolderMutation();
  const { data: folders } = useFolders();

  return (
    <Dialog open={open} onOpenChange={(o) => setOpen(o)}>
      <DialogTrigger asChild>
        <button className='flex items-center justify-center border-primary/30 border bg-background size-5 rounded p-0.5 text-primary'>
          <XIcon />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This will permanently delete your
            <span className='font-bold text-destructive text-base'>
              {' '}
              {folder.name}{' '}
            </span>{' '}
            folder and remove your bookmarks from our servers.
          </DialogDescription>

          {Array.isArray(bookmarks) && bookmarks.length > 0 && (
            <div className='max-h-[10.3rem] overflow-y-scroll'>
              {bookmarks.map((bookmark) => (
                <div
                  key={bookmark.id}
                  className='flex items-center gap-1.5 p-1'
                >
                  <Image
                    unoptimized
                    src={getFaviconURL({ domain: bookmark.url })}
                    alt={bookmark.title}
                    width={40}
                    height={40}
                    className='size-5 rounded'
                  />
                  <span className='text-sm'>{bookmark.title}</span>
                </div>
              ))}
            </div>
          )}
        </DialogHeader>
        <DialogFooter>
          <Button
            disabled={deleteFolderMutation.isPending}
            onClick={() => {
              if (folders?.length === 1) {
                toast.info('you must have at least one folder.');
                return;
              }

              deleteFolderMutation.mutate(
                { folderId: folder.id },
                {
                  onSuccess: () => setOpen(false),
                }
              );
            }}
            size='sm'
            variant='destructive'
          >
            remove
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
