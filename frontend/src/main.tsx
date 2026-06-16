/* src/main.tsx */

import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { router } from './util/router.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';

/* Font */
import '@fontsource/pretendard/400.css';
import '@fontsource/pretendard/500.css';
import '@fontsource/pretendard/600.css';
import '@fontsource/pretendard/700.css';
import '@fontsource/pretendard/800.css';
import '@fontsource/pretendard/900.css';

import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        if (axios.isAxiosError(error) && error.response && error.response.status < 500) {
          return false;
        }
        return failureCount < 1;
      },
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>,
);
