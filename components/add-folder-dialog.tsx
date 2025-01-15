'use client';

import { useAddFolderMutation } from '@/apis';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { PlusIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { LoadingDots } from '@/components/loading-dots';

const formSchema = z.object({
  name: z.string().min(2).max(50),
});

export const AddFolderDialog = () => {
  const [open, setOpen] = useState(false);
  const addFolderMutation = useAddFolderMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    addFolderMutation.mutate(
      { name: values.name },
      { onSuccess: () => setOpen(false) }
    );
  };

  return (
    <Dialog open={open} onOpenChange={(o) => setOpen(o)}>
      <DialogTrigger asChild>
        <Button size='icon' variant='secondary' className='size-8'>
          <PlusIcon className='size-3.5' />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>📂 Add new folder</DialogTitle>
          <DialogDescription className='sr-only'>
            📂 Add new folder . must have at least one folder.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className='flex items-center gap-2'>
                      <Input
                        disabled={addFolderMutation.isPending}
                        placeholder='folder name...'
                        {...field}
                      />
                      <Button
                        disabled={addFolderMutation.isPending}
                        type='submit'
                      >
                        {addFolderMutation.isPending ? (
                          <LoadingDots className='size-[4px]' />
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
