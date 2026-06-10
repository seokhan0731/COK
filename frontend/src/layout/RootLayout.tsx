/* src/layout/RootLayout.tsx */

import { Outlet } from 'react-router';
import Header from '../component/header/Header';
import ModalProvider from '../component/provider/ModalProvider';
import Sidebar from '../component/sidebar/Sidebar';

const RootLayout = () => {
  return (
    <ModalProvider>
      <div className="h-dvh flex flex-col mx-auto text-font-black">
        <Header />
        <Sidebar />
        <main className="flex-1 flex flex-col overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </ModalProvider>
  );
};

export default RootLayout;
