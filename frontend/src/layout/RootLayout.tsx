/* src/layout/RootLayout.tsx */

import { Outlet } from 'react-router';
import Header from '../component/header/Header';
import ModalProvider from '../component/provider/ModalProvider';

const RootLayout = () => {
  return (
    <ModalProvider>
      <div className="min-h-dvh flex flex-col mx-auto text-font-black">
        <Header />
        <main className="flex-1 flex flex-col">
          <Outlet />
        </main>
      </div>
    </ModalProvider>
  );
};

export default RootLayout;
