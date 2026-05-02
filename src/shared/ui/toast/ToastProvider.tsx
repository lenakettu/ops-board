import type { ReactNode } from 'react';
import { useCallback, useMemo, useState } from 'react';

import { ToastContext } from './ToastContext';
import styles from './ToastProvider.module.css';
import type { Toast, ToastVariant } from './types';

interface ToastProviderProps {
  children: ReactNode;
}

const TOAST_DURATION = 3000;

function createToast(message: string, variant: ToastVariant): Toast {
  return {
    id: crypto.randomUUID(),
    message,
    variant,
  };
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const close = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const show = useCallback(
    (message: string, variant: ToastVariant) => {
      const toast = createToast(message, variant);

      setToasts((prev) => [...prev, toast]);

      window.setTimeout(() => {
        close(toast.id);
      }, TOAST_DURATION);
    },
    [close],
  );

  const value = useMemo(
    () => ({
      success: (message: string) => show(message, 'success'),
      error: (message: string) => show(message, 'error'),
      info: (message: string) => show(message, 'info'),
      close,
    }),
    [show, close],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}

      <div className={styles.container}>
        {toasts.map((toast) => (
          <div key={toast.id} className={`${styles.toast} ${styles[toast.variant]}`}>
            <span>{toast.message}</span>

            <button
              className={styles.closeButton}
              type="button"
              onClick={() => close(toast.id)}
              aria-label="Close notification"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
