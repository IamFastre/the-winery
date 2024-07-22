"use client";
import { useContext, useState } from 'react';

import { ToastType, ToastWithID } from './types';
import { ToasterContext, ToasterValue } from './context';
import { ToastHolder } from './toast';


export function useToaster() {
  const context = useContext(ToasterContext);

  return {
    add: context.add,
  };
}

export function Toaster({ children }:{ children:React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastWithID[]>([]);

  const value:ToasterValue = {
    add: (toast) => {
      const toastWithId = { ...toast, type: toast.type ?? ToastType.info,  id: Date.now() };
      setToasts(t => [...t, toastWithId]);

      setTimeout(() => {
        setToasts(ts => ts.filter(t => t.id !== toastWithId.id));
      }, toast.duration ?? 6000);
    },
  }

  return (
    <div style={{ flex: 1 }}>
      <ToasterContext.Provider value={value}>
        {children}
        <ToastHolder toasts={toasts} />
      </ToasterContext.Provider>
    </div>
  );
}
