import type { CompoundKey } from '@/types/structure.ts';
import { useDataStore } from '@/store/store.ts';

type EditableValueProps = {
  compoundKey: CompoundKey;
}

function EditableStroke({ compoundKey }: EditableValueProps) {
  const storedValue = useDataStore(state => state.getSpecificValue(compoundKey));

  const setCurrentEditedKey = useDataStore(state => state.setCurrentEditedKey);
  const startEditing = () => setCurrentEditedKey(compoundKey)

  return (
    <div onClick={startEditing} className="cursor-pointer underline">
      {JSON.stringify(storedValue)},
    </div>
  );
}

export default EditableStroke;
