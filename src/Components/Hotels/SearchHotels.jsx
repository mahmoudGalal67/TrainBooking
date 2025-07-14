import { CiSearch } from 'react-icons/ci'
import { AiOutlineCalendar } from 'react-icons/ai'
import { FaBed, FaCircleNotch, FaUserFriends } from 'react-icons/fa'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { message, Select } from 'antd'
import {
  useAllHotelsQuery,
  useSearchRoomsMutation,
} from '../../app/Feature/API/Hotels'
import { useNavigate } from 'react-router-dom'

export default function SearchHotels({ sd, ed, adult, child, ids, cityName }) {
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [guests, setGuests] = useState(1)
  const [children, setChildren] = useState(0)
  const [childAges, setChildAges] = useState([])
  const [showSelector, setShowSelector] = useState(false)
  const [isInputFocused, setIsInputFocused] = useState(false)
  const selectorRef = useRef(null)
  const closeButtonRef = useRef(null)
  const { t } = useTranslation()
  const [search, { isLoading }] = useSearchRoomsMutation()

  const cached = localStorage.getItem(`cachedHotels`)
  const isValidCache =
    cached && Date.now() - JSON.parse(cached).timestamp < 86400000

  const allHotels = useAllHotelsQuery(undefined, {
    skip: isValidCache,
  })

  const [hotelsDetails, setHotelDetails] = useState([])
  const [propertyIds, setPropertyIds] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        selectorRef.current &&
        !selectorRef.current.contains(event.target) &&
        (!closeButtonRef.current ||
          !closeButtonRef.current.contains(event.target))
      ) {
        setShowSelector(false)
        setIsInputFocused(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const addChild = () => {
    if (children >= 9) return
    setChildren(children + 1)
    setChildAges([...childAges, 3])
  }

  const removeChild = () => {
    if (children > 0) {
      setChildren(children - 1)
      setChildAges(childAges.slice(0, -1))
    }
  }

  const updateChildAge = (index, age) => {
    const newAges = [...childAges]
    newAges[index] = age
    setChildAges(newAges)
  }

  const handleClickInsideSelector = (event) => {
    event.stopPropagation()
  }

  useEffect(() => {
    let rowData

    if (allHotels.isSuccess) {
      rowData = allHotels.data
    } else if (
      allHotels.isUninitialized &&
      localStorage.getItem('cachedHotels')
    ) {
      const cached = JSON.parse(localStorage.getItem('cachedHotels'))
      rowData = cached.data
    }

    if (rowData) {
      const data = rowData.properties.map((e) => ({
        propertyId: e.id,
        cityId: e.contactInfo.address.cityId,
        cityName: e.contactInfo.address.cityName,
        ...e,
      }))
      const filterData = []
      data.forEach((e) => {
        let cityIndex = filterData.findIndex((c) => c.cityId === e.cityId)
        if (cityIndex === -1) {
          filterData.push({
            propertyId: [e.propertyId],
            cityId: e.cityId,
            cityName: e.cityName,
          })
        } else {
          filterData[cityIndex].propertyId.push(e.propertyId)
        }
      })
      setHotelDetails(filterData)
    }
  }, [allHotels])

  function getDate(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
  }

  const handleSearch = async () => {
    const arrivalDate = getDate(new Date(startDate))
    const departureDate = getDate(new Date(endDate))
    const data = {
      checkIn: arrivalDate,
      arrivalDate,
      departureDate,
      adults: guests,
      childAges,
      propertyIds,
    }
    const res = await search(data)
    if (res.error) {
      message.error(
        'Failed to Search Hotels reservation. Please try again later.'
      )
    } else {
      const roomStays = res?.data?.roomStays
      if (roomStays.length > 0) {
        message.success('Successfully Search Hotels reservation.')
        const filterRoom = Array.from(
          new Map(roomStays.map((e) => [e.propertyId, e])).values()
        )
        const dataSearchHotels = {
          cityName: hotelsDetails
            .filter((e) => propertyIds.some((id) => e.propertyId.includes(id)))
            .map((hotel) => hotel.cityName)[0],
          propertyIds,
          adult: guests,
          arrivalDateTime: startDate,
          childAges,
          departureDateTime: endDate,
        }
        localStorage.setItem(
          'search-hotel-details',
          JSON.stringify(dataSearchHotels)
        )
        localStorage.setItem('hotel-search', JSON.stringify(filterRoom))
        navigate('/hotels/all')
      } else {
        message.info(
          'The operation was successful, but no data is available , plaese try again soon'
        )
      }
    }
  }

  useEffect(() => {
    if (sd && ed && adult && Array.isArray(child) && ids && cityName) {
      setStartDate(new Date(sd))
      setEndDate(new Date(ed))
      setChildAges(child)
      setChildren(child.length)
      setGuests(adult)
      setPropertyIds(ids)
    }
  }, [sd, ed, adult, child])

  return (
    <div className="w-full flex flex-col items-center md:flex-row space-y-4 md:space-y-0 md:space-x-4 bg-white px-4 py-1 rounded-lg shadow-lg">
      <div className="relative flex items-center rounded-lg w-full p-2">
        <CiSearch className="text-gray-800 mr-2" size={20} />
        <Select
          showSearch
          placeholder={t('City Name')}
          optionFilterProp="children"
          defaultValue={cityName}
          onChange={(value) => {
            const propertiesIds = hotelsDetails.find(
              (e) => e.cityId === value
            ).propertyId
            setPropertyIds(propertiesIds)
          }}
          className="px-2 max-w-[100%] py-1 xl:min-w-[140px] w-full border-none rounded-lg focus:outline-none text-black text-sm"
          filterOption={(input, option) =>
            option.children.toLowerCase().includes(input.toLowerCase())
          }
        >
          {hotelsDetails?.map((e) => (
            <Select.Option key={e?.cityId} value={e?.cityId}>
              {e?.cityName}
            </Select.Option>
          ))}
        </Select>
        {isInputFocused && (
          <div
            className="absolute top-full mt-2 bg-white border border-gray-300 w-full shadow-lg p-4 rounded-lg z-20"
            ref={selectorRef}
            onClick={handleClickInsideSelector}
          >
            <p className="text-black">
              {t('Search for hotels by city, landmark, or property name')}
            </p>
          </div>
        )}
      </div>

      <div className="flex items-center w-full border border-gray-300 rounded-lg px-2 py-1">
        <AiOutlineCalendar className="text-gray-800 mr-2" size={20} />
        <div className="flex items-center space-x-2 w-full">
          <DatePicker
            minDate={new Date()}
            selected={startDate}
            onChange={(date) => {
              setStartDate(date)
              const nextDay = new Date(date.getTime() + 24 * 60 * 60 * 1000)
              if (!endDate || endDate <= date) {
                setEndDate(nextDay)
              }
            }}
            placeholderText={t('From')}
            dateFormat="MMM dd"
            className="px-2 py-1 w-full text-black text-sm focus:outline-none"
          />
          <span className="text-gray-700">-</span>
          <DatePicker
            minDate={
              startDate
                ? new Date(startDate.getTime() + 24 * 60 * 60 * 1000)
                : new Date()
            }
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            placeholderText={t('To')}
            dateFormat="MMM dd"
            className="px-2 py-1 w-full text-black text-sm focus:outline-none"
          />
        </div>
      </div>

      <div
        className="relative flex items-center w-full border border-gray-300 rounded-lg px-2 py-2 cursor-pointer"
        onClick={() => setShowSelector(!showSelector)}
      >
        {/* <FaBed className="text-gray-800 mr-2" size={20} />
        <span className="text-black text-sm">
          {rooms} {t('Room')}
          {rooms > 1 ? 's' : ''}
        </span> */}
        <FaUserFriends className="text-gray-800 ml-4 mr-2" size={20} />
        <span className="text-black text-sm">
          {guests + childAges.length} {t('Guest')}
          {guests + childAges.length > 1 ? 's' : ''}
        </span>
        {showSelector && (
          <div
            ref={selectorRef}
            className="absolute top-full mt-2 bg-white border border-gray-300 w-[230px] shadow-lg p-4 rounded-lg z-20"
            onClick={handleClickInsideSelector}
          >
            {/* <div className="mb-4 flex items-center justify-between border-b pb-1">
              <h3 className="text-sm text-black mb-2">{t('Room')}</h3>
              <div className="flex items-center space-x-2">
                <button
                  className="w-6 h-6 bg-black rounded-full text-white"
                  onClick={(e) => {
                    e.stopPropagation()
                    setRooms(Math.max(1, rooms - 1))
                  }}
                >
                  -
                </button>
                <span className="text-black">{rooms}</span>
                <button
                  className="w-6 h-6 bg-black rounded-full text-white"
                  onClick={(e) => {
                    e.stopPropagation()
                    setRooms(rooms + 1)
                  }}
                >
                  +
                </button>
              </div>
            </div> */}
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm text-black mb-2">{t('Adult')}</h3>
              <div className="flex items-center space-x-2">
                <button
                  className="w-6 h-6 bg-black rounded-full text-white"
                  onClick={(e) => {
                    e.stopPropagation()
                    setGuests(Math.max(1, guests - 1))
                  }}
                >
                  -
                </button>
                <span className="text-black">{guests}</span>
                <button
                  className="w-6 h-6 bg-black rounded-full text-white"
                  onClick={(e) => {
                    e.stopPropagation()
                    setGuests(guests + 1)
                  }}
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between mb-2 border-b pb-1">
              <h3 className="text-sm text-black mb-2">{t('Children')}</h3>
              <div className="flex items-center space-x-2">
                <button
                  className="w-6 h-6 bg-black rounded-full text-white"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeChild()
                  }}
                >
                  -
                </button>
                <span className="text-black">{children}</span>
                <button
                  className="w-6 h-6 bg-black rounded-full text-white"
                  onClick={(e) => {
                    e.stopPropagation()
                    addChild()
                  }}
                >
                  +
                </button>
              </div>
            </div>
            {children > 0 && (
              <div className="space-y-2">
                {childAges.map((age, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between mb-2"
                  >
                    <h3 className="text-sm text-black">
                      {t('Child')} {index + 1} {t('Age')}
                    </h3>
                    <input
                      type="number"
                      min="0"
                      max={'17'}
                      value={age}
                      placeholder="0 - 17"
                      onChange={(e) =>
                        updateChildAge(index, parseInt(e.target.value))
                      }
                      className="px-2 py-1 border border-gray-300 rounded-md w-full text-black text-sm"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <button
        disabled={isLoading}
        className="flex items-center gap-2 px-12 py-3 bg-primary text-white rounded-lg hover:bg-second transition-all duration-200 text-md"
        onClick={handleSearch}
      >
        {t('Search')}
        {isLoading && (
          <span className="animate-spin">
            <FaCircleNotch />
          </span>
        )}
      </button>
    </div>
  )
}
