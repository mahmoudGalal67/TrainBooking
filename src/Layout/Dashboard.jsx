import { useState } from 'react'
import {
  FaBars,
  FaTimes,
  FaHome,
  FaListAlt,
  FaUserCog,
  FaChartLine,
  // FaUsers,
  FaSignOutAlt,
  FaRocketchat,
  FaHistory,
} from 'react-icons/fa'

import avatarImage from '../assets/Img/avatar.png'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { BiCategoryAlt } from 'react-icons/bi'
import { IoBagAddOutline } from 'react-icons/io5'
import { MdOutlineAdminPanelSettings } from 'react-icons/md'

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const handleLogOut = async () => {
    localStorage.clear()
    navigate('/login/admin')
    window.location.reload()
  }

  const userData = JSON.parse(localStorage.getItem('userData'));

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <aside
        className={`fixed min-w-[300px] z-10 h-full bg-white border-r border-gray-200 transition-transform transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:relative lg:translate-x-0 lg:w-64`}
      >
        <div className="p-6">
          <h1 className="text-3xl font-bold text-center">Moscow</h1>
          <button
            className="absolute top-4 right-4 lg:hidden"
            onClick={toggleSidebar}
            aria-label="Close sidebar"
          >
            <FaTimes size={24} />
          </button>
        </div>
        <nav className="mt-6 overflow-auto max-h-[80vh]">
          <ul>
            <Link to="/Dashboard/">
              <li className="flex items-center p-4 hover:bg-gray-100">
                <FaHome className="mr-2" />
                Home
              </li>
            </Link>
            <Link to="/Dashboard/story">
              <li className="flex items-center p-4 hover:bg-gray-100">
                <FaHistory className="mr-2" />
                Story
              </li>
            </Link>
            <Link to="/Dashboard/Category">
              <li className="flex items-center p-4 hover:bg-gray-100">
                <BiCategoryAlt className="mr-2" />
                Category
              </li>
            </Link>
            <Link to="/Dashboard/Product">
              <li className="flex items-center p-4 hover:bg-gray-100">
                <IoBagAddOutline className="mr-2" />
                Product
              </li>
            </Link>
            <Link to="/Dashboard/requests">
              <li className="flex items-center p-4 hover:bg-gray-100">
                <FaListAlt className="mr-2" />
                Requests
              </li>
            </Link>
            <Link to="/Dashboard/customer-services">
              <li className="flex items-center p-4 hover:bg-gray-100">
                <FaChartLine className="mr-2" />
                Customer Services
              </li>
            </Link>
            {/* <Link to="/Dashboard/review-financial-reports">
              <li className="flex items-center p-4 hover:bg-gray-100">
                <FaUsers className="mr-2" />
                Review Financial Reports
              </li>
            </Link> */}
            <Link to="/Dashboard/user-management">
              <li className="flex items-center p-4 hover:bg-gray-100">
                <FaUserCog className="mr-2" />
                User Management
              </li>
            </Link>
            <Link to="/Dashboard/support/chat/live-help-and-assistance">
              <li className="flex items-center p-4 hover:bg-gray-100">
                <FaRocketchat className="mr-2" />
                Chat
              </li>
            </Link>
            <Link to="/Dashboard/Admins">
              <li className="flex items-center p-4 hover:bg-gray-100">
                <MdOutlineAdminPanelSettings className="mr-2" />
                Admins
              </li>
            </Link>
            <li
              className="flex items-center p-4 hover:bg-gray-100 cursor-pointer"
              onClick={handleLogOut}
            >
              <FaSignOutAlt className="mr-2" />
              <p>Logout</p>
            </li>
          </ul>
        </nav>
      </aside>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 lg:hidden"
          onClick={toggleSidebar}
          aria-label="Close sidebar overlay"
        />
      )}
      <main className="flex-1 overflow-y-scroll overflow-x-hidden">
        <header className="flex items-center justify-between bg-white py-8 px-6 shadow">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden"
              onClick={toggleSidebar}
              aria-label="Open sidebar"
            >
              <FaBars size={24} />
            </button>
            <h2 className="text-3xl font-semibold">Moscow</h2>
          </div>
          <div className="flex items-center gap-4">
            <img
              src={avatarImage}
              alt="User Avatar"
              className="w-10 h-10 rounded-full"
            />
            <span className="text-lg text-gray-400 font-medium">{userData?.user?.name}</span>
          </div>
        </header>

        <div className="mt-4 p-6">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default Dashboard
