import { type ComponentRef, useRef } from 'react';
import { createPortal } from 'react-dom';

import { useDataStore } from '@/store/store.ts';

import Modal from '@/components/Modal.tsx';
import ValueInput from '@/components/ValueInput.tsx';

function ModalEdit() {
  const currentEditedKey = useDataStore(state => state.currentEditedKey);
  const storedValue = useDataStore(state => currentEditedKey ? state.getSpecificValue(currentEditedKey) : null);
  const resetCurrentEditedKey = useDataStore(state => state.resetCurrentEditedKey);
  const saveValue = useDataStore(state => state.saveValue);
  const valueInputRef = useRef<ComponentRef<typeof ValueInput>>(null);

  if (storedValue === null || currentEditedKey === null) return <></>;

  const reset = () => resetCurrentEditedKey();
  const save = () => {
    const value = valueInputRef.current?.getValue();

    console.log({ value });
    if (value !== undefined) saveValue(currentEditedKey, value); // TODO: get value from somewhere
    resetCurrentEditedKey();
  };

  return (
    createPortal(
      <Modal
        title="Editing value"
        onCancel={reset}
        onSave={save}
      >
        <ValueInput
          ref={valueInputRef}
          initialValue={storedValue}
          compoundKey={currentEditedKey}
        />
      </Modal>,
      document.body
    )
  );
}

export default ModalEdit;
