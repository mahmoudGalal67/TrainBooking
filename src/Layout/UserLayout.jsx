import Footer from '../Components/Footer'
import { Outlet } from 'react-router-dom'
import HeaderLayout from '../Components/HeaderLayout'

const UserLayout = () => {
  return (
    <>
      <HeaderLayout />
      <Outlet />
      <Footer />
    </>
  )
}

export default UserLayout
