'use client';

import { useMoveBookmarkFolderMutation } from '@/apis';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tables } from '@/database.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowDownIcon, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaRegFolderOpen } from 'react-icons/fa';
import { z } from 'zod';
import { LoadingDots } from './loading-dots';

const formSchema = z.object({
  folderName: z.string(),
});

export const MoveBookmarkDialog = ({
  bookmark,
  folder,
  folders,
}: {
  bookmark: Tables<'bookmarks'>;
  folders: Tables<'folders'>[];
  folder: Tables<'folders'> | null;
}) => {
  const [open, setOpen] = useState(false);
  const moveBookmarkFolderMutation = useMoveBookmarkFolderMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const selectedFolder = folders.find((f) => f.name === values.folderName);

    if (!folder || !selectedFolder) return;

    moveBookmarkFolderMutation.mutate(
      {
        bookmarkId: bookmark.id,
        sourceFolderId: folder.id,
        destinationFolderId: selectedFolder.id,
      },
      { onSuccess: () => setOpen(false) }
    );
  };

  return (
    <Dialog open={open} onOpenChange={(o) => setOpen(o)}>
      <DialogTrigger asChild>
        <button
          onClick={(e) => {
            e.preventDefault();
            setOpen(true);
          }}
          className='border size-6 p-1 flex items-center justify-center rounded border-primary/20 hover:bg-background'
        >
          {false ? <Loader2 className='animate-spin' /> : <FaRegFolderOpen />}
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>move bookmark folder</DialogTitle>
          <DialogDescription className='sr-only'>
            📂🔗 Move bookmark folder
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            id='form'
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-8'
          >
            <FormField
              control={form.control}
              name='folderName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='font-mono'>
                    from <span className='font-bold'>{folder?.name}</span> to{' '}
                    <ArrowDownIcon className='inline size-4' />
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className='max-w-[16rem]'>
                        <SelectValue placeholder='select folder' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {folders.map((folder) => (
                        <SelectItem key={folder.id} value={folder.name}>
                          {folder.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </form>
        </Form>

        <DialogFooter>
          <Button
            form='form'
            disabled={moveBookmarkFolderMutation.isPending}
            type='submit'
          >
            {moveBookmarkFolderMutation.isPending ? (
              <LoadingDots className='size-[4px]' />
            ) : (
              <span>move</span>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
