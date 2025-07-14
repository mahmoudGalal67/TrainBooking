import bannerCar from '../assets/Img/bannerFlights.png'
import { useNavigate, useLocation } from 'react-router-dom'
import duration from 'dayjs/plugin/duration'
const tripData = {
  id: 1,
  airline: 'AJet',
  rating: 4.5,
  time: '10:30 AM',
  duration: '3h',
  from: 'Cairo (CAI)',
  to: 'Dubai (DXB)',
  baggage: [
    { type: 'Cabin Bag', included: true },
    { type: 'Checked Bag', included: false },
  ],
  price: '$250',
  seatsLeft: 5,
}

// dayjs.extend(duration)

const FlightDetails = () => {
  const navigate = useNavigate()
  const data = useLocation().state

  const handleNavigate = () => {
    navigate(`/fare-selection`)
  }
  return (
    <>
      <div
        className="relative h-[450px] bg-cover bg-center"
        style={{ backgroundImage: `url(${bannerCar})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <section className="relative h-full flex flex-col items-center justify-center text-center py-12 px-4">
          <div className="relative z-10 text-white max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Flight Details
            </h1>
          </div>
        </section>
      </div>
      <div className="bg-white px-4 md:px-8  pt-12 flex flex-col md:flex-row pb-12 gap-8">
        <div className="flex-1 p-6 bg-white">
          <button
            className="mt-4 w-full bg-orange-500 text-white py-2 rounded-md text-lg font-semibold"
            onClick={() => handleNavigate()}
          >
            Select
          </button>
        </div>
        <div className="flex-1">
          <div className="mt-6 p-4 bg-white shadow-md rounded-md">
            <h3 className="text-lg font-semibold">More Details</h3>
            <div className="mt-2 space-y-2">
              <details className="border p-2 rounded-md">
                <summary className="font-medium cursor-pointer">
                  Return conditions
                </summary>
                <p className="text-gray-500 mt-2">
                  Details about return conditions.
                </p>
              </details>
              <details className="border p-2 rounded-md">
                <summary className="font-medium cursor-pointer">
                  Baggage Transportation rules
                </summary>
                <p className="text-gray-500 mt-2">
                  Details about baggage rules.
                </p>
              </details>
              <details className="border p-2 rounded-md">
                <summary className="font-medium cursor-pointer">
                  Rules for transporting pets
                </summary>
                <p className="text-gray-500 mt-2">
                  Details about pet transportation.
                </p>
              </details>
            </div>
          </div>

          <div className="mt-6 p-4 bg-white shadow-md rounded-md">
            <h3 className="text-lg font-semibold">Fare Rules</h3>
            <div className="mt-2">
              <p className="flex justify-between border-b py-2">
                <span>adult</span>{' '}
                <span className="font-bold">150 EGP</span>
              </p>
              <p className="flex justify-between border-b py-2">
                <span>Child 2-11 y.o</span>{' '}
                <span className="font-bold">100 EGP</span>
              </p>
              <p className="flex justify-between py-2">
                <span>Infant, under 2 y.o, no seat</span>{' '}
                <span className="font-bold">50 EGP</span>
              </p>
            </div>
          </div>
          <div className="mt-6  bg-white rounded-md">
            <h3 className="text-lg font-semibold">Flight details</h3>
            <div className="mt-2">
              <p className="flex justify-between border py-2 px-4 rounded-md">
                <span>Travel time</span>
                <span className="font-bold">
                  time{' '}: 00
                  {/* {dayjs
                    .duration(data?.itineraries[0]?.duration)
                    .format('HH:mm')} */}
                </span>
              </p>
              <p className="flex justify-between border py-2 px-4 rounded-md mt-2">
                <span>Cabbin baggage 1 x 8kg</span>
                <span className="font-bold">Included</span>
              </p>
              <p className="flex justify-between border py-2 px-4 rounded-md mt-2">
                <span>Checked baggage</span>
                <span className="font-bold">a free applies</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default FlightDetails
