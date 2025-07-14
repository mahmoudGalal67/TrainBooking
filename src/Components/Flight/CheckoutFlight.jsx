import { Col } from 'antd'
import CheckOutPage from '../../Shared/CheckOutPage'
import { RiFlightTakeoffLine } from 'react-icons/ri';


const tripData = {
    id: 1,
    airline: "AJet",
    rating: 4.5,
    time: "10:30 AM",
    duration: "3h",
    from: "Cairo (CAI)",
    to: "Dubai (DXB)",
    baggage: [
      { type: "Cabin Bag", included: true },
      { type: "Checked Bag", included: false },
    ],
    price: "$250",
    seatsLeft: 5,
  };

const CheckoutFlight = () => {
  return (
    <CheckOutPage>
      <Col span={12}>
      <div key={tripData.id} className="border rounded-lg p-4 shadow-lg bg-white flex flex-col">
      <div className="flex justify-between items-center border-b pb-2 mb-2">
        <h3 className="font-bold text-lg">{tripData.airline}</h3>
        <span className="text-blue-500 text-sm font-semibold">{tripData.rating} ★</span>
      </div>
      <div className="flex justify-between items-center text-gray-700 text-sm mb-2">
        <span className="font-semibold text-lg">{tripData.time}</span>
        <div className="flex items-center">
          <hr className="border-gray-400 w-12 mx-2" />
          <RiFlightTakeoffLine className="text-gray-600" />
          <hr className="border-gray-400 w-12 mx-2" />
        </div>
        <span className="font-semibold text-lg">{tripData.duration}</span>
      </div>
      <div className="flex justify-between text-gray-500 text-sm mb-3">
        <span>{tripData.from}</span>
        <span className="text-xs">{tripData.duration} duration</span>
        <span>{tripData.to}</span>
      </div>
      <div className="text-gray-700 text-sm mb-3">
        {tripData.baggage.map((bag, index) => (
          <div key={index} className="flex justify-between">
            <span>{bag.type}</span>
            <span>{bag.included ? "Included" : "Not included"}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center">
        <span className="text-orange-500 font-bold text-lg">{tripData.price}</span>
      </div>
      <div className="flex justify-between items-center mt-3">
        <span className="bg-red-100 text-red-600 px-3 py-1 rounded text-xs font-semibold">
          {tripData.seatsLeft} Seats Left
        </span>
        {/* <Button type="primary" className="w-full md:w-auto">
          Choose Trip
        </Button> */}
      </div>
    </div>
      </Col>
    </CheckOutPage>
  )
}

export default CheckoutFlight