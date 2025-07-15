import { ApiKeyForm, ModalType } from '@/types/api';
import { generateApiKey } from '@/lib/utils';

interface ApiKeyModalProps {
  modal: ModalType;
  form: ApiKeyForm;
  limitEnabled: boolean;
  limit: number;
  onFormChange: (form: ApiKeyForm) => void;
  onLimitEnabledChange: (enabled: boolean) => void;
  onLimitChange: (limit: number) => void;
  onSubmit: () => void;
  onClose: () => void;
}

export function ApiKeyModal({
  modal,
  form,
  limitEnabled,
  limit,
  onFormChange,
  onLimitEnabledChange,
  onLimitChange,
  onSubmit,
  onClose,
}: ApiKeyModalProps) {
  if (!modal || (modal.type !== 'create' && modal.type !== 'edit')) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 w-full max-w-md transform transition-all duration-300 scale-95 opacity-0 animate-modal-in">
        <h2 className="text-2xl font-bold mb-2 text-center">
          {modal.type === 'create' ? 'Create a new API key' : 'Edit API key'}
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-300 mb-6">
          Enter a name and limit for the new API key.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
          className="flex flex-col gap-4"
        >
          <div>
            <label className="block text-sm font-semibold mb-1" htmlFor="key-name">
              Key Name{' '}
              <span className="font-normal text-gray-400">
                — A unique name to identify this key
              </span>
            </label>
            <input
              id="key-name"
              className="w-full border-2 border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-base transition"
              placeholder="Key Name"
              value={form.name}
              onChange={(e) => onFormChange({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              id="limit-enabled"
              type="checkbox"
              checked={limitEnabled}
              onChange={(e) => onLimitEnabledChange(e.target.checked)}
              className="accent-primary w-4 h-4 rounded border-gray-300"
            />
            <label htmlFor="limit-enabled" className="text-sm font-medium select-none">
              Limit monthly usage<span className="text-gray-400">*</span>
            </label>
          </div>
          <input
            type="number"
            className="w-full border-2 border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 text-base transition disabled:bg-gray-100 dark:disabled:bg-gray-800"
            placeholder="1000"
            value={limit}
            onChange={(e) => onLimitChange(Number(e.target.value))}
            disabled={!limitEnabled}
            min={1}
          />
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
            * If the combined usage of all your keys exceeds your plan&apos;s limit, all requests
            will be rejected.
          </div>
          <div className="relative">
            <label className="block text-sm font-semibold mb-1" htmlFor="key-value">
              Key Value
            </label>
            <input
              id="key-value"
              className="w-full border-2 border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 font-mono focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-base transition pr-24"
              placeholder="API Key"
              value={form.value}
              onChange={(e) => onFormChange({ ...form, value: e.target.value })}
              required
              readOnly={modal.type === 'create'}
            />
            {modal.type === 'create' && (
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 rounded bg-gray-100 dark:bg-gray-800 text-xs font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition cursor-pointer"
                onClick={() => onFormChange({ ...form, value: generateApiKey() })}
              >
                Regenerate
              </button>
            )}
          </div>
          <div className="flex gap-4 justify-center mt-2">
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition text-base cursor-pointer"
            >
              {modal.type === 'create' ? 'Create' : 'Save'}
            </button>
            <button
              type="button"
              className="px-6 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 font-semibold transition text-base cursor-pointer"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
