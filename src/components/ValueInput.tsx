import { useDataStore } from '@/store/store.ts';
import { type ChangeEvent, forwardRef, type KeyboardEvent, useImperativeHandle, useState } from 'react';

import type { PossibleValue } from '@/types/awaited-data.ts';
import type { CompoundKey } from '@/types/structure.ts';

interface ValueInputHandle {
  getValue: () => PossibleValue;
}
interface ValueInputProps {
  initialValue: PossibleValue;
  compoundKey: CompoundKey;
  onSave?: (value: PossibleValue) => void;
  onCancel?: () => void;
}

const ValueInput = forwardRef<ValueInputHandle, ValueInputProps>(function ValueInput({ initialValue, compoundKey }: ValueInputProps, ref) {
  const [value, setValue] = useState<PossibleValue>(initialValue);

  const saveValue = useDataStore(state => state.saveValue);
  const resetCurrentEditedKey = useDataStore(state => state.resetCurrentEditedKey);

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const preparedValue = typeof value === 'boolean' && 'checked' in e.target
      ? e.target.checked
      : e.target.value;

    setValue(preparedValue);
  };
  const onKeyDown = (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.code === 'Enter' && !e.shiftKey) {
      const preparedValue = typeof initialValue === 'number' && !Number.isNaN(Number(value))
        ? Number(value)
        : value;

      saveValue(compoundKey, preparedValue);
      resetCurrentEditedKey();
    } else if (e.code === 'Escape') {
      resetCurrentEditedKey();
    }
  };

  useImperativeHandle(ref, () => ({
    getValue: () => value,
  }));

  switch (typeof initialValue) {
    case 'boolean':
      return (
        <input
          name="edit-value"
          type="checkbox"
          checked={value as boolean}
          onChange={onChange}
          onKeyDown={onKeyDown}
          autoFocus
          placeholder="New value"
          className="checkbox"
        />
      );
    case 'number':
      return (
        <input
          name="edit-value"
          type="number"
          value={value as number}
          onChange={onChange}
          onKeyDown={onKeyDown}
          autoFocus
          placeholder="New value"
          className="input w-full"
        />
      );
    default:
      return (
        <textarea
          name="edit-value"
          value={value as string}
          onChange={onChange}
          onKeyDown={onKeyDown}
          autoFocus
          placeholder="New value"
          className="textarea w-full min-h-50"
        />
      );
  }
});

export default ValueInput;
