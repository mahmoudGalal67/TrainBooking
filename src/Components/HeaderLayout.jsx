import { useEffect, useState, useRef } from 'react'
import {
  FaBars,
  FaGlobe,
  FaCheck,
  FaUserCircle,
  FaSignOutAlt,
} from 'react-icons/fa'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import en from '../assets/Img/en.png'
import ar from '../assets/Img/ar.png'
import ru from '../assets/Img/ru.png'
import ch from '../assets/Img/ch.png'
import DrawerMobile from './DrawerMobile'
import {
  useGetNotificationsQuery,
  useLogOutMutation,
} from '../app/Feature/API/User'
import Spinner from '../Shared/Spinner'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { FaBell } from 'react-icons/fa6'
import { useTranslation } from 'react-i18next'

import logo from '../assets/Img/LOGO.png'
const HeaderLayout = () => {
  const token = localStorage.getItem('token-matroshka-user')
  const userData = JSON.parse(localStorage.getItem('userData'))
  const { t, i18n } = useTranslation();


  const [scroll, setScroll] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState('en')
  const [menuOpen, setMenuOpen] = useState(false)
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false)
  const [notificationVisible, setNotificationVisible] = useState(false)
  const [logOut, { isLoading: logOutLoading }] = useLogOutMutation()
  const { data: notificationss, refetch } = useGetNotificationsQuery(
    userData?.user?.id
  )
  const menuRef = useRef(null)
  const avatarRef = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()

  const languages = [
    { code: 'ar', name: 'العربية', flag: ar },
    { code: 'en', name: 'English (UK)', flag: en },
    { code: 'ru', name: 'Русский', flag: ru },
    { code: 'zh', name: '简体中文', flag: ch },
  ]

  const handleLanguageChange = (code) => {
    setSelectedLanguage(code)
    i18n.changeLanguage(code);
    localStorage.setItem('userLanguage', code)
    setMenuOpen(false)
  }

  const handleClickOutside = (event) => {
    const menu = menuRef.current
    const avatar = avatarRef.current

    if (
      menu &&
      !menu.contains(event.target) &&
      avatar &&
      !avatar.contains(event.target)
    ) {
      setMenuOpen(false)
      setAvatarMenuOpen(false)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('click', handleClickOutside)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('click', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    refetch()
  }, [refetch])

  const showDrawer = () => {
    setDrawerVisible(true)
  }

  const onClose = () => {
    setDrawerVisible(false)
  }

  const handleLogOut = async () => {
    if (token) {
      await logOut()
    }
    localStorage.clear()
    navigate('/')
    window.location.reload()
  }

  const toggleNotification = () => {
    setNotificationVisible(!notificationVisible)
  }



  return (
    <header
      className={`fixed top-0 left-0 w-full z-[500] transition-all duration-300 ease-in-out ${
        scroll
          ? 'bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white shadow-lg'
          : location.pathname === '/' ||
              location.pathname === '/hotels' ||
              location.pathname === '/hotels/checkout' ||
              location.pathname === '/car' ||
              location.pathname === '/car-details' ||
              location.pathname === '/payment-services/cars' ||
              location.pathname === '/shop' ||
              location.pathname === '/cart'
            ? 'bg-transparent text-white'
            : 'bg-white text-black'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center py-4 px-2">
        <div className="text-lg font-bold sm:text-3xl overflow-hidden">
          <img src={logo} className='w-52 h-16 object-cover' alt="" />
        </div>

        <nav className="hidden 2xl:flex gap-6 lg:gap-12">
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

        <div className="flex items-center gap-4">
          {!token && (
            <div className="sm:flex gap-4 flex-wrap hidden">
              <Link
                to="/login"
                className="text-xl transition-colors duration-200 hover:text-second"
              >
                {t('Login')}
              </Link>
              <Link
                to="/signup"
                className="px-2 py-[5px] text-xl bg-primary text-white rounded-lg hover:bg-second transition-all duration-200"
              >
                {t('Sign Up')}
              </Link>
            </div>
          )}
          {token && (
            <div className="relative" ref={avatarRef}>
              <button
                className="focus:outline-none"
                aria-label="User menu"
                onClick={() => setAvatarMenuOpen(!avatarMenuOpen)}
              >
                <FaUserCircle className="text-2xl cursor-pointer" />
              </button>
              {avatarMenuOpen && (
                <div className={`fixed ${i18n.language==="ar"?"left-[50px]":"right-[85px]"}  top-[60px] bg-white text-black rounded-md shadow-lg mt-2 w-48`}>
                  <div className="px-4 py-2 text-xl">
                    {userData?.user?.name}
                  </div>
                  <Link
                    to="/user-profile/edit"
                    className="flex items-center px-4 py-2 hover:bg-gray-200 rounded-md  cursor-pointer"
                  >
                    <FaUserCircle className={`${i18n.language==="ar"?" ml-2":" mr-2"}`} />
                    {t('My Profile')}
                  </Link>
                  <button
                    onClick={handleLogOut}
                    className="flex items-center rounded-md  px-4 py-2 hover:bg-gray-200 w-full text-left cursor-pointer"
                  >
                    <FaSignOutAlt className={`${i18n.language==="ar"?" ml-2":" mr-2"}`} />
                    {logOutLoading ? <Spinner /> : t('Logout')}
                  </button>
                </div>
              )}
            </div>
          )}

          <div className="relative" ref={menuRef}>
            <button
              className="focus:outline-none"
              aria-label="Select language"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <FaGlobe className="text-2xl cursor-pointer" />
            </button>
            {menuOpen && (
              <div  className={`fixed ${i18n.language==="ar"?"left-[50px]":"right-[85px]"}  top-[60px] bg-white text-black rounded-md shadow-lg mt-2 w-48`}>
                {languages.map((lang) => (
                  <div
                    key={lang.code}
                    onClick={() => handleLanguageChange(lang.code)}
                    className="flex justify-between items-center px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  >
                    <div className="flex items-center space-x-2">
                      <img className="w-5" src={lang.flag} alt={lang.name} />
                      <span>{lang.name}</span>
                    </div>
                    {selectedLanguage === lang.code && (
                      <FaCheck className="text-black" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          {token && (
            <div className="relative">
              <button
                className="focus:outline-none"
                aria-label="Notifications"
                onClick={toggleNotification}
              >
                <FaBell className="text-2xl cursor-pointer" />
              </button>
              {notificationVisible && (
                <div className={`absolute top-10 ${i18n.language === "ar"?"left-0":"right-0" } w-[400px] bg-white shadow-lg rounded-lg p-4 border border-gray-200 animate-fadeIn`}>
                  <div className="text-lg font-semibold text-gray-800 mb-2">
                    {t('Notifications')}
                  </div>
                  <div className="space-y-2 max-h-60 overflow-y-auto">
                    {notificationss?.all?.map((notification) => (
                      <div
                        key={notification?.data.id}
                        className="flex items-start flex-col space-x-2 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <div className="text-md text-bold text-black">
                          {notification?.data.title}
                        </div>
                        <div className="text-sm text-gray-700">
                          {notification?.data.message}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          {token && (
            <>
              <Link
                to={'/cart'}
                className="mb-1 focus:outline-none"
                aria-label="Open mobile menu"
              >
                <AiOutlineShoppingCart className="text-2xl cursor-pointer" />
              </Link>
            </>
          )}
              <button
                className="2xl:hidden block focus:outline-none"
                aria-label="Open mobile menu"
                onClick={showDrawer}
              >
                <FaBars className="text-2xl cursor-pointer" />
              </button>
        </div>
      </div>
      <DrawerMobile drawerVisible={drawerVisible} onClose={onClose} />
    </header>
  )
}

export default HeaderLayout
