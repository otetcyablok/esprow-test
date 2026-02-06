import { type ChangeEvent, useCallback } from 'react';

import type { AwaitedData } from '@/types/awaited-data.ts';
import readJsonFile from '@/helpers/read-json-file.ts';
import { useDataStore } from '@/store/store.ts';

function JsonInput() {
  const setData = useDataStore(state => state.setData);

  const handleFileUpload = useCallback(async (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      const jsonData = await readJsonFile<AwaitedData[]>(event.target.files[0]);

      if (!jsonData) return;

      setData(jsonData);
    }
  }, [setData]);

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
