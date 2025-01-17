import { proxy } from 'valtio';

export const editStore = proxy<{
  isAdding: boolean;
  isManagingFolders: boolean;
  isManagingBookmarks: boolean;
}>({
  isAdding: false,
  isManagingFolders: false,
  isManagingBookmarks: false,
});
