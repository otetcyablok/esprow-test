import { create } from 'zustand';

import type { AwaitedData, PossibleValue } from '@/types/awaited-data.ts';
import type { CompoundKey } from '@/types/structure.ts';

interface DataState {
  data: AwaitedData[] | null;
  currentEditedKey: CompoundKey | null;
  setCurrentEditedKey: (compoundKey: CompoundKey) => void;
  resetCurrentEditedKey: () => void;
  changedData: AwaitedData[],
  setData: (data: AwaitedData[]) => void;
  resetData: () => void;
  getSpecificValue: (compoundKey: CompoundKey) => PossibleValue | undefined;
  getChangedData: () => AwaitedData[];
  saveValue: (compoundKey: CompoundKey, value: PossibleValue) => void;
}

const useDataStore = create<DataState>()((set, get) => ({
  data: null,
  changedData: [],
  currentEditedKey: null,
  currentEditedIndex: null,
  setCurrentEditedKey: (compoundKey) => set(() => ({ currentEditedKey: compoundKey })),
  resetCurrentEditedKey: () => set(() => ({ currentEditedKey: null })),
  setData: (data: AwaitedData[]) => set(() => ({
    data,
    changedData: [],
  })),
  resetData: () => set(() => ({ data: null })),
  getSpecificValue: (compoundKey) => {
    const originalData = get().data;

    if (!originalData) return undefined;

    const { index, key } = compoundKey;
    const changedData = get().changedData;

    return changedData[index]?.[key] || originalData[index][key];
  },
  saveValue: (compoundKey, value) => set((state) => {
    const changedData = structuredClone(state.changedData);
    const { index, key } = compoundKey;

    if (!changedData[index]) {
      changedData[index] = {};
    }

    changedData[index][key] = value;

    return { changedData };
  }),
  getChangedData: () => {
    const { data, changedData } = get();
    const originalData = data ? structuredClone(data) : [];

    changedData.forEach((element, index) => {
      for (const key in element) {
        originalData[index][key] = element[key];
      }
    });

    return originalData;
  },
}));

export {
  useDataStore,
};
