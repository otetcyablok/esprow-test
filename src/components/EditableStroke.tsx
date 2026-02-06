import { type KeyboardEvent, type ChangeEvent, useState } from 'react';
import { createPortal } from 'react-dom';

import type { CompoundKey } from '@/types/structure.ts';
import type { PossibleValue } from '@/types/awaited-data.ts';
import { useDataStore } from '@/store/store.ts';

import ModalEdit from '@/components/ModalEdit.tsx';

type EditableValueProps = {
  compoundKey: CompoundKey;
}

function EditableValue({ compoundKey }: EditableValueProps) {
  const storedValue = useDataStore(state => state.getSpecificValue(compoundKey));
  const saveValue = useDataStore(state => state.saveValue);

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [value, setValue] = useState<PossibleValue>(storedValue);

  const openDialog = () => {
    setValue(storedValue);
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const handleSave = () => {
    const val = typeof storedValue === 'number' && !Number.isNaN(Number(value))
      ? Number(value)
      : value;
    saveValue(compoundKey, val);
    closeDialog();
  };

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setValue(
    typeof value === 'boolean' && 'checked' in e.target
      ? e.target.checked
      : e.target.value
  );

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.code === 'Enter' && !e.shiftKey) {
      handleSave();
    } else if (e.code === 'Escape') {
      closeDialog();
    }
  };

  let inputElement;

  switch (typeof storedValue) {
    case 'boolean':
      inputElement = (
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
      break;
    case 'number':
      inputElement = (
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
      break;
    case 'string':
      inputElement = (
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
      break;
    default:
      throw Error('unexpected type of `line.value`');
  }

  return (
    <>
      <div onClick={openDialog} className="cursor-pointer">
        {JSON.stringify(storedValue)},
      </div>

      {dialogOpen && createPortal(
        <ModalEdit
          onCancel={closeDialog}
          onSave={handleSave}
          children={inputElement}
        />,
        document.body
      )}
    </>
  );
}

export default EditableValue;
