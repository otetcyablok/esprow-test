import createStructure from '@/helpers/create-structure.ts';
import { useDataStore } from '@/store/store.ts';

import JsonLine from '@/components/JsonLine.tsx';
import VirtualScroll from '@/components/shared/VirtualScroll.tsx';

function DetailedView() {
  const data = useDataStore(state => state.data);
  const structure = createStructure(data);

  return (
    <div className="h-150 border-2">
      {data ? (
        <VirtualScroll
          items={structure}
          itemHeight={24}
          overscan={25}
          dynamicHeight={true}
          className="h-full p-2"
          renderItem={(structureElement) => (
            <JsonLine element={structureElement} />
          )}
        />
      ) : (
        <div className="p-2">
          <i>Upload .json file to see the structure</i>
        </div>
      )}
    </div>
  );
}

export default DetailedView;
