import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Tables } from './database.types';
import { dbClient } from './lib/supabase/client';
import { decodeHTMLEntities } from './lib/utils';

export const useFolders = () => {
  const { data: user } = useUser();

  return useQuery({
    queryKey: ['folders'],
    queryFn: async () => {
      const supabase = dbClient();

      if (!user) return [];

      const { data: folders } = await supabase
        .from('folders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true });

      return folders || [];
    },
  });
};

export const useBookmarks = ({ folderId }: { folderId: string }) => {
  const { data: user } = useUser();

  return useQuery({
    enabled: !!folderId,
    queryKey: ['bookmarks', folderId],
    queryFn: async () => {
      const supabase = dbClient();

      if (!user) return [];

      const { data: bookmarks } = await supabase
        .from('bookmarks')
        .select('*')
        .eq('user_id', user.id)
        .eq('folder_id', Number(folderId))
        .order('order_number', { ascending: true });

      return bookmarks || [];
    },
  });
};

export const useUser = () => {
  return useQuery({
    staleTime: Infinity,
    queryKey: ['user'],
    queryFn: async () => {
      const supabase = dbClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      return user;
    },
  });
};

export const useLoginMutation = () => {
  const client = useQueryClient();

  return useMutation<void, Error, { provider: 'github' | 'kakao' | 'google' }>({
    mutationFn: async ({ provider }) => {
      const supabase = dbClient();

      await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${location.origin}/auth/callback`,
        },
      });

      client.invalidateQueries();
    },
  });
};

export const useLogoutMutation = () => {
  const client = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      const supabase = dbClient();
      await supabase.auth.signOut();
      client.invalidateQueries();
      router.refresh();
    },
  });
};

export const useAddFolderMutation = () => {
  const client = useQueryClient();
  const { data: user } = useUser();

  return useMutation<
    void,
    Error,
    {
      name: Tables<'folders'>['name'];
    }
  >({
    mutationFn: async ({ name }) => {
      const supabase = dbClient();

      if (!user) {
        toast.error('unauthorized');
        return;
      }

      await supabase.from('folders').insert({
        name,
        user_id: user.id,
      });

      client.invalidateQueries({ queryKey: ['folders'] });
    },
  });
};

export const useAddBookmarkMutation = () => {
  const client = useQueryClient();
  const { data: user } = useUser();

  return useMutation<
    void,
    Error,
    {
      url: string;
      folderId: string;
    }
  >({
    mutationFn: async ({ url, folderId }) => {
      const { title } = (await fetch(`/api/title?url=${url}`).then((r) =>
        r.json()
      )) as { title: string };

      const decodedTitle = decodeHTMLEntities({ str: title });

      const supabase = dbClient();

      if (!user) {
        toast.error('unauthorized');
        return;
      }

      const { error } = await supabase.from('bookmarks').insert({
        title: decodedTitle,
        url,
        user_id: user.id,
        folder_id: Number(folderId),
      });

      if (error) {
        toast.error('failed to add bookmark.');
        return;
      }

      client.invalidateQueries({ queryKey: ['bookmarks', folderId] });
    },
  });
};

export const useDeleteBookmarkMutation = () => {
  const client = useQueryClient();
  const { data: user } = useUser();

  return useMutation<
    void,
    Error,
    { bookmarkId: Tables<'bookmarks'>['id']; folderId: string }
  >({
    mutationFn: async ({ bookmarkId, folderId }) => {
      if (!user) return;

      const supabase = dbClient();
      await supabase
        .from('bookmarks')
        .delete()
        .eq('id', bookmarkId)
        .eq('user_id', user.id);

      client.invalidateQueries({
        queryKey: ['bookmarks', folderId],
      });
    },
  });
};

export const useUpdateBookmarkTitleMutation = () => {
  const client = useQueryClient();
  const { data: user } = useUser();

  return useMutation<
    void,
    Error,
    {
      title: Tables<'bookmarks'>['title'];
      bookmarkId: Tables<'bookmarks'>['id'];
      folderId: string;
    }
  >({
    mutationFn: async ({ title, bookmarkId, folderId }) => {
      if (!user) return;

      const supabase = dbClient();
      await supabase
        .from('bookmarks')
        .update({ title })
        .eq('id', bookmarkId)
        .eq('user_id', user.id);

      client.invalidateQueries({
        queryKey: ['bookmarks', folderId],
      });
    },
  });
};

export const useDeleteFolderMutation = () => {
  const client = useQueryClient();
  const { data: user } = useUser();

  return useMutation<void, Error, { folderId: Tables<'folders'>['id'] }>({
    mutationFn: async ({ folderId }) => {
      if (!user) return;

      const supabase = dbClient();
      await supabase
        .from('folders')
        .delete()
        .eq('id', folderId)
        .eq('user_id', user.id);

      client.invalidateQueries({ queryKey: ['bookmarks', String(folderId)] });
      client.invalidateQueries({ queryKey: ['folders'] });
    },
  });
};

export const useRenameFolderMutation = () => {
  const client = useQueryClient();
  const { data: user } = useUser();

  return useMutation<
    void,
    Error,
    { folderId: Tables<'folders'>['id']; name: Tables<'folders'>['name'] }
  >({
    mutationFn: async ({ folderId, name }) => {
      if (!user) return;

      const supabase = dbClient();
      await supabase
        .from('folders')
        .update({ name })
        .eq('id', folderId)
        .eq('user_id', user.id);

      client.invalidateQueries({ queryKey: ['folders'] });
    },
  });
};

export const useOptimisticUpdateBookmarkOrder = () => {
  const client = useQueryClient();
  const { data: user } = useUser();

  return useMutation<
    void,
    Error,
    {
      bookmarks: Tables<'bookmarks'>[];
      sourceIndex: number;
      destinationIndex: number;
      folderId: string;
    }
  >({
    mutationFn: async ({ bookmarks, sourceIndex, destinationIndex }) => {
      const supabase = dbClient();
      const source = bookmarks[sourceIndex];
      let order_number: number;

      if (destinationIndex === 0) {
        order_number = bookmarks[0].order_number / 2;
      } else if (destinationIndex === bookmarks.length - 1) {
        order_number = Date.now();
      } else {
        if (sourceIndex > destinationIndex) {
          order_number =
            (bookmarks[destinationIndex].order_number +
              bookmarks[destinationIndex - 1].order_number) /
            2;
        } else {
          order_number =
            (bookmarks[destinationIndex].order_number +
              bookmarks[destinationIndex + 1].order_number) /
            2;
        }
      }

      if (!user) return;

      await supabase
        .from('bookmarks')
        .update({ order_number })
        .eq('id', source.id)
        .eq('user_id', user.id);
    },

    onMutate: async ({ sourceIndex, destinationIndex, folderId }) => {
      await client.cancelQueries({ queryKey: ['bookmarks', folderId] });

      client.setQueryData(['bookmarks', folderId], () => {
        const previousBookmarks = client.getQueryData<Tables<'bookmarks'>[]>([
          'bookmarks',
          folderId,
        ]);

        if (!previousBookmarks) return previousBookmarks;

        const newBookmarks = [...previousBookmarks];
        const [newBookmark] = newBookmarks.splice(sourceIndex, 1);
        newBookmarks.splice(destinationIndex, 0, newBookmark);

        return newBookmarks;
      });
    },

    onError: (_, { folderId }, context) => {
      client.setQueryData(['bookmarks', folderId], context);
    },

    onSuccess(_, { folderId }) {
      client.invalidateQueries({ queryKey: ['bookmarks', folderId] });
    },
  });
};

export const useMoveBookmarkFolderMutation = () => {
  const { data: user } = useUser();
  const client = useQueryClient();

  return useMutation<
    void,
    Error,
    {
      bookmarkId: Tables<'bookmarks'>['id'];
      sourceFolderId: Tables<'folders'>['id'];
      destinationFolderId: Tables<'folders'>['id'];
    }
  >({
    mutationFn: async ({ bookmarkId, sourceFolderId, destinationFolderId }) => {
      if (!user) return;

      const supabase = dbClient();

      const { data } = await supabase
        .from('bookmarks')
        .select('order_number')
        .eq('user_id', user.id)
        .eq('folder_id', Number(destinationFolderId))
        .order('order_number', { ascending: true })
        .limit(1)
        .single();

      if (!data) return;

      const { error } = await supabase
        .from('bookmarks')
        .update({
          folder_id: destinationFolderId,
          order_number: data?.order_number / 2,
        })
        .eq('id', bookmarkId);

      if (!error) {
        client.invalidateQueries({
          queryKey: ['bookmarks', String(sourceFolderId)],
        });
        client.invalidateQueries({
          queryKey: ['bookmarks', String(destinationFolderId)],
        });
      }
    },
  });
};
