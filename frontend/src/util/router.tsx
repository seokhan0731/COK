// frontend/scr/utils/router.tsx

import { createBrowserRouter } from 'react-router'
import HomePage from '../page/HomePage'
import TestPage from '../page/TestPage'
import KakaoOauthLoadingPage from '../page/KakaoOauthLoadingPage'
import PlanningPage from '../page/PlanningPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/planning',
    element: <PlanningPage />,
  },
  {
    path: '/kakao/oauth/loading',
    element: <KakaoOauthLoadingPage />,
  },
])
