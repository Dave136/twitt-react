import { createContext, useContext, useEffect, useMemo, useState } from 'react';

type Props = {
  children: JSX.Element | JSX.Element[];
};

type Toast = {
  info: (message: string) => void;
  success: (message: string) => void;
  warning: (message: string) => void;
  error: (message: string) => void;
  default: (message: string) => void;
};
type ToastType = 'default' | 'success' | 'info' | 'warning' | 'error';

type Context = {
  message: string;
  toast: Toast;
  type: ToastType;
};

const ToastContext = createContext<Context>({
  message: '',
  toast: {
    info(message) {},
    success(message) {},
    warning(message) {},
    error(message) {},
    default(message) {},
  },
  type: 'default',
});

export const useToast = () => useContext(ToastContext);

const ToastProvider = ({ children }: Props) => {
  const [message, setMessage] = useState('');
  const [active, setActive] = useState(false);
  const [type, setType] = useState<ToastType>('default');

  const toastActions = {
    info: (message: string) => {
      setMessage(message);
      setActive(true);
      setType('info');
    },
    success: (message: string) => {
      setMessage(message);
      setActive(true);
      setType('success');
    },
    warning: (message: string) => {
      setMessage(message);
      setActive(true);
      setType('warning');
    },
    error: (message: string) => {
      setMessage(message);
      setActive(true);
      setType('error');
    },
    default: (message: string) => {
      setMessage(message);
      setActive(true);
      setType('default');
    },
  };

  useEffect(() => {
    if (active) {
      setTimeout(() => {
        setActive(false);
        setMessage('');
        setType('default');
      }, 3000);
    }
  }, [active]);

  const valueProvided = useMemo(
    () => ({
      message,
      type,
      toast: toastActions,
    }),
    [message, type, toastActions]
  );

  return (
    <ToastContext.Provider value={valueProvided}>
      {children}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
