/* src/layout/RootLayout.tsx */

import { Outlet } from 'react-router';
import Header from '../component/header/Header';

const RootLayout = () => {
  return (
    <div className="min-h-dvh flex flex-col mx-auto bg-background text-font-black">
      <Header />
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
