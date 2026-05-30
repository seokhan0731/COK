/* src/main.tsx */

import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { router } from './util/router.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

/* Provider */
import ModalProvider from './component/provider/ModalProvider.tsx';

/* Font */
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/600.css';
import '@fontsource/roboto/700.css';
import '@fontsource/roboto/800.css';

import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <ModalProvider>
      <RouterProvider router={router} />
    </ModalProvider>
  </QueryClientProvider>,
);
