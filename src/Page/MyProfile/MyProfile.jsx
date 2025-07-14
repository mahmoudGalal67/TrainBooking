import bannerCar from '../../assets/Img/profile.webp'
import { NavLink, Outlet } from 'react-router-dom'
import { FaHome, FaRegUser } from 'react-icons/fa'
import { RiLockPasswordFill } from 'react-icons/ri'
import { CiLogout } from 'react-icons/ci'
import { BiPurchaseTag } from 'react-icons/bi'

const SideLinks = [
  { name: 'Home', link: '/', icon: FaHome },
  { name: 'Profile', link: '/user-profile/edit', icon: FaRegUser },
  {
    name: 'Change Password',
    link: '/user-profile/edit/settings/user-profile/edit/change-password',
    icon: RiLockPasswordFill,
  },
  {
    name: 'My Orders',
    link: '/user-profile/edit/user-profile/orders',
    icon: BiPurchaseTag,
  },
  { name: 'Log out', link: '/', icon: CiLogout },
]

const isActiveLink = (link) => {
  return window.location.pathname === link
}

const ProfileEditPage = () => {
  return (
    <>
      <div
        className="relative h-[350px] bg-cover bg-center"
        style={{ backgroundImage: `url(${bannerCar})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <section className="relative h-full flex flex-col items-center justify-center text-center py-12 px-4">
          <div className="relative z-10 text-white max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 overflow-hidden">
              Profile Details
            </h1>
          </div>
        </section>
      </div>

      <div className="container min-h-screen mx-auto px-2">
        <div className="xl:grid grid-cols-8 gap-10 items-start md:py-12 py-6">
          <div className="col-span-2 sticky bg-dry border border-gray-400 p-6 rounded-md xl:mb-0 mb-5">
            {SideLinks.map((link, index) => (
              <NavLink
                to={link.link}
                key={index}
                className={`duration transition block py-2 flex gap-2 items-center px-4 mb-2 rounded text-gray-800  hover:bg-gray-100 ${isActiveLink(link.link) ? 'bg-gray-600 text-white hover:bg-gray-600' : 'bg-white'}`}
              >
                <link.icon /> <p>{link.name}</p>
              </NavLink>
            ))}
          </div>
          <div className="col-span-6 rounded-md bg-dry border border-gray-400 p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfileEditPage
