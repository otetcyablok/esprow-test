import { type KeyboardEvent, useRef, useState, type ChangeEvent } from 'react';

import type { CompoundKey } from '@/types/structure.ts';
import type { PossibleValue } from '@/types/awaited-data.ts';
import createStructure from '@/helpers/create-structure.ts';
import { useDataStore } from '@/store/store.ts';

type EditableValueProps = {
  compoundKey: CompoundKey;
}
type JsonLineProps = {
  compoundKey: CompoundKey;
}
type DetailedViewProps = {
  className?: string;
}

function EditableValue({ compoundKey }: EditableValueProps) {
  const storedValue = useDataStore(state => state.getSpecificValue(compoundKey));
  const saveValue = useDataStore(state => state.saveValue);
  const [editMode, setEditMode] = useState<boolean>(false);
  const startEditing = () => setEditMode(true);

  const [value, setValue] = useState<PossibleValue>(storedValue);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => setValue(typeof value === 'boolean'
    ? e.target.checked
    : e.target.value);
  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      const val = typeof storedValue === 'number' && !Number.isNaN(Number(value)) ? Number(value) : value;
      saveValue(compoundKey, val);
      setEditMode(false);
    } else if (e.code === 'Escape') {
      setValue(value);
      setEditMode(false);
    }
  }

  let element;

  switch (typeof storedValue) {
    case 'boolean':
      element = (<input
        type="checkbox"
        checked={value as boolean}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />);
      break;
    case 'number':
      element = (<input
        type="number"
        value={value as number}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />);
      break;
    case 'string':
      element = (<input
        type="text"
        value={value as string}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />);
      break;
    default:
      throw Error('unexpected type of `line.value`');
  }

  return (
    editMode
      ? <div>{element},</div>
      : <div onClick={startEditing}>{JSON.stringify(storedValue)},</div>
  );
}

function JsonLine({ compoundKey }: JsonLineProps) {
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
}

function DetailedView({ className }: DetailedViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const data = useDataStore(state => state.data);

  const structure = createStructure(data);

  // useEffect(() => {
  //   containerRef.current?.scrollTo(0, 0);
  // }, [data]);

  return (
    <div ref={containerRef} className={`${className} border-2`}>
      <div className="p-2 whitespace-pre-wrap">
        {data
          ? structure.map(compoundKey => <JsonLine key={compoundKey} compoundKey={compoundKey} />)
          : <i>Select an item in the left panel</i>}
      </div>
    </div>
  );
}

export default DetailedView;
