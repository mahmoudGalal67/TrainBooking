import { Link, useLocation } from 'react-router-dom'
import { FaHome, FaHotel, FaMap, FaShoppingCart, FaCar } from 'react-icons/fa'
import SharedDrawer from '../Shared/Drawer'
import { useTranslation } from 'react-i18next'

const links = [
  { path: '/', labelKey: 'Home', icon: FaHome },
  { path: '/hotels', labelKey: 'Hotels', icon: FaHotel },
  { path: '/plan', labelKey: 'Plan', icon: FaMap },
  { path: '/shop', labelKey: 'Shop', icon: FaShoppingCart },
  { path: '/car', labelKey: 'Car', icon: FaCar },
]

// eslint-disable-next-line react/prop-types
const DrawerMobile = ({ drawerVisible, onClose }) => {
  const { t } = useTranslation()
  const location = useLocation()
  const token = localStorage.getItem('token-matroshka-user')

  const getLinkClassName = (path) =>
    `flex items-center text-xl lg:text-2xl transition-colors duration-200 ${
      location.pathname === path
        ? 'link-underline text-primary'
        : 'link-hover-underline text-gray-600 hover:text-primary'
    }`

  return (
    <SharedDrawer
      visible={drawerVisible}
      onClose={onClose}
      width={300}
      title="Matroshka"
      className="bg-white shadow-lg rounded-lg"
    >
      <nav className="flex flex-col space-y-6 p-6" aria-label="Main navigation">
          <Link
            to="/"
            className={`text-xl lg:text-2xl transition-colors duration-200 ${location.pathname === '/' ? 'link-underline text-primary' : 'link-hover-underline'}`}
          >
            {t('Home')}
          </Link>
          <Link
            to="/hotels"
            className={`text-xl lg:text-2xl transition-colors duration-200 ${location.pathname === '/hotels' ? 'link-underline text-primary' : 'link-hover-underline'}`}
          >
            {t('Hotels')}
          </Link>
          <Link
            to="/plan"
            className={`text-xl lg:text-2xl transition-colors duration-200 ${location.pathname === '/plan' ? 'link-underline text-primary' : 'link-hover-underline'}`}
          >
            {t('Plan')}
          </Link>
          <Link
            to="/shop"
            className={`text-xl lg:text-2xl transition-colors duration-200 ${location.pathname === '/shop' ? 'link-underline text-primary' : 'link-hover-underline'}`}
          >
            {t('Shop')}
          </Link>
          <Link
            to="/car"
            className={`text-xl lg:text-2xl transition-colors duration-200 ${location.pathname === '/car' ? 'link-underline text-primary' : 'link-hover-underline'}`}
          >
            {t('Car')}
          </Link>
          <Link
            to="/bus"
            className={`text-xl lg:text-2xl transition-colors duration-200 ${location.pathname === '/bus' ? 'link-underline text-primary' : 'link-hover-underline'}`}
          >
            {t('Bus')}
          </Link>
          <Link
            to="/flight"
            className={`text-xl lg:text-2xl transition-colors duration-200 ${location.pathname === '/flight' ? 'link-underline text-primary' : 'link-hover-underline'}`}
          >
            {t('Flight')}
          </Link>
          <Link
            to="/train"
            className={`text-xl lg:text-2xl transition-colors duration-200 ${location.pathname === '/train' ? 'link-underline text-primary' : 'link-hover-underline'}`}
          >
            {t('Train')}
          </Link>
      </nav>
      {!token && (
        <div className="sm:hidden gap-4 flex flex-col">
          <Link
          to={'/signup'}
            className="px-2 py-[5px] text-xl bg-primary text-white rounded-lg hover:bg-second transition-all duration-200"
            aria-label={t('signup')}
          >
            {t('signup')}
          </Link>
          <Link
          to={'/login'}
            className="px-6 py-2 bg-transparent border-primary border text-primary rounded-lg hover:bg-second transition-all duration-200"
            aria-label={t('login')}
          >
            {t('login')}
          </Link>
        </div>
      )}
    </SharedDrawer>
  )
}

export default DrawerMobile
