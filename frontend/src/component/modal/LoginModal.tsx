import { createPortal } from 'react-dom'
import { motion } from 'framer-motion'
import { FaXmark } from 'react-icons/fa6'
import KakaoButton from '../button/KakaoButton'
import clsx from 'clsx'

/* Type */
type Props = {
  onClose: () => void
}

const LoginModal = ({ onClose }: Props) => {
  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 flex items-center-safe justify-center-safe bg-black/50"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={clsx(
          'relative flex flex-col items-center-safe w-full max-w-xs border border-border rounded-lg bg-background p-6',
          'lg:max-w-sm',
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute right-3 top-3 transition-transform duration-1000 ease-in-out hover:rotate-540"
          onClick={onClose}
        >
          <FaXmark className="text-xl" />
        </button>

        <span className="text-h3 font-bold mb-6">로그인</span>
        <span className="text-sm mb-3">
          카카오톡 계정으로 간편하게{' '}
          <span className="text-primary-blue font-bold">COK</span>
        </span>
        <KakaoButton />
      </motion.div>
    </motion.div>,
    document.getElementById('modal-root')!,
  )
}

export default LoginModal
