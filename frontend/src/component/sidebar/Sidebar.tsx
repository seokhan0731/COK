/* src/component/sidebar/Sidebar.tsx */

/* React */

/* Library */
import { NavLink, useLocation, useNavigate } from 'react-router';

/* Icon */
import { LogOut, LucideBox, LucideRoute, StickyNote, type LucideIcon } from 'lucide-react';
import { LayoutDashboard, User2, X } from 'lucide-react';

/* Store */
import { useSidebarStore } from '../../store/sidebarStore';

/* Util */
import clsx from 'clsx';
import { useEffect } from 'react';
import ProfileIcon from '../header/_component/ProfileIcon';
import { useProfile } from '../../hook/useProfile';
import { ATTEND_STATUS_META } from '../../type';
import { useAuthStore } from '../../store/authStore';
import SurveyModal from '../modal/survey/SurveyModal';
import { useModal } from '../provider/ModalProvider';

// #region Helper
type SidebarLinkProps = {
  to?: string;
  icon: LucideIcon;
  children: React.ReactNode;
  onClick?: () => void;
};

const SidebarLink = ({ to, icon: Icon, children, onClick }: SidebarLinkProps) => {
  const base = 'flex items-center-safe gap-3 p-4 rounded-lg text-font-gray';
  const content = (
    <>
      <Icon size={24} />
      <span className="whitespace-nowrap">{children}</span>
    </>
  );

  // 경로가 아직 없으면 이동하지 않는 버튼으로 (NavLink는 to가 필수)
  if (!to) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={clsx(base, 'w-full', 'hover:text-font-black hover:bg-border/40')}
      >
        {content}
      </button>
    );
  }

  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        clsx(
          base,
          isActive
            ? 'bg-primary-blue/10 shadow-sm text-primary-blue font-semibold'
            : 'hover:text-font-black hover:bg-border/40',
        )
      }
    >
      {content}
    </NavLink>
  );
};
// #endregion

const Sidebar = () => {
  const isOpen = useSidebarStore((s) => s.isOpen);
  const close = useSidebarStore((s) => s.close);
  const logout = useAuthStore((s) => s.clearAuth);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { data: profile } = useProfile();
  const { open } = useModal();

  // Effect
  useEffect(() => {
    close();
  }, [pathname, close]);

  return (
    <>
      <div
        className={clsx(
          'fixed top-18.75 inset-x-0 bottom-0 z-20 transition-all duration-200',
          'bg-neutral-100/25 backdrop-blur-xs dark:bg-neutral-950/25',
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={close}
      />

      <aside
        className={clsx(
          // Mobile
          'fixed right-0 top-18.5 bottom-0 z-30 w-75 flex flex-col gap-1 p-3',
          'bg-background border border-border rounded-l-2xl shadow-xl',
          'transition-all duration-300',
          isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 lg:-translate-x-full',

          // PC
          'lg:left-0',
          'lg:rounded-l-none lg:rounded-r-2xl',
        )}
      >
        <div className="flex justify-between items-center-safe p-3 pb-6 border-b border-b-border">
          <span className="text-h5 text-primary-blue font-semibold">Menu</span>
          <button onClick={close} className="p-1 text-font-gray hover:text-font-black">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div>
            <SidebarLink to="/dashboard" icon={LayoutDashboard} onClick={close}>
              대시보드
            </SidebarLink>
            <SidebarLink to="/my/profile" icon={User2} onClick={close}>
              마이페이지
            </SidebarLink>
            <SidebarLink to="/hub" icon={LucideBox} onClick={close}>
              역량 허브
            </SidebarLink>
            <SidebarLink to="/planning" icon={LucideRoute} onClick={close}>
              플래닝
            </SidebarLink>
            <SidebarLink
              icon={StickyNote}
              onClick={() => {
                close();
                open(<SurveyModal />);
              }}
            >
              설문 조사
            </SidebarLink>
          </div>

          <div className="flex justify-between p-3 gap-4 bg-card-background border border-border rounded-2xl">
            <div className="flex flex-row gap-4">
              <ProfileIcon
                className="size-10 cursor-pointer"
                imageUrl={profile?.imageUrl}
                onClick={() => navigate('/my/profile')}
              />

              <div className="flex flex-col items-start">
                <p className="text-base">{profile?.name}</p>
                <p className="text-font-gray text-sm">
                  {profile && ATTEND_STATUS_META[profile.attendStatus]?.label}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                logout();
                navigate('/');
              }}
            >
              <LogOut />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
