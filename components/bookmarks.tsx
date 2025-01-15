'use client';

import {
  useBookmarks,
  useDeleteBookmarkMutation,
  useFolders,
  useOptimisticUpdateBookmarkOrder,
  useUpdateBookmarkTitleMutation,
} from '@/apis';
import { Tables } from '@/database.types';
import { cn, getFaviconURL } from '@/lib/utils';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { Loader2, PencilIcon, XIcon } from 'lucide-react';
import Image from 'next/image';
import { useQueryState } from 'nuqs';
import { useEffect, useRef, useState } from 'react';
import { useSnapshot } from 'valtio';
import { MoveBookmarkDialog } from '@/components/move-bookmark-dialog';
import { BookmarksSkeleton } from '@/components/skeletons';
import { editStore } from '@/components/store/edit-store';
import { Input } from '@/components/ui/input';

export const Bookmarks = () => {
  const [folderId] = useQueryState('f');
  const optimisticUpdateBookmarkOrder = useOptimisticUpdateBookmarkOrder();

  const {
    data: bookmarks,
    isPending: isPendingBookmarks,
    isError: isErrorBookmarks,
  } = useBookmarks({ folderId: folderId! });

  const {
    data: folders,
    isPending: isPendingFolders,
    isError: isErrorFolders,
  } = useFolders();

  if (isPendingBookmarks || isPendingFolders) return <BookmarksSkeleton />;

  if (isErrorBookmarks || isErrorFolders) return 'error!';

  if (bookmarks.length === 0)
    return (
      <div className='mt-6 flex items-center justify-center relative flex-col'>
        <Image
          src='/leaf.svg'
          alt='not found'
          width={80}
          height={80}
          className='rotate-[110deg]'
        />
      </div>
    );

  const currentFolder = folders.find(
    (folder) => folder.id === Number(folderId)
  );

  return (
    <div className='flex flex-col w-full'>
      <DragDropContext
        onDragEnd={(result) => {
          if (!result.destination) return;

          const sourceIndex = result.source.index;
          const destinationIndex = result.destination!.index;

          if (sourceIndex === destinationIndex) return;

          optimisticUpdateBookmarkOrder.mutate({
            bookmarks,
            destinationIndex,
            sourceIndex,
            folderId: String(folderId),
          });
        }}
      >
        <Droppable
          isDropDisabled={optimisticUpdateBookmarkOrder.isPending}
          droppableId={'bookmarks'}
        >
          {(droppableProvided) => (
            <div
              aria-disabled={optimisticUpdateBookmarkOrder.isPending}
              className={cn('w-full')}
              ref={droppableProvided.innerRef}
              {...droppableProvided.droppableProps}
            >
              {bookmarks.map((bookmark, idx) => (
                <Draggable
                  isDragDisabled={optimisticUpdateBookmarkOrder.isPending}
                  key={bookmark.order_number}
                  draggableId={String(bookmark.order_number)}
                  index={idx}
                >
                  {(provided) => (
                    <div
                      className='w-full'
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Bookmark
                        bookmark={bookmark}
                        folder={currentFolder ?? null}
                        folders={folders}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {droppableProvided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

const Bookmark = ({
  bookmark,
  folder,
  folders,
}: {
  bookmark: Tables<'bookmarks'>;
  folders: Tables<'folders'>[];
  folder: Tables<'folders'> | null;
}) => {
  const [folderId] = useQueryState('f');
  const { isManaging } = useSnapshot(editStore);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const titleInputRef = useRef<HTMLInputElement>(null!);
  const deleteBookmarkMutation = useDeleteBookmarkMutation();
  const updateBookmarkTitleMutation = useUpdateBookmarkTitleMutation();

  useEffect(() => {
    if (isEditingTitle) titleInputRef.current.focus();
  }, [isEditingTitle]);

  return (
    <div className='flex justify-between items-center w-full gap-2'>
      <a
        href={bookmark.url}
        target='_blank'
        rel='noopener noreferrer'
        className='flex gap-2 items-center px-2 h-9 hover:bg-primary/5 w-full'
      >
        {isManaging && (
          <MoveBookmarkDialog
            bookmark={bookmark}
            folder={folder}
            folders={folders}
          />
        )}

        <Image
          unoptimized
          src={getFaviconURL({ domain: bookmark.url })}
          alt={bookmark.title}
          width={20}
          height={20}
          className='rounded-sm shrink-0 aspect-square size-5'
        />

        {isEditingTitle ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();

              if (
                bookmark.title.trim() === titleInputRef.current.value.trim()
              ) {
                setIsEditingTitle(false);
                return;
              }

              updateBookmarkTitleMutation.mutate(
                {
                  bookmarkId: bookmark.id,
                  folderId: folderId!,
                  title: titleInputRef.current.value,
                },
                { onSuccess: () => setIsEditingTitle(false) }
              );
            }}
            className='w-full mr-2'
          >
            <Input
              onKeyDown={(e) => e.key === 'Escape' && setIsEditingTitle(false)}
              disabled={updateBookmarkTitleMutation.isPending}
              className='bg-background h-8 border-primary/40 pl-2'
              onClick={(e) => e.preventDefault()}
              ref={titleInputRef}
              defaultValue={bookmark.title}
            />
          </form>
        ) : (
          <p className='text-sm truncate'>{bookmark.title}</p>
        )}

        {isManaging ? (
          <div className='flex gap-1.5 ml-auto'>
            <button
              disabled={updateBookmarkTitleMutation.isPending}
              onClick={(e) => {
                e.preventDefault();
                setIsEditingTitle((e) => !e);
              }}
              className='border size-6 p-1 flex items-center justify-center rounded border-primary/20 hover:bg-background'
            >
              {updateBookmarkTitleMutation.isPending ? (
                <Loader2 className='animate-spin' />
              ) : (
                <PencilIcon />
              )}
            </button>
            <button
              disabled={deleteBookmarkMutation.isPending}
              onClick={(e) => {
                e.preventDefault();

                deleteBookmarkMutation.mutate({
                  bookmarkId: bookmark.id,
                  folderId: folderId!,
                });
              }}
              className='border size-6 p-1 flex items-center justify-center rounded border-primary/20 disabled:opacity-80 hover:bg-background'
            >
              {deleteBookmarkMutation.isPending ? (
                <Loader2 className='animate-spin' />
              ) : (
                <XIcon />
              )}
            </button>
          </div>
        ) : (
          <p className='text-xs text-primary/60 shrink-0 ml-auto'>
            {new Date(bookmark.created_at).toLocaleDateString()}
          </p>
        )}
      </a>
    </div>
  );
};
