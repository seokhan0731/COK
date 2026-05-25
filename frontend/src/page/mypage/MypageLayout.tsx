/* src/page/mypage/MypageLayout.tsx */

/* Component */
import { Outlet } from 'react-router'
import Header from '../../component/header/Header'

const MypageLayout = () => {
  return (
    <>
      <Header />
      <div className="p-6">
        <Outlet />
      </div>
    </>
  )
}

export default MypageLayout
