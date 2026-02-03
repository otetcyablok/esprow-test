import DetailedView from '@/components/DetailedView.tsx';
import JsonInput from '@/components/JsonInput.tsx';
import NamedObjectsList from '@/components/NamedObjectsList.tsx';

import { useDataStore } from '@/store/store.ts';

function App() {
  const data = useDataStore(state => state.data);

  return (
    <div className="flex flex-col gap-2 h-full">
      <div className="flex flex-col gap-2 items-center">
        <h1 className="text-2xl font-bold">JSON Tree Viewer</h1>
        <JsonInput />
      </div>

      <div className="flex gap-4">
        <h2 className="w-full text-xl font-bold mt-0">Nested Tree View:</h2>
        <h2 className="w-full text-xl font-bold mt-0">Detailed View:</h2>
      </div>

      <div className="flex grow-2 gap-4 overflow-auto">
        <div className="p-2 w-full overflow-auto border-2">
          {data ? <NamedObjectsList data={data} /> : <i>Upload .json file to browse structure</i>}
        </div>
        <DetailedView className="p-2 w-full overflow-auto border-2" />
      </div>
    </div>
  )
}

export default App;
