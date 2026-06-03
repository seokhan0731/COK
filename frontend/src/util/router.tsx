/* src/utils/router.tsx */

import { createBrowserRouter } from 'react-router';
import HomePage from '../page/HomePage';
import TestPage from '../page/TestPage';
import KakaoOauthLoadingPage from '../page/KakaoOauthLoadingPage';
import MypageLayout from '../layout/MypageLayout';
import ProfilePage from '../page/mypage/ProfilePage';
import EditProfilePage from '../page/mypage/EditProfilePage';
import EditSkillPage from '../page/mypage/EditSkillPage';
import RootLayout from '../layout/RootLayout';
import InfoPage from '../page/InfoPage';

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/test', element: <TestPage /> },
      { path: '/kakao/oauth/loading', element: <KakaoOauthLoadingPage /> },
      {
        path: '/my',
        element: <MypageLayout />,
        children: [
          { index: true, element: <ProfilePage /> },
          { path: 'profile', element: <ProfilePage /> },
          { path: 'edit-profile', element: <EditProfilePage /> },
          { path: 'edit-skill', element: <EditSkillPage /> },
        ],
      },
    ],
  },
  {
    path: '/info',
    element: <InfoPage />,
  },
]);
