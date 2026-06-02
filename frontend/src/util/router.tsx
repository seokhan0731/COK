// frontend/scr/utils/router.tsx

import { createBrowserRouter } from 'react-router'
import HomePage from '../page/HomePage'
import TestPage from '../page/TestPage'
import KakaoOauthLoadingPage from '../page/KakaoOauthLoadingPage'
import HistoryPageResult from '../page/history/HIstoryResultPage'
import HistoryListPage from '../page/history/HistoryListPage'

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
    path: '/history-result',
    element: <HistoryPageResult />,
  },
  {
    path: '/hisory-list',
    element: <HistoryListPage />,
  }
])
