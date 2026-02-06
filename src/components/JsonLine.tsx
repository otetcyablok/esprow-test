import type { CompoundKey } from '@/types/structure.ts';

import EditableValue from '@/components/EditableStroke.tsx';
import { memo } from 'react';

type JsonLineProps = {
  compoundKey: CompoundKey;
}

const memoizedJsonLine = memo(function JsonLine({ compoundKey }: JsonLineProps) {
  const [, key] = compoundKey.split('-');

  if (key === 'open' || key === 'close') {
    return (
      <div>
        {key === 'open' ? '{' : '}'}{key === 'close' && ','}
      </div>
    );
  }

  return (
    <div className="pl-4 flex items-start justify-start">
      <div>{JSON.stringify(key)}</div>
      <div className="pr-2">:</div>
      <EditableValue compoundKey={compoundKey} />
    </div>
  );
});

export default memoizedJsonLine;
