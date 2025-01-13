import { proxy } from 'valtio';

export const editStore = proxy<{ isAdding: boolean; isManaging: boolean }>({
  isAdding: false,
  isManaging: false,
});
