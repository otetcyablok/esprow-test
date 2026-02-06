import { create } from 'zustand';

import type { AwaitedData, PossibleValue } from '@/types/awaited-data.ts';
import type { CompoundKey } from '@/types/structure.ts';

import parseKey from '@/helpers/parse-key.ts';
import typedEntries from '@/helpers/typed-entries.ts';

interface DataState {
  data: AwaitedData[] | null;
  currentEditedKey: CompoundKey | null;
  setCurrentEditedKey: (key: CompoundKey) => void;
  resetCurrentEditedKey: () => void;
  changedData: Record<CompoundKey, PossibleValue>
  setData: (data: AwaitedData[]) => void;
  resetData: () => void;
  getSpecificValue: (compoundKey: CompoundKey) => PossibleValue | undefined;
  getChangedData: () => AwaitedData[];
  saveValue: (key: CompoundKey, value: PossibleValue) => void;
}

const useDataStore = create<DataState>()((set, get) => ({
  data: null,
  changedData: {},
  currentEditedKey: null,
  setCurrentEditedKey: (key) => set(() => ({ currentEditedKey: key })),
  resetCurrentEditedKey: () => set(() => ({ currentEditedKey: null })),
  setData: (data: AwaitedData[]) => set(() => ({
    data,
    changedData: {},
  })),
  resetData: () => set(() => ({ data: null })),
  getSpecificValue: (compoundKey) => {
    const originalData = get().data;

    if (!originalData) return undefined;

    const changedData = get().changedData;
    const [strIndex, key] = parseKey(compoundKey);

    return compoundKey in changedData ? changedData[compoundKey] : originalData[Number(strIndex)][key];
  },
  saveValue: (compoundKey, value) => set((state) => {
    const changedData = {
      ...state.changedData,
      [compoundKey]: value,
    };

    return { changedData };
  }),
  getChangedData: () => {
    const { data, changedData } = get();
    const originalData = data ? structuredClone(data) : [];

    typedEntries(changedData).forEach(([compoundKey, value]) => {
      const [strIndex, key] = parseKey(compoundKey);

      originalData[Number(strIndex)][key] = value;
    });

    return originalData;
  },
}));

export {
  useDataStore,
};
