import { Col } from 'antd'
import CheckOutPage from '../../Shared/CheckOutPage'
import { FaBus, FaUsers } from 'react-icons/fa'


const CheckoutBus = () => {
  return (
    <CheckOutPage>
      <Col span={12}>
      <div className="border rounded-lg p-4 shadow-lg bg-white flex flex-col w-full">
      <div className="flex justify-between items-center border-b pb-2 mb-2">
        <h3 className="font-bold text-lg">SwiftBus</h3>
      </div>
      <div className="flex justify-between items-center text-gray-700 text-sm mb-2">
        <span className="font-semibold text-lg">10:30 AM</span>
        <div className="flex items-center">
          <hr className="border-gray-400 w-12 mx-2" />
          <FaBus className="text-gray-600" />
          <hr className="border-gray-400 w-12 mx-2" />
        </div>
        <span className="font-semibold text-lg">2h 15m</span>
      </div>
      <div className="flex justify-between text-gray-500 text-sm mb-3">
        <span>New York</span>
        <span className="font-semibold text-xs">30 min duration</span>
        <span>Washington</span>
      </div>
      <div className="flex flex-wrap justify-between items-center gap-2">
        <span className="text-orange-500 font-bold text-lg">$25</span>
        <div className="flex items-center text-gray-600 text-sm gap-2">
          <span className="bg-red-100 text-red-600 px-3 py-1 rounded text-xs font-semibold">
            3 Seats Left
          </span>
          <span className="flex items-center">
            <FaUsers className="mr-1" /> Almost full
          </span>
        </div>
      </div>
    </div>
      </Col>
    </CheckOutPage>
  )
}

export default CheckoutBus
