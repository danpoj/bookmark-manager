'use client';

import { useRenameFolderMutation } from '@/apis';
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
  name: z.string().min(1),
});

export const RenameFolderDialog = ({
  folder,
}: {
  folder: Tables<'folders'>;
}) => {
  const renameFolderMutation = useRenameFolderMutation();
  const [openDialog, setOpenDialog] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    renameFolderMutation.mutate(
      {
        name: values.name,
        folderId: folder.id,
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
          ✏️
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>✏️ Update folder name</DialogTitle>
          <DialogDescription className='sr-only'>
            ✏️ Update folder name.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form id='form' onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='sr-only'>folder name</FormLabel>
                  <FormControl>
                    <div className='flex items-center gap-2'>
                      <Input
                        disabled={renameFolderMutation.isPending}
                        {...field}
                      />
                      <Button
                        disabled={renameFolderMutation.isPending}
                        type='submit'
                        form='form'
                      >
                        {renameFolderMutation.isPending ? (
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
