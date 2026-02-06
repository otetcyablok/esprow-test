import { useDataStore } from '@/store/store.ts';

import saveJsonFile from '@/helpers/save-json-file.ts';

export default function DownloadButton() {
  const hasChanges = useDataStore(state => !!Object.keys(state.changedData).length);
  const getChangedData = useDataStore(state => state.getChangedData);

  const downloadData = () => {
    const data = getChangedData();

    saveJsonFile(data);
  }

  return (
    <button
      className="btn btn-neutral"
      disabled={!hasChanges}
      onClick={downloadData}
    >
      Save
    </button>
  );
}
