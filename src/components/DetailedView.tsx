import { memo, useEffect, useMemo, useRef } from 'react';

import { useSelectedStore } from '@/store/store.ts';

type DetailedViewProps = {
  className: string;
}

const MemoizedDetailedView = memo(function DetailedView({ className }: DetailedViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const selected = useSelectedStore(state => state.selected);
  const printedValue = useMemo(
    () => selected ? JSON.stringify(selected, null, 2) : null,
    [selected]
  );

  useEffect(() => {
    containerRef.current?.scrollTo(0, 0);
  }, [selected]);

  return (
    <div ref={containerRef} className={`${className} whitespace-pre-wrap`}>
      {printedValue || <i>Select an item in the left panel</i>}
    </div>
  );
});

export default MemoizedDetailedView;
