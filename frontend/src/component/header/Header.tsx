// src/components/headers/Header.tsx

/* React */

import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router';

/* Library */
import LoginModal from '../modal/LoginModal';

/* Component */
import ProfileIcon from './_component/ProfileIcon';
import { OutlineButton, PrimaryButton } from '../../page/mypage/_component/Button'; // 나중에 지줘야 함

/* Icon */
import { FaMoon } from 'react-icons/fa6';
import { FaSun } from 'react-icons/fa6';

/* Hook */
import { useThemeStore } from '../../store/themeStore';
import { useModal } from '../provider/ModalProvider';
import { useAuthStore, useIsLoggedIn } from '../../store/authStore';
import { useProfileImage } from '../../hook/useProfile';

const Header = () => {
  const navigate = useNavigate();
  const isDark = useThemeStore((s) => s.theme === 'Dark');
  const toggleTheme = useThemeStore((s) => s.toggleTheme);
  const isLoggedIn = useIsLoggedIn();
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const { data: imageUrl } = useProfileImage();
  const { open } = useModal();

  return (
    <>
      <div className="top-0 z-10 sticky flex w-full h-18.75 justify-between items-center-safe px-4 bg-background border-b border-b-border">
        <Link className="text-3xl font-extrabold text-primary-blue" to={'/'}>
          COK
        </Link>

        <div className="h-12 flex items-center-safe gap-4">
          <OutlineButton className="p-2.5" onClick={toggleTheme}>
            {isDark ? <FaMoon /> : <FaSun />}
          </OutlineButton>

          {isLoggedIn ? (
            <>
              <OutlineButton
                onClick={() => {
                  clearAuth();
                  navigate('/');
                }}
              >
                로그아웃
              </OutlineButton>
              <ProfileIcon imageUrl={imageUrl} onClick={() => navigate('/my/profile')} />
            </>
          ) : (
            <PrimaryButton
              onClick={() =>
                open(<LoginModal />, {
                  cardClassName: 'items-center-safe justify-center-safe',
                })
              }
            >
              로그인
            </PrimaryButton>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
