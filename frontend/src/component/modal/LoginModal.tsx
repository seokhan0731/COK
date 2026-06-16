/* src/component/modal/LoginModal.tsx */

/* Icon */
import { FaXmark } from 'react-icons/fa6';

/* Component */
import KakaoButton from '../button/KakaoButton';

/* Type */
import { useModal } from '../provider/ModalProvider';

const LoginModal = () => {
  const { close } = useModal();

  return (
    <div className="relative flex flex-col justify-center-safe w-80 border border-border rounded-lg bg-background p-6 lg:w-96">
      <button
        className="absolute right-3 top-3 transition-transform duration-1000 ease-in-out hover:rotate-360"
        onClick={close}
      >
        <FaXmark className="text-xl" />
      </button>

      <span className="text-h3 font-bold mb-6">로그인</span>
      <span className="text-sm mb-3">
        카카오톡 계정으로 간편하게 <span className="text-primary-blue font-bold">COK</span>
      </span>
      <KakaoButton />
    </div>
  );
};

export default LoginModal;
