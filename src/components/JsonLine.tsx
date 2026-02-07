import { memo } from 'react';

import type { JsonLine } from '@/types/structure.ts';
import parseKey from '@/helpers/parse-key.ts';

import EditableValue from '@/components/EditableStroke.tsx';

type JsonLineProps = {
  element: JsonLine;
}

const memoizedJsonLine = memo(function JsonLine({ element }: JsonLineProps) {

  if (element.structure) {
    return (
      <div>{element.value}{element.comma && ','}</div>
    );
  }

  const [, key] = parseKey(element.value);

  return (
    <div className="pl-4 flex items-start justify-start">
      <div>{JSON.stringify(key)}</div>
      <div className="pr-2">:</div>
      <EditableValue compoundKey={element.value} />
    </div>
  );
});

export default memoizedJsonLine;
