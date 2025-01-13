'use client';

import { useAddBookmarkMutation } from '@/apis';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { Input } from '@/components/ui/input';
import { Tables } from '@/database.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  url: z.string().url({ message: '주소를 다시 확인해주세요.' }),
});

export const AddBookmarkDialog = ({
  folder,
}: {
  folder: Tables<'folders'>;
}) => {
  const addBookmarkMutation = useAddBookmarkMutation();
  const [openDialog, setOpenDialog] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    addBookmarkMutation.mutate(
      {
        url: values.url,
        folderId: String(folder.id),
      },
      {
        onSuccess: () => {
          setOpenDialog(false);
          form.reset();
        },
      }
    );
  }

  return (
    <Dialog open={openDialog} onOpenChange={(o) => setOpenDialog(o)}>
      <DialogTrigger asChild>
        <Button variant='outline' className='font-mono'>
          🔗
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>🔗 Add new bookmark</DialogTitle>
          <DialogDescription className='sr-only'>
            🔗 Add new bookmark . must have at least one bookmark.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form id='form' onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='url'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='sr-only'>Bookmark URL</FormLabel>
                  <FormControl>
                    <div className='flex items-center gap-2'>
                      <Input
                        disabled={addBookmarkMutation.isPending}
                        placeholder='https://...'
                        {...field}
                      />
                      <Button
                        disabled={addBookmarkMutation.isPending}
                        type='submit'
                        form='form'
                      >
                        {addBookmarkMutation.isPending ? (
                          <>
                            <span>Adding...</span>
                            <Loader2 className='animate-spin size-4' />
                          </>
                        ) : (
                          <span>Add +</span>
                        )}
                      </Button>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
