/* src/page/mypage/MypageLayout.tsx */

import { NavLink, Outlet } from 'react-router';
import clsx from 'clsx';

// #region Helper
type MyPageNavLinkProps = {
  to: string;
  children: React.ReactNode;
};

const MyPageNavLink = (props: MyPageNavLinkProps) => (
  <NavLink
    to={props.to}
    className={({ isActive }) =>
      clsx(
        'h-full flex items-center-safe border-b-2 py-4 text-font-gray',
        isActive
          ? 'border-b border-b-primary-blue text-primary-blue font-semibold'
          : 'border-b border-b-transparent text-font-gray hover:text-font-black',
      )
    }
  >
    {props.children}
  </NavLink>
);
// #endregion

const MypageLayout = () => {
  return (
    <>
      <div
        className={clsx(
          'flex justify-around items-center-safe border-b border-b-border shadow-md',
          'lg:gap-8 lg:px-4 lg:justify-start',
        )}
      >
        <MyPageNavLink to="profile">나의 프로필</MyPageNavLink>
        <MyPageNavLink to="edit-profile">프로필 수정</MyPageNavLink>
        <MyPageNavLink to="edit-skill">역량 수정</MyPageNavLink>
      </div>

      <div className={clsx('flex-1 flex justify-center-safe p-4', 'lg:p-12')}>
        <div className={'relative flex-1 flex flex-col max-w-300'}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MypageLayout;
