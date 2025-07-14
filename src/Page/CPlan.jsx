/* eslint-disable react/no-unescaped-entities */
import hotel from '../assets/Img/plan-hotel.png'
import heart from '../assets/Img/heart.png'
import CreatePlan from '../Components/Plan/CreatePlan'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const CPlan = () => {
  const [drawerVisible, setDrawerVisible] = useState(false)

  const showDrawer = () => {
    setDrawerVisible(true)
  }

  const onClose = () => {
    setDrawerVisible(false)
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 mt-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          Personalize your travel <br /> planning with Trips
        </h1>
        <p className="text-gray-600 mb-8 mt-8 text-xl">
          you've got more than 8 million spots to discover, with over one
          billion traveler
          <br /> reviews and opinions to guide you.
        </p>
        <Link
          to={'trip-details'}
          className="text-xl font-bold border-dashed border-8 border-black p-2"
        >
          trip-details
        </Link>
        <div className="flex justify-evenly space-x-8 mb-20">
          <div className="flex flex-col items-center">
            <img src={hotel} alt="" />
            <p className="text-gray-800">
              Save Hotels,
              <br /> restaurants and more
            </p>
          </div>
          <div className="flex flex-col items-center">
            <img src={heart} alt="" />
            <p className="text-gray-800">
              See your saves on <br /> your custom map
            </p>
          </div>
        </div>
        <button
          onClick={showDrawer}
          className="border border-gray-400 px-6 py-4 w-full text-xl rounded-lg text-black font-semibold hover:bg-gray-200"
        >
          + Create Your Own Trip
        </button>
        <CreatePlan drawerVisible={drawerVisible} onClose={onClose} />
      </div>
    </div>
  )
}

export default CPlan
