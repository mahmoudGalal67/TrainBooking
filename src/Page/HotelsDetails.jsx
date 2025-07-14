import { useParams } from 'react-router-dom'
import HotelInformation from '../Components/Hotels/HotelsDetails/HotelInformation'
import IntialValuesHotelsDetails from '../Components/Hotels/HotelsDetails/IntialValuesHotelsDetails'
import { useAllHotelsQuery } from '../app/Feature/API/Hotels'
import { DatePicker } from 'antd'
import { AiOutlineCalendar } from 'react-icons/ai'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
const HotelsDetails = () => {
  const { t } = useTranslation()
  const { name } = useParams()

  const { data: allHotels } = JSON.parse(localStorage.getItem(`cachedHotels`))
  // const isValidCache =
  //   cached && Date.now() - JSON.parse(cached).timestamp < 86400000

  // const allHotels = useAllHotelsQuery(undefined, {
  //   skip: isValidCache,
  // })

  // const { data: allHotels } = useAllHotelsQuery()

  const hotel = allHotels?.properties?.find((e) => e.name === name)

  const data = JSON.parse(localStorage.getItem('search-hotel-details'))

  const initialStartDate = data?.arrivalDateTime
    ? dayjs(data.arrivalDateTime)
    : null
  const initialEndDate = data?.departureDateTime
    ? dayjs(data.departureDateTime)
    : null

  const [startDate, setStartDate] = useState(initialStartDate)
  const [endDate, setEndDate] = useState(initialEndDate)

  function getDate(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
  }

  function handleChangeTime() {
    const arrivalDate = getDate(new Date(startDate))
    const departureDate = getDate(new Date(endDate))
    const newData = {
      ...data,
      arrivalDateTime: arrivalDate,
      departureDateTime: departureDate,
    }
    localStorage.setItem('search-hotel-details', JSON.stringify(newData))
    window.location.reload()
  }
  return (
    <div className="mt-[80px] container mx-auto py-10 mb-16">
      <IntialValuesHotelsDetails hotel={hotel} data={data} />
      <div className="max-w-4xl mx-auto flex flex-col items-center md:flex-row space-y-4 md:space-y-0 md:space-x-4 bg-white px-4 py-1 rounded-lg shadow-lg">
        <div className="flex items-center w-full border border-gray-300 rounded-lg px-2 py-1">
          <AiOutlineCalendar className="text-gray-800 mr-2" size={20} />
          <div className="flex items-center space-x-2 w-full">
            <DatePicker
              minDate={dayjs()}
              value={startDate}
              onChange={(date) => setStartDate(dayjs(date))}
              placeholderText={t('From')}
              dateFormat="MMM dd"
              className="px-2 py-1 w-full text-black text-sm focus:outline-none"
            />
            <span className="text-gray-700">-</span>
            <DatePicker
              minDate={dayjs(startDate).add(1, 'day')}
              value={endDate}
              onChange={(date) => setEndDate(dayjs(date))}
              placeholderText={t('To')}
              dateFormat="MMM dd"
              className="px-2 py-1 w-full text-black text-sm focus:outline-none"
            />
          </div>
        </div>

        <button
          className="shrink-0 px-5 py-2 bg-primary text-white rounded-lg hover:bg-second transition-all duration-200 text-sm"
          onClick={handleChangeTime}
        >
          {t('Change Time')}
        </button>
      </div>
      <div className="pt-8">
        <HotelInformation hotel={hotel} dataRoom={data} />
      </div>
    </div>
  )
}
export default HotelsDetails
