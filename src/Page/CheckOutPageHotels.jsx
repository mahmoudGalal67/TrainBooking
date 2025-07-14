import { Card, Col } from 'antd'
import CheckOutHotel from '../Shared/CheckOutHotel'
import { MdLocationOn } from 'react-icons/md'
import { useLocation } from 'react-router-dom'
import dayjs from 'dayjs'
import { AiFillStar } from 'react-icons/ai'

const CheckOutPageHotels = () => {
  const location = useLocation()
  const data = location.state || localStorage.getItem('roomData')

  const checkIn = dayjs(data?.stayDates?.arrivalDateTime).startOf('day')
  const checkOut = dayjs(data?.stayDates?.departureDateTime).startOf('day')
  const daysDiff = Math.max(1, checkOut.diff(checkIn, 'day'))

  const priceDay = (data?.total?.priceBeforeTax / daysDiff).toFixed(2)

  return (
    <CheckOutHotel>
      <Col span={12}>
        <Card title="Hotels Details" variant={false} className="mb-4">
          <div className="flex items-center text-lg font-semibold text-gray-700">
            {Array(data.stars)
              .fill()
              .map((_, i) => (
                <AiFillStar key={i} className={'w-8 h-8 text-yellow-500'} />
              ))}
            {/* <span className="text-yellow-500">
              <FaStar size={20} />
            </span>
            <span className="ml-2 text-gray-800">{data.stars}</span>
            <span className="ml-4 text-gray-500">Rating (1,649)</span> */}
          </div>
          <h3 className="text-xl font-bold mt-2">{data?.hotelName}</h3>

          <p className="text-gray-600 mt-4 text-md">
            #1 of 528 hotels in Moscow
          </p>

          <p className="text-gray-700 font-semibold text-md mt-4 flex items-center">
            <MdLocationOn className="text-red-500" size={20} />
            {data?.addressLine}
          </p>
        </Card>

        <Card title="Your Booking Details" variant={false} className="mb-4">
          <div className="flex border-b pb-6">
            <div className="border-r pr-5">
              <h3 className="text-xl font-bold">Check in</h3>
              <p className="text-gray-700 font-semibold text-md mt-4">
                {checkIn.format('ddd, MMM DD')}
              </p>
            </div>
            <div className="pl-5">
              <h3 className="text-xl font-bold">Check out</h3>
              <p className="text-gray-700 font-semibold text-md mt-4">
                {checkOut.format('ddd, MMM DD')}
              </p>
            </div>
          </div>

          <div className="pt-4 border-b pb-6">
            <h3 className="text-xl font-bold">Total Length of stay:</h3>
            <p className="text-gray-700 font-semibold text-md mt-4">
              {daysDiff} day
            </p>
          </div>

          <div className="pt-4">
            <h3 className="text-xl font-bold">You Selected:</h3>
            <p className="text-gray-700 font-semibold text-md mt-4">
              1 Room For {data?.guestCount?.adultCount} adults and{' '}
              {data?.guestCount?.childAges?.length} child
            </p>
          </div>
        </Card>

        <Card title="Checkout Details" variant={false}>
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Price per night</h3>
            <p className="text-gray-700 font-semibold text-lg">
              {priceDay}
              <span className="ml-1">{data?.currencyCode}</span>
            </p>
          </div>
          {/* <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Taxs</h3>
            <p className="text-gray-700 font-semibold text-lg">
              {data?.total?.taxAmount}
              <span className="ml-1">{data?.currencyCode}</span>
            </p>
          </div> */}
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Subtotal</h3>
            <p className="text-gray-700 font-semibold text-lg">
              {data?.total?.priceBeforeTax} {data?.currencyCode}
            </p>
          </div>
        </Card>
      </Col>
    </CheckOutHotel>
  )
}

export default CheckOutPageHotels
