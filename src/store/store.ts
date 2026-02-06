import { create } from 'zustand';

import type { AwaitedData, PossibleValue } from '@/types/awaited-data.ts';
import type { CompoundKey } from '@/types/structure.ts';

interface DataState {
  data: AwaitedData[] | null;
  changedData: Record<CompoundKey, PossibleValue>
  setData: (data: AwaitedData[]) => void;
  resetData: () => void;
  getSpecificValue: (compoundKey: CompoundKey) => PossibleValue;
  getChangedData: () => AwaitedData[];
  saveValue: (key: CompoundKey, value: PossibleValue) => void;
}

const useDataStore = create<DataState>()((set, get) => ({
  data: null,
  changedData: {},
  setData: (data: AwaitedData[]) => set(() => ({ data })),
  resetData: () => set(() => ({ data: null })),
  getSpecificValue: (compoundKey: CompoundKey) => {
    const originalData = get().data!; // TODO: remove !

    const changedData = get().changedData;
    const [index, key] = compoundKey.split('-');

    return changedData[compoundKey] || originalData[Number(index)][key];
  },
  saveValue: (compoundKey, value) => set((state) => {
    const changedData = {
      ...state.changedData,
      [compoundKey]: value,
    };

    return { changedData };
  }),
  getChangedData: () => {
    const originalData = get().data || []; // TODO: remove possible mutation
    const changedData = get().changedData;

    Object.entries(changedData).forEach(([compoundKey, value]) => {
      const [strIndex, key] = compoundKey.split('-');

      originalData[Number(strIndex)][key] = value;
    });

    return originalData;
  },
}));

export {
  useDataStore,
};
