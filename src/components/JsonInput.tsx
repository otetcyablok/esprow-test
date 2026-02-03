import { type ChangeEvent, useCallback } from 'react';

import type { AwaitedData } from '@/types/awaited-data.ts';
import readJsonFile from '@/helpers/read-json-file.ts';
import { useDataStore, useSelectedStore } from '@/store/store.ts';

function JsonInput() {
  const setData = useDataStore(state => state.setData);
  const resetSelected = useSelectedStore(state => state.resetSelected);

  const handleFileUpload = useCallback(async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      const jsonData = await readJsonFile<AwaitedData[]>(event.target.files[0]);

      if (!jsonData) return;

      resetSelected();
      setData(jsonData);
    }
  }, [resetSelected, setData]);

  return (
    <input
      id="json-input"
      type="file"
      accept=".json"
      className="w-full file-input file-input-neutral bg-transparent border-2"
      onChange={handleFileUpload}
    />
  );
}

export default JsonInput;
