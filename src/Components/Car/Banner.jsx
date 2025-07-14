import { FaLocationDot } from 'react-icons/fa6'
import { AiOutlineCalendar } from 'react-icons/ai'
import { FaUserFriends } from 'react-icons/fa'
import bannerCar from '../../assets/Img/car.png'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useState, useRef, useEffect } from 'react'
import { LuPackageCheck } from 'react-icons/lu'
import { message, Select } from 'antd'
import {
  useCarLocationQuery,
  useCarReservationMutation,
} from '../../app/Feature/API/Car'
import { useTranslation } from 'react-i18next'

const { Option } = Select

const Banner = () => {
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [trip_type, setTrip_type] = useState('accommodation')
  const [pickup_location, setPickup_location] = useState(null)
  const [arrival_location, setArrival_location] = useState(null)
  const [rooms, setRooms] = useState(1)
  const [guests, setGuests] = useState(1)
  const [childrens, setChildrens] = useState(0)
  const [childAges, setChildAges] = useState([])
  const [showSelector, setShowSelector] = useState(false)
  const [carType, setCarType] = useState('')
  const [saveCarReservation] = useCarReservationMutation()
  const { data: locastionCar } = useCarLocationQuery()
  const {t} = useTranslation()
  const selectorRef = useRef(null)
  const closeButtonRef = useRef(null)

  const [activeTab, setActiveTab] = useState(1)



  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        selectorRef.current &&
        !selectorRef.current.contains(event.target) &&
        (!closeButtonRef.current ||
          !closeButtonRef.current.contains(event.target))
      ) {
        setShowSelector(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const addChild = () => {
    const newChild = { child: childrens + 1, age: 0 }
    setChildrens(childrens + 1)
    setChildAges([...childAges, newChild])
  }

  const removeChild = () => {
    if (childrens > 0) {
      setChildrens(childrens - 1)
      setChildAges(childAges.slice(0, -1))
    }
  }

  const updateChildAge = (index, age) => {
    const newAges = [...childAges]
    newAges[index] = { child: index + 1, age: age || 0 }
    setChildAges(newAges)
  }

  const handleClickInsideSelector = (event) => {
    event.stopPropagation()
  }

  const handleSubmit = async () => {
    if (
      !startDate ||
      !trip_type ||
      !rooms ||
      !guests ||
      !carType ||
      (trip_type === 'accommodation' && !arrival_location) ||
      (trip_type === 'recreational' && !endDate) ||
      (trip_type === 'recreational' && !pickup_location)
    ) {
      message.warning(t('Please fill in all required fields.'))
      return
    }

    const departing = new Date(startDate)
    const returning = new Date(endDate)

    if (trip_type === 'recreational') {
      if (returning < departing) {
        message.warning(
          t('The returning field must be a date after or equal to departing.')
        )
        return
      }

      const timeDifference = returning - departing
      const fiveHoursInMillis = 5 * 60 * 60 * 1000
      if (timeDifference < fiveHoursInMillis) {
        message.warning(
          t('The returning time must be at least 5 hours after the departing time.')
        )
        return
      }
    }

    
    

    const data = {
      departing: departing.toISOString().slice(0, 16).replace('T', ' '),
      returning: returning.toISOString().slice(0, 16).replace('T', ' '),
      trip_type,
      arrival_location,
      packages: rooms,
      adults: guests,
      childrens,
      childAges,
      additional_notes: 'n',
      car_type: carType,
      pickup_location,
    }

    const res = await saveCarReservation(data)
    if (res.error) {
      message.error('Failed to book car reservation. Please try again later.')
    } else {
      message.success(t('The operation was completed successfully'))
      localStorage.setItem('carReservation', JSON.stringify(res?.data))
      localStorage.setItem('CarReserveData', JSON.stringify(data))
      setPickup_location('')
      setArrival_location('')
      setStartDate(null)
      setEndDate(null)
      setTrip_type('accommodation')
      setRooms(1)
      setGuests(1)
      setChildrens(0)
      setChildAges([])
      setCarType('')
      window.location.reload()
    }
  }

  return (
    <div
      className="relative h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bannerCar})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <section className="relative h-full flex flex-col items-center justify-center text-center py-12 px-4">
        <div className="relative z-10 text-white max-w-6xl mx-auto">
          <p className="text-3xl md:text-4xl font-bold mb-10">
            {t('Search for the Best Rental Car Deals')}
          </p>
          <div className="flex gap-4 justify-center sm:flex-row flex-col mb-10">
            <button
              onClick={() => {
                setActiveTab(1)
                setTrip_type('accommodation')
              }}
              className={`px-6 py-2 
    ${activeTab === 1 ? 'bg-primary text-white' : 'bg-transparent text-white'} 
    border-primary border rounded-lg 
    hover:bg-second transition-all duration-200`}
            >
             {t(' Accommodation trips')}
            </button>

            <button
              onClick={() => {
                setActiveTab(2)
                setTrip_type('recreational')
              }}
              className={`px-6 py-2 ${activeTab === 2 ? 'bg-primary' : 'bg-transparent'} border-primary border text-white rounded-lg hover:bg-second transition-all duration-200`}
            >
              {t('Recreational trips')}
            </button>
          </div>
          <div className="flex flex-col items-center xl:flex-row space-y-4 xl:space-y-0 xl:space-x-4 bg-white px-4 py-1 rounded-lg shadow-lg lg:min-w-[980px] ">
            <div className="relative flex items-center rounded-lg w-full p-2">
              <FaLocationDot
                className="text-gray-800 mr-2 text-2xl"
                size={20}
              />
              <div className="border-r w-full">
                <Select
                  showSearch
                  placeholder={t("Pickup your location")}
                  optionFilterProp="children"
                  onChange={(value) => setPickup_location(value)}
                  className="px-2 py-1 xl:min-w-[140px] w-full border-none rounded-lg focus:outline-none text-black text-sm"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().includes(input.toLowerCase())
                  }
                >
                  {locastionCar?.Locations?.pickupLocation?.map((e) => (
                    <Option key={e?.id} value={e?.type}>
                      {e?.name}
                    </Option>
                  ))}
                </Select>
              </div>
              {activeTab === 1 && (
                <div className="w-full">
                  <div className="border-r w-full">
                    <Select
                      showSearch
                      placeholder={t("Arrival location")}
                      optionFilterProp="children"
                      onChange={(value) => setArrival_location(value)}
                      className="px-2 py-3 w-full w-full border-none rounded-lg focus:outline-none text-black text-sm"
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                    >
                      {locastionCar?.Locations?.arrivalLocation?.map((e) => (
                        <Option key={e?.id} value={e?.type}>
                          {e?.name}
                        </Option>
                      ))}
                    </Select>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center xl:min-w-[280px] w-full border border-gray-300 rounded-lg px-2 py-1">
              <AiOutlineCalendar className="text-gray-800 mr-2" size={20} />
              <div className="flex items-center space-x-0 w-full">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  placeholderText={t("Pickup")}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="MMM dd h:mm aa"
                  className=" w-full text-black text-sm focus:outline-none"
                />
                -
                {activeTab === 2 && (
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    placeholderText={t("Pickup")}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="MMM dd h:mm aa"
                    className="px-2 py-1 w-full text-black text-sm focus:outline-none"
                  />
                )}
              </div>
            </div>
            <div
              className="relative flex items-center text-nowrap xl:max-w-[220px] w-full border border-gray-300 rounded-lg px-2 py-2 cursor-pointer"
              onClick={() => setShowSelector(!showSelector)}
            >
              <LuPackageCheck className="text-gray-800 mr-2" size={20} />
              <span className="text-black text-sm">
                {rooms} {t('Package')}{rooms > 1 ? 's' : ''}
              </span>
              <FaUserFriends className="text-gray-800 ml-4 mr-2" size={20} />
              <span className="text-black text-sm">
                {guests} {t('Guest')}{guests > 1 ? 's' : ''}
              </span>
              {showSelector && (
                <div
                  ref={selectorRef}
                  className="absolute top-full mt-2 bg-white border border-gray-300 w-[230px] shadow-lg p-4 rounded-lg z-20"
                  onClick={handleClickInsideSelector}
                >
                  <div className="mb-4 flex items-center justify-between border-b pb-1">
                    <h3 className="text-sm text-black mb-2">{t('Package')}</h3>
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
                  </div>
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
                      <span className="text-black">{childrens}</span>
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
                  {childrens > 0 && (
                    <div className="space-y-2">
                      {childAges.map((child, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between mb-2 gap-4"
                        >
                          <h3 className="text-sm text-black">
                            {t('Child')} {index + 1} {t('Age')}
                          </h3>
                          <input
                            type="number"
                            value={child.age}
                            min={0}
                            max={18}
                            className="border rounded w-16 text-center text-black"
                            onChange={(e) =>
                              updateChildAge(
                                index,
                                parseInt(e.target.value, 10)
                              )
                            }
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="w-full">
              <select
                className="flex items-center w-full xl:min-w-[120px] w-full border border-gray-300 rounded-lg text-black px-2 py-[6px]"
                value={carType}
                onChange={(e) => setCarType(e.target.value)}
              >
                <option value="" disabled>
                  {t('Car Type')}
                </option>
                <option value="business">{t('Business')}</option>
                <option value="normal">{t('Normal')}</option>
              </select>
            </div>
            <button
              onClick={handleSubmit}
              className="px-5 py-2 bg-primary text-gray-100 rounded-lg hover:bg-second w-full transition-all duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {t('Search')}
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Banner
