// frontend/scr/utils/router.tsx

import { createBrowserRouter } from 'react-router';
import HomePage from '../page/HomePage';
import TestPage from '../page/TestPage';
import KakaoOauthLoadingPage from '../page/KakaoOauthLoadingPage';
import MypageLayout from '../page/mypage/MypageLayout';
import ProfilePage from '../page/mypage/ProfilePage';
import EditProfilePage from '../page/mypage/EditProfilePage';
import AddSkillPage from '../page/mypage/AddSkillPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/test',
    element: <TestPage />,
  },
  {
    path: '/kakao/oauth/loading',
    element: <KakaoOauthLoadingPage />,
  },
  {
    path: '/my',
    element: <MypageLayout />,
    children: [
      { index: false, element: <ProfilePage /> },
      { path: 'profile', element: <ProfilePage /> },
      { path: 'editprofile', element: <EditProfilePage /> },
      { path: 'addskill', element: <AddSkillPage /> },
    ],
  },
]);
