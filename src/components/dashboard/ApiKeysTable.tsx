import { useState } from 'react';
import { FiEdit2, FiTrash2, FiPlus, FiEye, FiEyeOff, FiCopy } from "react-icons/fi";
import { ApiKey } from '@/types/api';
import { maskKey } from '@/lib/utils';
import { useCopyToClipboard } from '@/hooks/useCopyToClipboard';

interface ApiKeysTableProps {
  apiKeys: ApiKey[];
  loading: boolean;
  error: string | null;
  visible: boolean;
  onOpenCreate: () => void;
  onOpenEdit: (key: ApiKey) => void;
  onOpenDelete: (key: ApiKey) => void;
}

export function ApiKeysTable({ 
  apiKeys, 
  loading, 
  error, 
  visible, 
  onOpenCreate, 
  onOpenEdit, 
  onOpenDelete 
}: ApiKeysTableProps) {
  const [showKeyId, setShowKeyId] = useState<string | null>(null);
  const { copiedId, handleCopy } = useCopyToClipboard();

  return (
    <div className={`bg-white dark:bg-[#18181c] rounded-2xl shadow-lg p-6 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="font-bold text-lg">API Keys</div>
        <button
          className="inline-flex items-center gap-2 rounded bg-black text-white px-3 py-1.5 font-medium shadow hover:bg-neutral-800 transition cursor-pointer"
          onClick={onOpenCreate}
        >
          <FiPlus />
          New
        </button>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        The key is used to authenticate your requests to the Research API. To learn more, see the <a href="#" className="underline">documentation</a> page.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1100px] text-sm table-auto">
          <thead>
            <tr className="text-left text-muted-foreground border-b">
              <th className="py-2 font-semibold">Name</th>
              <th className="py-2 font-semibold">Usage</th>
              <th className="py-2 font-semibold">Key</th>
              <th className="py-2 font-semibold">Created At</th>
              <th className="py-2 font-semibold">Updated At</th>
              <th className="py-2 font-semibold text-center">Options</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} className="text-center py-8 text-muted-foreground">Loading...</td></tr>
            ) : error ? (
              <tr><td colSpan={6} className="text-center py-8 text-red-500">{error}</td></tr>
            ) : apiKeys.length === 0 ? (
              <tr><td colSpan={6} className="text-center py-8 text-muted-foreground">No API keys found.</td></tr>
            ) : (
              apiKeys.map((key, i) => (
                <tr
                  key={key.id}
                  className={`border-b last:border-0 transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} delay-[${i * 60}ms]`}
                  style={{ transitionDelay: `${i * 60 + 400}ms` }}
                >
                  <td className="py-2 pr-4 font-medium">{key.name}</td>
                  <td className="py-2 pr-4">{key.usage}</td>
                  <td className="py-2 pr-4">
                    <div className="flex items-center gap-2 font-mono">
                      <span>{maskKey(key.value, showKeyId === key.id)}</span>
                      <button
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer"
                        onClick={() => setShowKeyId(showKeyId === key.id ? null : key.id)}
                        aria-label={showKeyId === key.id ? "Hide key" : "Show key"}
                      >
                        {showKeyId === key.id ? <FiEyeOff /> : <FiEye />}
                      </button>
                      <button
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 relative cursor-pointer"
                        onClick={() => handleCopy(key.value, key.id)}
                        aria-label="Copy key"
                      >
                        <FiCopy />
                        {copiedId === key.id && (
                          <span className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-semibold animate-pop">
                            Copied!
                          </span>
                        )}
                      </button>
                    </div>
                  </td>
                  <td className="py-2 pr-4 whitespace-nowrap">{key.created_at ? new Date(key.created_at).toLocaleString() : '-'}</td>
                  <td className="py-2 pr-4 whitespace-nowrap">{key.updated_at ? new Date(key.updated_at).toLocaleString() : '-'}</td>
                  <td className="py-2 pr-4">
                    <div className="flex items-center gap-2 justify-center">
                      <button
                        className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer"
                        onClick={() => onOpenEdit(key)}
                        aria-label="Edit"
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        className="p-2 rounded hover:bg-red-100 text-red-600 dark:hover:bg-red-900 cursor-pointer"
                        onClick={() => onOpenDelete(key)}
                        aria-label="Delete"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
} 