import { type ComponentRef, useRef } from 'react';
import { createPortal } from 'react-dom';

import { useDataStore } from '@/store/store.ts';

import Modal from '@/components/shared/Modal.tsx';
import ValueInput from '@/components/ValueInput.tsx';

function ModalEdit() {
  const currentEditedKey = useDataStore(state => state.currentEditedKey);
  const storedValue = useDataStore(state => currentEditedKey ? state.getSpecificValue(currentEditedKey) : undefined);
  const resetCurrentEditedKey = useDataStore(state => state.resetCurrentEditedKey);
  const saveValue = useDataStore(state => state.saveValue);
  const valueInputRef = useRef<ComponentRef<typeof ValueInput>>(null);

  if (storedValue === undefined || currentEditedKey === null) return <></>;

  const reset = () => resetCurrentEditedKey();
  const save = () => {
    const value = valueInputRef.current?.getValue();

    if (value !== undefined) saveValue(currentEditedKey, value);

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
