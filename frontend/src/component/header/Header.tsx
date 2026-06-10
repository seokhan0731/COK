// src/components/headers/Header.tsx

/* React */
import { Link, useNavigate } from 'react-router';

/* Library */
import LoginModal from '../modal/LoginModal';

/* Component */
import ProfileIcon from './_component/ProfileIcon';
import { OutlineButton, PrimaryButton } from '../button/Button';

/* Icon */
import { FaMoon } from 'react-icons/fa6';
import { FaSun } from 'react-icons/fa6';

/* Hook */
import { useThemeStore } from '../../store/themeStore';
import { useModal } from '../provider/ModalProvider';
import { useAuthStore, useIsLoggedIn } from '../../store/authStore';
import { useProfileImage } from '../../hook/useProfile';
import { Menu } from 'lucide-react';
import { useSidebarStore } from '../../store/sidebarStore';
import clsx from 'clsx';

const Header = () => {
  const navigate = useNavigate();
  const isDark = useThemeStore((s) => s.theme === 'Dark');
  const toggleTheme = useThemeStore((s) => s.toggleTheme);
  const isLoggedIn = useIsLoggedIn();
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const { data: imageUrl, isPending } = useProfileImage();
  const { open } = useModal();
  const toggleSidebar = useSidebarStore((s) => s.toggle);

  return (
    <>
      <div className="top-0 z-10 sticky flex w-full h-18.75 justify-between items-center-safe px-4 bg-background border-b border-b-border select-none">
        <div className="flex items-center-safe gap-4">
          {isLoggedIn && (
            <Menu
              className={clsx('hidden cursor-pointer', 'text-primary-blue', 'lg:block')}
              onClick={isPending ? undefined : toggleSidebar}
              size={24}
              strokeWidth={3}
            />
          )}

          <Link
            className="text-3xl font-extrabold text-primary-blue"
            to={isLoggedIn ? '/dashboard' : '/'}
          >
            COK
          </Link>
        </div>

        <div className="h-12 flex items-center-safe gap-4">
          <OutlineButton className="p-2.5" onClick={toggleTheme}>
            {isDark ? <FaMoon /> : <FaSun />}
          </OutlineButton>

          {isLoggedIn ? (
            <>
              <OutlineButton
                className="hidden lg:inline"
                onClick={() => {
                  clearAuth();
                  navigate('/');
                }}
              >
                로그아웃
              </OutlineButton>
              <ProfileIcon
                imageUrl={imageUrl}
                onClick={() => navigate('/my/profile')}
                className="size-10 hidden lg:inline"
              />

              <Menu
                className={clsx('cursor-pointer', 'text-primary-blue', 'lg:hidden')}
                onClick={toggleSidebar}
                size={24}
                strokeWidth={3}
              />
            </>
          ) : (
            <PrimaryButton onClick={() => open(<LoginModal />)}>로그인</PrimaryButton>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
