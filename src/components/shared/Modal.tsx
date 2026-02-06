import type { ReactElement } from 'react';

type ModalProps = {
  title: string;
  onCancel: () => void;
  onSave: () => void;
  children: ReactElement;
}

function Modal({ title, onCancel, onSave, children }: ModalProps) {
  return (
    <div
      className="fixed flex items-center justify-center top-0 left-0 right-0 bottom-0 z-50"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      onClick={onCancel}
    >
      <div
        className="bg-white p-4 border-r-2 min-w-100"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-bold">{title}</h3>
        <div className="mt-4 mb-4">{children}</div>
        <div className="flex gap-2 justify-end">
          <button className="btn" onClick={onCancel}>Cancel</button>
          <button className="btn btn-neutral" onClick={onSave}>Save</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
