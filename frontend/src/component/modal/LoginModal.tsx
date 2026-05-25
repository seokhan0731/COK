import { FaXmark } from 'react-icons/fa6'
import KakaoButton from '../button/KakaoButton'

/* Type */
import { useModal } from '../provider/ModalProvider'

const LoginModal = () => {
  const { close } = useModal()
  return (
    <>
      <button
        className="absolute right-3 top-3 transition-transform duration-1000 ease-in-out hover:rotate-540"
        onClick={close}
      >
        <FaXmark className="text-xl" />
      </button>

      <span className="text-h3 font-bold mb-6">로그인</span>
      <span className="text-sm mb-3">
        카카오톡 계정으로 간편하게{' '}
        <span className="text-primary-blue font-bold">COK</span>
      </span>
      <KakaoButton />
    </>
  )
}

export default LoginModal
