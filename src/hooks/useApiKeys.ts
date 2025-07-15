import { useState, useEffect } from 'react';
import { ApiKey, ApiKeyForm, ModalType } from '@/types/api';
import { generateApiKey } from '@/lib/utils';
import { fetchApiKeys, createApiKey, updateApiKey, deleteApiKey } from '@/api/apiKeys';

export function useApiKeys({
  modal,
  setModal,
  showToast,
}: {
  modal: ModalType;
  setModal: (modal: ModalType) => void;
  showToast: (message: string, type?: 'success' | 'error') => void;
}) {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<ApiKeyForm>({ name: '', value: '' });
  const [limitEnabled, setLimitEnabled] = useState(false);
  const [limit, setLimit] = useState(1000);

  useEffect(() => {
    fetchKeys();
  }, []);

  async function fetchKeys() {
    setLoading(true);
    setError(null);
    const { data, error } = await fetchApiKeys();
    if (error) setError(error);
    else setApiKeys(data || []);
    setLoading(false);
  }

  async function handleCreate() {
    setError(null);
    const { data, error } = await createApiKey({
      name: form.name,
      value: form.value,
      usage: 0,
      limit: limitEnabled ? limit : null,
      created_at: new Date().toISOString(),
    });
    if (error) {
      setError(error);
      showToast('Failed to create API key', 'error');
    } else {
      setApiKeys((keys) => [...keys, ...(data || [])]);
      showToast('API key created!', 'success');
    }
    setModal(null);
    setForm({ name: '', value: '' });
  }

  async function handleEdit() {
    if (modal?.type !== 'edit') return;
    setError(null);
    const { data, error } = await updateApiKey(modal.key.id, {
      name: form.name,
      value: form.value,
      limit: limitEnabled ? limit : null,
      updated_at: new Date().toISOString(),
    });
    if (error) {
      setError(error);
      showToast('Failed to update API key', 'error');
    } else {
      setApiKeys((keys) =>
        keys.map((k) => (k.id === modal.key.id ? { ...k, ...(data?.[0] || {}) } : k))
      );
      showToast('API key updated!', 'success');
    }
    setModal(null);
    setForm({ name: '', value: '' });
  }

  async function handleDelete() {
    if (modal?.type !== 'delete') return;
    setError(null);
    const { error } = await deleteApiKey(modal.key.id);
    if (error) {
      setError(error);
      showToast('Failed to delete API key', 'error');
    } else {
      setApiKeys((keys) => keys.filter((k) => k.id !== modal.key.id));
      showToast('API key deleted!', 'success');
    }
    setModal(null);
  }

  function openCreate() {
    setForm({ name: '', value: generateApiKey() });
    setLimitEnabled(false);
    setLimit(1000);
    setModal({ type: 'create' });
  }

  function openEdit(key: ApiKey) {
    setForm({ name: key.name, value: key.value });
    setLimitEnabled(!!key.limit);
    setLimit(key.limit ?? 1000);
    setModal({ type: 'edit', key });
  }

  function openDelete(key: ApiKey) {
    setModal({ type: 'delete', key });
  }

  // Usage stats for the plan card
  const usage = apiKeys.reduce((acc, k) => acc + k.usage, 0);
  const plan = 'Researcher';

  return {
    // State
    apiKeys,
    loading,
    error,
    modal,
    form,
    limitEnabled,
    limit,
    usage,
    plan,

    // Actions
    setForm,
    setLimitEnabled,
    setLimit,
    setModal,
    handleCreate,
    handleEdit,
    handleDelete,
    openCreate,
    openEdit,
    openDelete,
  };
}
