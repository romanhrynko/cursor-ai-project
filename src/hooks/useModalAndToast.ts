import { useState } from 'react';
import { ModalType, Toast } from '@/types/api';

export function useModalAndToast() {
  const [modal, setModal] = useState<ModalType>(null);
  const [toast, setToast] = useState<Toast | null>(null);

  function showToast(message: string, type: 'success' | 'error' = 'success') {
    setToast({ message, type });
  }

  function clearToast() {
    setToast(null);
  }

  function openModal(modal: ModalType) {
    setModal(modal);
  }

  function closeModal() {
    setModal(null);
  }

  return {
    modal,
    setModal,
    openModal,
    closeModal,
    toast,
    showToast,
    clearToast,
  };
} 