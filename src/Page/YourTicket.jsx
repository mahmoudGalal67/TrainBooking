import { RiTrainLine } from 'react-icons/ri'
import bannerCar from '../assets/Img/bannerTrain.png'
import { Button } from 'antd'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useCarPricingMutation } from '../app/Feature/API/Train'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { useRailway } from '../context/railwayContext'

const YourTicket = () => {
  const navigate = useNavigate()
  const { carDetails } = useRailway()
  const [loading, setloading] = useState(false)

  const [carPricing] = useCarPricingMutation()
  const passengers = JSON.parse(localStorage.getItem('Guests'))
  const [searchData] = useSearchParams()
  const [trainDetails, settrainDetails] = useState(null)
  const data = {
    TrainNumber: searchData.get('trainNo'),
    DepartureDate: searchData.get('departure'),
    OriginCode: searchData.get('originCode'),
    DestinationCode: searchData.get('destinationCode'),
    Provider: searchData.get('provider'),
  }
  if (carDetails == null) {
    navigate('/train')
    return
  }
  const totalPrice =
    ((carDetails[0] && carDetails[0]?.ServiceCost * passengers.adults) || 0) +
      carDetails[0]?.ServiceCost * passengers.children || 0

  const formatDuration = (minutes) => {
    const base = dayjs().startOf('day') // 00:00
    const after = base.add(minutes, 'minute')
    const h = after.hour()
    const m = after.minute()

    if (h > 0 && m > 0)
      return `${h} hour ${m} minute
`
    if (h > 0) return `${h} hour`
    return `${m} minute`
  }

  const handleNavigate = () => {
    navigate(
      `/payment-services/train?trainNo=${trainDetails?.TrainInfo?.TrainNumber}&departure=${trainDetails?.TrainInfo?.LocalDepartureDateTime}&provider=${trainDetails?.TrainInfo?.Provider}&originCode=${trainDetails.OriginCode}&destinationCode=${trainDetails.DestinationCode}&ServiceCost=${totalPrice}`
    )
  }
  useEffect(() => {
    const getData = async () => {
      setloading(true)

      try {
        const res = await carPricing(data)
        setloading(false)

        settrainDetails(res?.data)
      } catch (err) {
        setloading(false)

        console.log(err)
      }
    }
    getData()
  }, [])
  return (
    <>
      <div
        className="relative h-[450px] bg-cover bg-center"
        style={{ backgroundImage: `url(${bannerCar})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <section className="relative h-full flex flex-col items-center justify-center text-center py-12 px-4">
          <div className="relative z-10 text-white max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Your Ticket</h1>
          </div>
        </section>
      </div>

      <div className="bg-white px-4 md:px-8 pt-12 flex flex-col md:flex-row pb-12 gap-8">
        <div className="flex-1 p-6 bg-white">
          <div className="border rounded-lg p-4 shadow-lg bg-white">
            <div className="flex justify-between items-center border-b pb-2 mb-2">
              <h3 className="font-bold text-lg">
                {trainDetails?.TrainInfo?.TrainNumber}
              </h3>
            </div>
            <div className="flex justify-between items-center text-gray-700 text-sm mb-2">
              <span className="font-semibold text-lg">
                {dayjs(trainDetails?.TrainInfo?.ArrivalDateTime).format(
                  'hh:mm A'
                )}
              </span>
              <div className="flex items-center">
                <hr className="border-gray-400 w-12 mx-2" />
                <RiTrainLine className="text-gray-600" />
                <hr className="border-gray-400 w-12 mx-2" />
              </div>
              <span className="font-semibold text-lg">
                {dayjs(trainDetails?.TrainInfo?.DepartureDateTime).format(
                  'hh:mm A'
                )}
              </span>
            </div>
            <div className="flex justify-between text-gray-500 text-sm mb-3">
              <span>{trainDetails?.TrainInfo?.OriginName}</span>

              <span className="text-xs">
                {formatDuration(trainDetails?.TrainInfo?.TripDuration)}
              </span>
              <span>{trainDetails?.TrainInfo?.DestinationName}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-orange-500 font-bold text-lg">
                {totalPrice}
              </span>
            </div>
          </div>
          <div className="w-full mt-4 flex justify-center">
            <Button
              type="primary"
              className="w-full p-4"
              disabled={loading}
              onClick={() => handleNavigate()}
            >
              Next
            </Button>
          </div>
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
                  {carDetails[0].PassengerSpecifyingRules}
                </p>
              </details>
              <details className="border p-2 rounded-md">
                <summary className="font-medium cursor-pointer">
                  Services
                </summary>
                <p className="text-gray-500 mt-2">
                  {carDetails[0].Services.map((item) => (
                    <span>{item}</span>
                  ))}
                </p>
              </details>
              <details className="border p-2 rounded-md">
                <summary className="font-medium cursor-pointer">
                  Rules for transporting pets
                </summary>
                <p className="text-gray-500 mt-2">
                  {carDetails[0].PetTransportationFullDescription}
                </p>
              </details>
            </div>
          </div>

          <div className="mt-6 p-4 bg-white shadow-md rounded-md">
            <h3 className="text-lg font-semibold">Fare Rules</h3>
            <div className="mt-2">
              {!!passengers.adults && (
                <p className="flex justify-between border-b py-2">
                  <span className="font-bold text-lg">
                    Adults no {''}, {''}
                    {passengers.adults} * {''}
                    <span className="text-orange-500 font-bold text-lg">
                      {carDetails[0].ServiceCost}
                    </span>
                  </span>{' '}
                  {/* <span className="font-bold">150 EGP</span> */}
                </p>
              )}
              {!!passengers.children && (
                <p className="flex justify-between border-b py-2">
                  <span className="font-bold text-lg">
                    Children no, {passengers.children} * {''}
                    <span className="text-orange-500 font-bold text-lg">
                      {carDetails[0].ServiceCost}
                    </span>
                  </span>{' '}
                </p>
              )}
              {!!passengers.infants && (
                <p className="flex justify-between py-2">
                  <span className="font-bold text-lg">
                    Infants no, {passengers.infants}* {''}
                    <span className="text-orange-500 font-bold text-lg">
                      {carDetails[0].ServiceCost}
                    </span>
                  </span>{' '}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default YourTicket
