import { Col } from 'antd'
import CheckOutPage from '../../Shared/CheckOutPage'
import { RiTrainLine } from 'react-icons/ri'
import { useEffect, useState } from 'react'
import { useCarPricingMutation } from '../../app/Feature/API/Train'
import { useSearchParams } from 'react-router-dom'
import dayjs from 'dayjs'

const CheckoutTrain = () => {
  const [trainDetails, settrainDetails] = useState(null)

  const [carPricing] = useCarPricingMutation()
  const [searchData] = useSearchParams()

  const data = {
    TrainNumber: searchData.get('trainNo'),
    DepartureDate: searchData.get('departure'),
    OriginCode: searchData.get('originCode'),
    DestinationCode: searchData.get('destinationCode'),
    Provider: searchData.get('provider'),
    ServiceCost: searchData.get('ServiceCost'),
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
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await carPricing(data)
        settrainDetails(res?.data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [])
  return (
    <CheckOutPage trainDetails={trainDetails}>
      <Col span={12}>
        <div className="border rounded-lg p-4 shadow-lg bg-white flex flex-col">
          <div className="flex justify-between items-center border-b pb-2 mb-2">
            <h3 className="font-bold text-lg">
              {trainDetails?.TrainInfo?.TrainNumber}
            </h3>
          </div>
          <div className="flex justify-between items-center text-gray-700 text-sm mb-2">
            <span className="font-semibold text-lg">
              {' '}
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
          {/* <div className="flex flex-col text-gray-700 text-sm mb-3">
            {trainDetails?.seats.map((seat, index) => (
              <div key={index} className="flex justify-between">
                <span>{seat.type}</span>
                <span>{seat.price}</span>
              </div>
            ))}
          </div> */}
          <div className="flex justify-between items-center">
            <span className="text-orange-500 font-bold text-lg">
              {data?.ServiceCost}
            </span>
          </div>
        </div>
      </Col>
    </CheckOutPage>
  )
}

export default CheckoutTrain
