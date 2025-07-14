import { Card, Col } from 'antd'
import CheckOutPage from '../../Shared/CheckOutPage'
import {
  FaCar,
  FaSuitcase,
  FaSnowflake,
  FaGasPump,
  FaCogs,
  FaPlane,
  FaStar,
} from 'react-icons/fa'
import { useLocation } from 'react-router-dom'
const defaultRoom = {
  id: 1,
  name: 'Hyundai Tucson',
  image: 'https://via.placeholder.com/600x400',
  description: 'Spacious room with city view and modern amenities.',
  price: 120,
  rating: 4.7,
  details: 'Additional details about the Deluxe Room.',
  reviews: ['Great room!', 'Very comfortable and spacious.'],
}

const CheckOutCar = () => {
  const location = useLocation()
  const { room } = location.state || { room: defaultRoom }
  return (
    <CheckOutPage>
      <Col span={12}>
        <Card title="Car Details" bordered={false} className="mb-4">
          <h3 className="text-xl font-bold mb-2">{room.name}</h3>

          <div className="flex items-center mt-4 text-lg font-semibold text-gray-700">
            <span className="text-yellow-500">
              <FaStar size={20} />
            </span>
            <span className="ml-2 text-gray-800">4.5</span>
            <span className="ml-4 text-gray-500">Rating (1,649)</span>
          </div>
          <div>
            <ul className="mt-3 text-gray-700 space-y-2">
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
            </ul>
            <div className="mt-4 flex items-center text-sm text-gray-600">
              <span className="mr-3 flex items-center">
                <FaPlane className="text-orange-500 mr-1" /> Moscow Airport
              </span>
              <span className="flex items-center">
                <FaStar className="text-yellow-500 mr-1" /> 4.5/5
              </span>
            </div>
          </div>
        </Card>

        <Card title="Your Booking Details" bordered={false} className="mb-4">
          <div className="flex border-b pb-6">
            <div className="border-r pr-5">
              <h3 className="text-xl font-bold">Pickup Location</h3>
              <p className="text-gray-700 font-semibold text-md mt-4">
                Moscow Airport
              </p>
            </div>
            <div className="pl-5">
              <h3 className="text-xl font-bold">Arrival Location</h3>
              <p className="text-gray-700 font-semibold text-md mt-4">
                Lotte Hotel Moscow
              </p>
            </div>
          </div>

          {/* <div className='pt-4 border-b pb-6'>
                <h3 className="text-xl font-bold">Total Length of stay:</h3>
                <p className="text-gray-700 font-semibold text-md mt-4">1 Week</p>
              </div> */}

          <div className="pt-4">
            <h3 className="text-xl font-bold">You Selected:</h3>
            <p className="text-gray-700 font-semibold text-md mt-4">
              1 Room For 2 adults and 1 child
            </p>
          </div>
        </Card>

        <Card title="Checkout Details" bordered={false}>
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Subtotal</h3>
            <p className="text-gray-700 font-semibold text-md mt-4">$1,072</p>
          </div>
        </Card>
      </Col>
    </CheckOutPage>
  )
}

export default CheckOutCar
