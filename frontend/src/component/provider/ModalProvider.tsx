import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import clsx from 'clsx';

type ModalOptions = {
  backdrop?: boolean;
  closeConfirm?: string;
  onClose?: () => void;
};

type ModalContextValue = {
  open: (content: ReactNode, options?: ModalOptions) => void;
  close: () => void;
  requestClose: () => void;
};

const ModalContext = createContext<ModalContextValue | null>(null);

export const useModal = () => {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('useModal must be used within ModalProvider');
  return ctx;
};

type Props = { children: ReactNode };

const ModalProvider = ({ children }: Props) => {
  /* State */
  const [state, setState] = useState<{
    content: ReactNode;
    options: ModalOptions;
  } | null>(null);

  /* Handler */
  const open = useCallback(
    (content: ReactNode, options: ModalOptions = {}) => setState({ content, options }),
    [],
  );

  const close = useCallback(() => setState(null), []);

  const requestClose = useCallback(() => {
    const options = state?.options;
    if (options?.closeConfirm && !window.confirm(options.closeConfirm)) {
      return;
    }
    options?.onClose?.();
    close();
  }, [state, close]);

  return (
    <ModalContext.Provider value={{ open, close, requestClose }}>
      {children}

      {createPortal(
        <AnimatePresence initial={false}>
          {state &&
            (state.options.backdrop !== false ? (
              <motion.div
                key="modal-backdrop"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={requestClose}
                className={clsx(
                  'fixed z-20 inset-0 flex justify-center-safe items-center-safe px-7.5',
                  'bg-black/50',
                )}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {state.content}
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="modal-fullscreen"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0"
              >
                {state.content}
              </motion.div>
            ))}
        </AnimatePresence>,
        document.getElementById('modal-root')!,
      )}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
