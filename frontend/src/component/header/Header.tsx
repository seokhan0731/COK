// src/component/header/Header.tsx

import { useState } from 'react';
import LoginModal from '../modal/LoginModal';
import { AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { useThemeStore } from '../../store/themeStore';

/* Icon */
import { FaMoon } from 'react-icons/fa6';
import { FaSun } from 'react-icons/fa6';
import { cn } from '../../util/cn';
import { NavLink } from 'react-router';

/* Type */
type Props = {
  className?: string;
};

const Header = ({ className }: Props) => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const isDark = useThemeStore((s) => s.theme === 'Dark');
  const toggleTheme = useThemeStore((s) => s.toggleTheme);

  return (
    <>
      <div
        className={cn(
          className,
          'top-0 sticky flex w-full h-18.75 justify-between items-center-safe px-4 border-b border-b-border',
        )}
      >
        <div className="flex items-center-safe gap-8">
          <span className="text-3xl font-extrabold text-primary-blue">COK</span>

          <div className="flex gap-2">
            <NavLink to={'profile'}>나의 프로필</NavLink>
            <NavLink to={'editprofile'}>프로필 수정</NavLink>
            <NavLink to={'addskill'}>역량 입력</NavLink>
          </div>
        </div>

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
            onClick={() => setLoginModalOpen(true)}
          >
            로그인
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isLoginModalOpen && (
          <LoginModal onClose={() => setLoginModalOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
