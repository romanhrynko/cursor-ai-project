'use client';
import { useState, useEffect } from "react";
import { 
  PlanCard, 
  ApiKeysTable, 
  ApiKeyModal, 
  DeleteModal 
} from "@/components/dashboard";
import { Toast } from "@/components/ui/Toast";
import { useApiKeys, useModalAndToast } from "@/hooks";

export default function DashboardPage() {
  const [cardVisible, setCardVisible] = useState(false);
  const [tableVisible, setTableVisible] = useState(false);

  const {
    modal,
    setModal,
    closeModal,
    toast,
    showToast,
    clearToast,
  } = useModalAndToast();

  const {
    apiKeys,
    loading,
    error,
    form,
    limitEnabled,
    limit,
    usage,
    plan,
    setForm,
    setLimitEnabled,
    setLimit,
    handleCreate,
    handleEdit,
    handleDelete,
    openCreate,
    openEdit,
    openDelete,
  } = useApiKeys({ modal, setModal, showToast });

  useEffect(() => {
    setTimeout(() => setCardVisible(true), 100);
    setTimeout(() => setTableVisible(true), 350);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#101014] flex">
      <main className="flex-1 py-8 px-2 sm:px-6">
        <div>
          <PlanCard 
            plan={plan}
            usage={usage}
            limit={1000}
            visible={cardVisible}
          />
          
          <ApiKeysTable
            apiKeys={apiKeys}
            loading={loading}
            error={error}
            visible={tableVisible}
            onOpenCreate={openCreate}
            onOpenEdit={openEdit}
            onOpenDelete={openDelete}
          />

          <ApiKeyModal
            modal={modal}
            form={form}
            limitEnabled={limitEnabled}
            limit={limit}
            onFormChange={setForm}
            onLimitEnabledChange={setLimitEnabled}
            onLimitChange={setLimit}
            onSubmit={modal?.type === "create" ? handleCreate : handleEdit}
            onClose={closeModal}
          />

          <DeleteModal
            modal={modal}
            onDelete={handleDelete}
            onClose={closeModal}
          />

          {toast && (
            <Toast
              message={toast.message}
              type={toast.type}
              onClose={clearToast}
            />
          )}
        </div>
      </main>
    </div>
  );
} 