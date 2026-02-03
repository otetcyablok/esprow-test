import { memo, type ReactElement, useState } from 'react';

import type { AwaitedData } from '@/types/awaited-data.ts';
import { useSelectedStore } from '@/store/store.ts';

const MemoizedListItem = memo(function ListItem({ data }: { data: AwaitedData }) {
  const [isExpanded, setExpanded] = useState(false);
  const toggleExpanded = () => setExpanded(!isExpanded);

  const togglableSelect = useSelectedStore(state => state.togglableSelect);
  const selectData = () => togglableSelect(data);
  const isSelected = useSelectedStore(state => state.selected?.name === data.name);

  const hasChildren = !!data.children?.length;

  return (
    <li>
      <div className="flex items-center gap-2">
        {hasChildren ? <div
          className={`inline-block triangle-arrow cursor-pointer ${isExpanded ? 'expanded' : ''}`}
          onClick={toggleExpanded}
        /> : <div className="w-4" />}

        <div
          className={`cursor-pointer transition-colors ${isSelected ? 'text-amber-200' : ''}`}
          onClick={selectData}
        >
          {data.name}
        </div>
      </div>

      <div className="pl-4">
        {hasChildren && isExpanded && <MemoizedNamedObjectsList data={data.children!} />}
      </div>
    </li>
  );
});

const MemoizedNamedObjectsList = memo(function NamedObjectsList({ data }: { data: AwaitedData[] }): ReactElement {
  return <ul className="list-triangle">
    {data?.map((data) => <MemoizedListItem key={data.name} data={data} />)}
  </ul>;
});

export default MemoizedNamedObjectsList;
