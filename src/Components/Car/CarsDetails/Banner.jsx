import { FaLocationDot } from 'react-icons/fa6'
import { AiOutlineCalendar } from 'react-icons/ai'
import { FaUserFriends } from 'react-icons/fa'
import bannerCar from '../../../assets/Img/RentalCar.jpg'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useState, useRef, useEffect } from 'react'
import { LuPackageCheck } from 'react-icons/lu'

const Banner = () => {
  const [startDate, setStartDate] = useState(null)
  const [rooms, setRooms] = useState(1)
  const [guests, setGuests] = useState(1)
  const [children, setChildren] = useState(0)
  const [childAges, setChildAges] = useState([])
  const [showSelector, setShowSelector] = useState(false)
  const [isInputFocused, setIsInputFocused] = useState(false)
  const selectorRef = useRef(null)
  const closeButtonRef = useRef(null)

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
    setChildren(children + 1)
    setChildAges([...childAges, 0])
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

  const handleInputFocus = () => {
    setIsInputFocused(true)
  }

  const handleInputBlur = () => {
    setIsInputFocused(false)
  }

  return (
    <div
      className="relative h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bannerCar})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <section className="relative h-full flex flex-col items-center justify-center text-center py-12 px-4">
        <div className="relative z-10 text-white max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-10">
            Moscow Airport Rental Cars
          </h1>
          <div className="flex flex-col items-center md:flex-row space-y-4 md:space-y-0 md:space-x-4 bg-white px-4 py-1 rounded-lg shadow-lg">
            <div className="relative flex items-center rounded-lg w-full p-2">
              <FaLocationDot className="text-gray-800 mr-2" size={20} />
              <div className="border-r">
                <input
                  type="text"
                  placeholder="Pickup your location"
                  className="px-2 py-1 md:max-w-[160px] w-full border-none rounded-lg focus:outline-none text-black text-sm"
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Arrival location"
                  className="px-2 py-1 md:max-w-[160px] w-full border-none rounded-lg focus:outline-none text-black text-sm"
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                />
              </div>
              {isInputFocused && (
                <div
                  className="absolute top-full mt-2 bg-white border border-gray-300 md:max-w-[160px] shadow-lg p-4 rounded-lg z-20"
                  ref={selectorRef}
                  onClick={handleClickInsideSelector}
                >
                  <p className="text-black">
                    Search suggestions or other content here.
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center md:max-w-[160px] w-full border border-gray-300 rounded-lg px-2 py-1">
              <AiOutlineCalendar className="text-gray-800 mr-2" size={20} />
              <div className="flex items-center space-x-2 w-full">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  placeholderText="Pickup"
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  dateFormat="MMM dd h:mm aa"
                  className="px-2 py-1 w-full text-black text-sm focus:outline-none"
                />
              </div>
            </div>
            <div
              className="relative flex items-center md:max-w-[220px] w-full border border-gray-300 rounded-lg px-2 py-2 cursor-pointer"
              onClick={() => setShowSelector(!showSelector)}
            >
              <LuPackageCheck className="text-gray-800 mr-2" size={20} />
              <span className="text-black text-sm">
                {rooms} Package{rooms > 1 ? 's' : ''}
              </span>
              <FaUserFriends className="text-gray-800 ml-4 mr-2" size={20} />
              <span className="text-black text-sm">
                {guests} Guest{guests > 1 ? 's' : ''}
              </span>
              {showSelector && (
                <div
                  ref={selectorRef}
                  className="absolute top-full mt-2 bg-white border border-gray-300 w-[230px] shadow-lg p-4 rounded-lg z-20"
                  onClick={handleClickInsideSelector}
                >
                  <div className="mb-4 flex items-center justify-between border-b pb-1">
                    <h3 className="text-sm text-black mb-2">Packages</h3>
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
                    <h3 className="text-sm text-black mb-2">Adults</h3>
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
                    <h3 className="text-sm text-black mb-2">Children</h3>
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
                            Child {index + 1} Age
                          </h3>
                          <input
                            type="number"
                            min="0"
                            value={age}
                            placeholder="0 - 17"
                            onChange={(e) =>
                              updateChildAge(index, parseInt(e.target.value))
                            }
                            className="px-2 py-1 w-[75px] border border-gray-300 rounded-md w-full text-black text-sm"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
            <button className="px-5 py-2 bg-primary text-white rounded-lg hover:bg-second transition-all duration-200 text-sm">
              Search
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Banner
