import { useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';

import createStructure from '@/helpers/create-structure.ts';
import { useDataStore } from '@/store/store.ts';

import JsonLine from '@/components/JsonLine.tsx';

function DetailedView() {
  const containerRef = useRef<HTMLDivElement>(null);
  const data = useDataStore(state => state.data);

  const structure = createStructure(data);

  const virtualizer = useVirtualizer({
    count: structure.length,
    getScrollElement: () => containerRef.current,
    estimateSize: () => 24,
    measureElement: (el) => el.getBoundingClientRect().height ?? 24,
    overscan: 25,
  });

  return (
    <div ref={containerRef} className="h-150 border-2 p-2 overflow-auto">
      {data ? (
        <div
          className="p-2 whitespace-pre-wrap relative"
          style={{ height: `${virtualizer.getTotalSize()}px` }}
        >
          {virtualizer.getVirtualItems().map(virtualRow => (
            <div
              key={virtualRow.key}
              data-index={virtualRow.index}
              ref={virtualizer.measureElement}
              className="absolute top-0 left-0 w-full"
              style={{ transform: `translateY(${virtualRow.start}px)` }}
            >
              <JsonLine compoundKey={structure[virtualRow.index]} />
            </div>
          ))}
        </div>
      ) : (
        <i>Upload .json file to see the structure</i>
      )}
    </div>
  );
}

export default DetailedView;
