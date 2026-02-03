import { create } from 'zustand';
import type { AwaitedData } from '@/types/awaited-data.ts';

interface DataState {
  data: AwaitedData[] | null;
  setData: (data: AwaitedData[]) => void;
  resetData: () => void;
}
interface SelectedState {
  selected: AwaitedData | null;
  togglableSelect: (element: AwaitedData) => void;
  resetSelected: () => void;
}

const useDataStore = create<DataState>()((set) => ({
  data: null,
  setData: (data: AwaitedData[]) => set(() => ({ data })),
  resetData: () => set(() => ({ data: null })),
}));
const useSelectedStore = create<SelectedState>()((set) => ({
  selected: null,
  togglableSelect: (data) => set((state) => (
    state.selected?.name === data.name ? { selected: null } : { selected: data }
  )),
  resetSelected: () => set(() => ({ selected: null })),
}));

export {
  useDataStore,
  useSelectedStore,
};
