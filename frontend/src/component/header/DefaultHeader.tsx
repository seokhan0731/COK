// src/components/headers/DefaultHeader.tsx

import LoginModal from '../modal/LoginModal';
import clsx from 'clsx';
import { useThemeStore } from '../../store/themeStore';
import { Link } from 'react-router';

/* Icon */
import { FaMoon } from 'react-icons/fa6';
import { FaSun } from 'react-icons/fa6';
import { useModal } from '../provider/ModalProvider';

const DefaultHeader = () => {
  const isDark = useThemeStore((s) => s.theme === 'Dark');
  const toggleTheme = useThemeStore((s) => s.toggleTheme);
  const { open } = useModal();

  return (
    <>
      <div className="top-0 sticky flex w-full h-18.75 justify-between items-center-safe px-4 border-b border-b-border">
        <Link className="text-3xl font-extrabold text-primary-blue" to={'/'}>
          COK
        </Link>

        <div className="flex gap-4">
          <button
            className="aspect-square p-2 border border-border rounded-md"
            onClick={toggleTheme}
          >
            {isDark ? <FaMoon /> : <FaSun />}
          </button>

          <button
            className={clsx(
              'flex justify-center items-center px-4 pb-1 pt-1.5 border border-border rounded-md cursor-pointer transition-colors duration-300',
              'text-sm font-semibold',
              'hover:border-primary-blue hover:text-primary-blue',
            )}
            onClick={() =>
              open(<LoginModal />, {
                cardClassName: 'items-center-safe justify-center-safe',
              })
            }
          >
            로그인
          </button>
        </div>
      </div>
    </>
  );
};

export default DefaultHeader;
