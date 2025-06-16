import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export interface Toast {
  id: string;
  title?: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => string;
  removeToast: (id: string) => void;
  clearAllToasts: () => void;
  success: (message: string, options?: Partial<Omit<Toast, 'id' | 'type' | 'message'>>) => string;
  error: (message: string, options?: Partial<Omit<Toast, 'id' | 'type' | 'message'>>) => string;
  warning: (message: string, options?: Partial<Omit<Toast, 'id' | 'type' | 'message'>>) => string;
  info: (message: string, options?: Partial<Omit<Toast, 'id' | 'type' | 'message'>>) => string;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

interface ToastProviderProps {
  children: ReactNode;
  maxToasts?: number;
  defaultDuration?: number;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ 
  children, 
  maxToasts = 5,
  defaultDuration = 5000 
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const generateId = useCallback(() => {
    return `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = generateId();
    const newToast: Toast = {
      ...toast,
      id,
      duration: toast.duration ?? defaultDuration,
    };

    setToasts(prev => {
      const updated = [newToast, ...prev];
      // Limit the number of toasts
      return updated.slice(0, maxToasts);
    });

    // Auto-remove toast after duration
    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, newToast.duration);
    }

    return id;
  }, [generateId, defaultDuration, maxToasts]);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const clearAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  const success = useCallback((message: string, options?: Partial<Omit<Toast, 'id' | 'type' | 'message'>>) => {
    return addToast({
      message,
      type: 'success',
      ...options,
    });
  }, [addToast]);

  const error = useCallback((message: string, options?: Partial<Omit<Toast, 'id' | 'type' | 'message'>>) => {
    return addToast({
      message,
      type: 'error',
      duration: 0, // Error toasts don't auto-dismiss by default
      ...options,
    });
  }, [addToast]);

  const warning = useCallback((message: string, options?: Partial<Omit<Toast, 'id' | 'type' | 'message'>>) => {
    return addToast({
      message,
      type: 'warning',
      ...options,
    });
  }, [addToast]);

  const info = useCallback((message: string, options?: Partial<Omit<Toast, 'id' | 'type' | 'message'>>) => {
    return addToast({
      message,
      type: 'info',
      ...options,
    });
  }, [addToast]);

  const value: ToastContextType = {
    toasts,
    addToast,
    removeToast,
    clearAllToasts,
    success,
    error,
    warning,
    info,
  };

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};