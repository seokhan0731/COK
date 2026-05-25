import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import clsx from 'clsx'

type ModalOptions = {
  cardClassName?: string
  backdrop?: boolean
}

type ModalContextValue = {
  open: (content: ReactNode, options?: ModalOptions) => void
  close: () => void
}

const ModalContext = createContext<ModalContextValue | null>(null)

export const useModal = () => {
  const ctx = useContext(ModalContext)
  if (!ctx) throw new Error('useModal must be used within ModalProvider')
  return ctx
}

type Props = { children: ReactNode }

const ModalProvider = ({ children }: Props) => {
  const [state, setState] = useState<{
    content: ReactNode
    options: ModalOptions
  } | null>(null)

  const open = useCallback(
    (content: ReactNode, options: ModalOptions = {}) =>
      setState({ content, options }),
    [],
  )
  const close = useCallback(() => setState(null), [])

  return (
    <ModalContext.Provider value={{ open, close }}>
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
                onClick={close}
                className="fixed inset-0 flex justify-center-safe items-center-safe bg-black/50"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  onClick={(e) => e.stopPropagation()}
                  className={clsx(
                    'relative flex flex-col w-full max-w-xs border border-border rounded-lg bg-background p-6',
                    'lg:max-w-sm',
                    state.options.cardClassName,
                  )}
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
  )
}

export default ModalProvider
