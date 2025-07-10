import { ModalType } from '@/types/api';

interface DeleteModalProps {
  modal: ModalType;
  onDelete: () => void;
  onClose: () => void;
}

export function DeleteModal({ modal, onDelete, onClose }: DeleteModalProps) {
  if (!modal || modal.type !== "delete") {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 w-full max-w-sm transform transition-all duration-300 scale-95 opacity-0 animate-modal-in">
        <h2 className="text-lg font-bold mb-4">Delete API Key</h2>
        <p className="mb-4">
          Are you sure you want to delete <span className="font-semibold">{modal.key.name}</span>?
        </p>
        <div className="flex gap-2 justify-end">
          <button
            className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 cursor-pointer"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 font-semibold cursor-pointer"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
} 