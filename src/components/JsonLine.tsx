import { memo } from 'react';

import type { JsonLine } from '@/types/structure.ts';

import EditableStroke from '@/components/EditableStroke.tsx';

type JsonLineProps = {
  element: JsonLine;
}

const memoizedJsonLine = memo(function JsonLine({ element }: JsonLineProps) {
  if (element.structure) {
    return (
      <div>{element.value}{element.comma && ','}</div>
    );
  }

  return (
    <div className="pl-4 flex items-start justify-start">
      <div>{JSON.stringify(element.value.key)}</div>
      <div className="pr-2">:</div>
      <EditableStroke compoundKey={element.value} />
    </div>
  );
});

export default memoizedJsonLine;
