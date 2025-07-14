// import {
//   FaCar,
//   FaSuitcase,
//   FaSnowflake,
//   FaGasPump,
//   FaCogs,
//   FaPlane,
//   FaStar,
// } from 'react-icons/fa'
// import car2 from '../../../assets/Img/car2.png'
// import { Link } from 'react-router-dom'
import { useGetCashbackUserQuery } from '../../../app/Feature/API/Payment'
import CheckOutCar from './CheckOutCar'
import { useState } from 'react'

const ResultCarDetails = () => {
  const CarDetailsData = JSON.parse(localStorage.getItem('carReservation'))
  const CarReserve = JSON.parse(localStorage.getItem('CarReserveData'))
  const Total = (
    parseInt(CarDetailsData?.availableCar?.totalCost || 0, 10)
  ).toFixed(2)
  const { data: cashback } = useGetCashbackUserQuery()

  const [drawerVisible, setDrawerVisible] = useState(false)

  const onClose = () => {
    setDrawerVisible(false)
  }

  const showDrawer = () => {
    setDrawerVisible(true)
  }

  const cashbackAmount = Number(cashback?.cashback?.cashback_amount || 0)
  const totalAfterCashback = (Number(Total) - cashbackAmount).toFixed(2)

  if (!CarDetailsData) return

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="col-span-1 bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-bold mb-6">Capacity</h3>
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium">Packages</span>
              <div className="flex items-center space-x-3">
                <span className="font-semibold text-lg">
                  {CarDetailsData?.availableCar?.car.package_from} -{' '}
                  {CarDetailsData?.availableCar?.car.package_to}
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium">Adults</span>
              <div className="flex items-center space-x-3">
                <span className="font-semibold text-lg">
                  {CarDetailsData?.availableCar?.car.passenger_from} -{' '}
                  {CarDetailsData?.availableCar?.car.passenger_to}
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium">Car Type</span>
              <div className="flex items-center space-x-3">
                <span className="font-semibold text-lg">
                  {CarDetailsData?.availableCar?.car.type}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 col-span-1 bg-white shadow-lg rounded-2xl p-6 flex flex-col lg:flex-row lg:items-end lg:justify-between hover:shadow-2xl transition-shadow duration-300 ease-in-out">
          <div className="flex items-center space-x-6 w-full flex-col sm:flex-row">
            {/* <img
              src={car2}
              alt="Car"
              className="w-54 h-54 object-cover rounded-lg"
            /> */}
            <div>
              <h3 className="text-2xl font-bold text-gray-800">
                {CarDetailsData?.availableCar?.car.name}
              </h3>
              {/* <ul className="mt-3 text-gray-700 space-y-2">
                <li className="flex items-center">
                  <FaCar className="text-orange-500 mr-2" /> 4 Seats
                </li>
                <li className="flex items-center">
                  <FaSuitcase className="text-orange-500 mr-2" /> 4 Bags
                </li>
                <li className="flex items-center">
                  <FaSnowflake className="text-orange-500 mr-2" /> Air Condition
                </li>
                <li className="flex items-center">
                  <FaGasPump className="text-orange-500 mr-2" /> Full to Full
                </li>
                <li className="flex items-center">
                  <FaCogs className="text-orange-500 mr-2" /> Manual
                </li>
              </ul> */}
              {/* <div className="mt-4 flex items-center text-sm text-gray-600">
                <span className="mr-3 flex items-center">
                  <FaPlane className="text-orange-500 mr-1" /> Moscow Airport
                </span>
                <span className="flex items-center">
                  <FaStar className="text-yellow-500 mr-1" /> 4.5/5
                </span>
              </div> */}
              <div className="text-xl font-semibold text-primary mb-4 mt-8">
                <span className="text-gray-600 mr-2">Hour In Town</span>$
                {Number(CarDetailsData?.availableCar?.car.hour_in_town)}
              </div>
              <div className="text-xl font-semibold text-primary mb-4">
                <span className="text-gray-600 mr-2">Airport To Town</span>$
                {Number(CarDetailsData?.availableCar?.car.airport_to_town)}
              </div>
              {CarReserve?.trip_type !== 'accommodation' && (
                <div className="text-xl font-semibold text-primary mb-4">
                  <span className="text-gray-600 mr-2">Total hours</span>$
                  {Number(CarDetailsData?.availableCar?.durationInHours)}
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 md:mt-4 text-center md:text-right">
            <div className="text-xl font-semibold text-primary mb-4">
              <span className="text-gray-600 mr-2">Total</span>$
              {Number(CarDetailsData?.availableCar?.totalCost)}
            </div>
            {cashback?.cashback !== null && (
              <p className="text-xl mt-2 text-gray-600 font-bold">
                Cashback:{' '}
                <span className="text-primary">
                  ${Number(cashback?.cashback?.cashback_amount)}
                </span>
              </p>
            )}
            {cashback?.cashback !== null && (
              <p className="text-xl border- mt-4 pt-2 text-gray-600 font-bold text-nowrap mb-4">
                Total After Cashback:{' '}
                <span className="text-primary">${totalAfterCashback}</span>
              </p>
            )}
            <button
              onClick={showDrawer}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-xl transition-all ease-in-out"
            >
              Checkout
            </button>
          </div>
          <CheckOutCar
            drawerVisible={drawerVisible}
            onClose={onClose}
            Total={Total}
            cashback={cashback?.cashback?.cashback_amount}
            calculateTotal={(
              Total - (Number(cashback?.cashback?.cashback_amount) || 0)
            ).toFixed(2)}
          />
        </div>
      </div>
    </div>
  )
}

export default ResultCarDetails
