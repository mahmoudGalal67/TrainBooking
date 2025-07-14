import { RiTrainLine } from 'react-icons/ri'
import bannerCar from '../assets/Img/bannerTrain.png'
import { Button, message, Radio } from 'antd'
import { Fragment, useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useCarPricingMutation } from '../app/Feature/API/Train'
import dayjs from 'dayjs'
import { useRailway } from '../context/railwayContext'

const TrainDetails = () => {
  const { num } = useParams()
  const [searchData] = useSearchParams()
  const { setcarDetails, carDetails } = useRailway()
  const [loading, setloading] = useState(false)

  const navigate = useNavigate()

  const [selectedSeatType, setSelectedSeatType] = useState(null)
  const [selectedSeatIndex, setSelectedSeatIndex] = useState([])
  const [trainDetails, settrainDetails] = useState(null)

  const [carGroups, setcarGroups] = useState([])
  const [activeSeatsType, setactiveSeatsType] = useState([])
  const data = {
    TrainNumber: num,
    DepartureDate: searchData.get('departure'),
    OriginCode: searchData.get('originCode'),
    DestinationCode: searchData.get('destinationCode'),
    Provider: searchData.get('provider'),
  }

  const [carPricing] = useCarPricingMutation()
  const guests = JSON.parse(localStorage.getItem('Guests'))
  let totalGuest = 0
  if (Object.values(guests)) {
    Object.values(guests).map((item) => {
      totalGuest = totalGuest + parseInt(item)
    })
  }
  function groupByCarType(array) {
    const grouped = {}

    array.forEach((item) => {
      const type = item.CarType
      if (!grouped[type]) {
        grouped[type] = []
      }
      grouped[type].push(item)
    })

    return grouped
  }

  useEffect(() => {
    const getData = async () => {
      setloading(true)
      try {
        const res = await carPricing(data)

        setcarGroups(groupByCarType(res?.data?.Cars))
        setloading(false)
        settrainDetails(res?.data)
      } catch {
        setloading(false)
        message.error('No Data')
      }
    }
    getData()
  }, [])

  const handleNavigate = () => {
    if (selectedSeatIndex.length < totalGuest) {
      message.error('Please select all seats')
      return
    }
    localStorage.setItem('selectedSeats', JSON.stringify(selectedSeatIndex))
    navigate(
      `/your-ticket?trainNo=${trainDetails?.TrainInfo?.TrainNumber}&departure=${trainDetails?.TrainInfo?.LocalDepartureDateTime}&provider=${trainDetails?.TrainInfo?.Provider}&originCode=${trainDetails.OriginCode}&destinationCode=${trainDetails.DestinationCode}`
    )
  }
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

  const handleSeatIndex = (seat) => {
    if (selectedSeatIndex.length < totalGuest) {
      if (!selectedSeatIndex.includes(seat)) {
        setSelectedSeatIndex([...selectedSeatIndex, seat])
        return
      }
    }
    setSelectedSeatIndex((prev) => prev.filter((item) => item != seat))
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
              Train Details
            </h1>
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
              <span className="text-blue-500 text-sm font-semibold">{5} ★</span>
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
                {carDetails && carDetails?.ServiceCost}
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
              Select
            </Button>
          </div>
        </div>

        {/* اختيار نوع التذكرة */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold">Select Ticket Type</h3>
          <div className="mt-2 space-y-2">
            {Object.entries(carGroups)?.map(([carType, items]) => (
              <div
                key={carType}
                className={`border p-2 rounded-md flex justify-between items-center ${
                  selectedSeatType === carType ? 'bg-orange-100' : ''
                }`}
              >
                <span>
                  {carType} -{' From '}
                  {Math.min(...items.map((item) => parseInt(item.ServiceCost)))}
                </span>
                <Radio
                  checked={selectedSeatType === carType}
                  onChange={() => {
                    setSelectedSeatType(carType)
                    setactiveSeatsType(carGroups[carType])
                    setcarDetails(carGroups[carType])
                    setSelectedSeatIndex([])
                  }}
                />
              </div>
            ))}
          </div>

          {/* عرض المقاعد بعد اختيار النوع */}
          {selectedSeatType && (
            <>
              <h3 className="mt-6 text-lg font-semibold">Select a Seat</h3>
              <div className="grid grid-cols-5 gap-2 mt-4">
                {activeSeatsType.map((seat, index) => (
                  <Fragment key={index}>
                    {seat.FreePlaces.split(',').map((item, i) => (
                      <button
                        key={i}
                        className={`w-12 h-12 rounded-full border flex items-center justify-center text-sm font-semibold
                  
                      ${selectedSeatIndex.includes(item) ? 'bg-orange-500 text-white' : ''}
                    `}
                        onClick={() => {
                          handleSeatIndex(item)
                          // setcarDetails(seat)
                        }}
                      >
                        {item || 0}
                      </button>
                    ))}
                  </Fragment>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default TrainDetails
