import { AiOutlineCalendar } from 'react-icons/ai'
import { FaRegUser } from 'react-icons/fa'
import bannerHotel from '../../assets/Img/bannerBus.png'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useState, useRef, useEffect } from 'react'
import { Radio } from 'antd'
import { FaLocationDot } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";

const BannerBus = () => {
  const [selectedDateTime, setSelectedDateTime] = useState(null)
  const [rooms, setRooms] = useState(1)
  const [guests, setGuests] = useState(1)
  const [children, setChildren] = useState(0)
  const [childAges, setChildAges] = useState([])
  const [showSelector, setShowSelector] = useState(false)
  const [showSelector2, setShowSelector2] = useState(false)
  const [isInputFocused, setIsInputFocused] = useState(false)
  const selectorRef = useRef(null)
  const selectorRef2 = useRef(null)
  const closeButtonRef = useRef(null)
  const [tripType, setTripType] = useState("one-way");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        selectorRef.current &&
        !selectorRef.current.contains(event.target) &&
        (!closeButtonRef.current ||
          !closeButtonRef.current.contains(event.target)) &&
        (!selectorRef2.current ||
          !selectorRef2.current.contains(event.target))
      ) {
        setShowSelector(false);
        setShowSelector2(false);
        setIsInputFocused(false);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  

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
      className="relative h-[80vh] bg-cover bg-center"
      style={{ backgroundImage: `url(${bannerHotel})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <section className="relative h-full flex flex-col items-center justify-center text-center py-12 px-4">
        <div className="relative z-10 text-white max-w-8xl mx-auto">
          <h1 className="text-3xl md:text-6xl font-bold mt-16">
          Search for the Best <br/> Rental Car Deals
          </h1>
          <div className="relative top-[60%] width-[100%] flex flex-col items-center md:flex-row space-y-4 md:space-y-0 md:space-x-4 bg-white px-4 py-1 rounded-lg shadow-lg">
            <div className='pt-4 pb-4'>
                <div className='text-start mb-4'>
                <div>
      <Radio.Group value={tripType} onChange={(e) => setTripType(e.target.value)}>
        <Radio value="one-way">One Way</Radio>
        <Radio value="round-trip">Round Trip</Radio>
      </Radio.Group>
    </div>
                </div>
                <div className='flex flex-col items-center md:flex-row space-y-4 md:space-y-0 md:space-x-4'>
                    <div className="relative flex items-center rounded-lg w-full p-2 bg-gray-200">
                    <FaLocationDot className="text-gray-800 mr-2" size={30} />
                    <input
                        type="text"
                        placeholder="From"
                        className="px-2 py-1 w-full border-none rounded-lg focus:outline-none text-black text-sm bg-gray-200"
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                    />
                    <input
                        type="text"
                        placeholder="To"
                        className="px-2 py-1 w-full border-none rounded-lg focus:outline-none text-black text-sm bg-gray-200"
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                    />
                    {isInputFocused && (
                        <div
                        className="absolute top-full mt-2 bg-white border border-gray-300 w-full shadow-lg p-4 rounded-lg z-20"
                        ref={selectorRef}
                        onClick={handleClickInsideSelector}
                        >
                        <p className="text-black">
                            Search suggestions or other content here.
                        </p>
                        </div>
                    )}
                    </div>

                    <div className="flex items-center w-full  border-gray-300 rounded-lg p-2 bg-gray-200">
  <AiOutlineCalendar className="text-gray-800 mr-2" size={20} />
  <DatePicker
    selected={selectedDateTime}
    onChange={(date) => setSelectedDateTime(date)}
    showTimeSelect
    dateFormat="MMM dd, yyyy h:mm aa"
    placeholderText="select date and time"
    className="px-2 py-1 w-full text-black text-sm focus:outline-none bg-gray-200"
  />
</div>


                    <div
                    className="relative flex items-center bg-gray-200 rounded-lg w-full p-3 cursor-pointer"
                    onClick={() => setShowSelector(!showSelector)}
                    >
                    <FaRegUser className="text-gray-800 mr-2" size={20} />
                    <span className="text-black text-sm">
                        {rooms} Passengers{rooms > 1 ? 's' : ''}
                    </span>
                    {/* <FaUserFriends className="text-gray-800 ml-4 mr-2" size={20} />
                    <span className="text-black text-sm">
                        {guests} Kids{guests > 1 ? 's' : ''}
                    </span> */}
                    {showSelector && (
                        <div
                        ref={selectorRef}
                        className="absolute top-full mt-2 bg-white border border-gray-300 w-[230px] shadow-lg p-4 rounded-lg z-20"
                        onClick={handleClickInsideSelector}
                        >
                        <div className="mb-4 flex items-center justify-between border-b pb-1">
                            <h3 className="text-sm text-black mb-2">Adults</h3>
                            <div className="flex items-center space-x-2">
                            <button
                                className="w-6 h-6 bg-[#f1510c] rounded-full text-white"
                                onClick={(e) => {
                                e.stopPropagation()
                                setRooms(Math.max(1, rooms - 1))
                                }}
                            >
                                -
                            </button>
                            <span className="text-black">{rooms}</span>
                            <button
                                className="w-6 h-6 bg-[#f1510c] rounded-full text-white"
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
                            <h3 className="text-sm text-black mb-2">Kids</h3>
                            <div className="flex items-center space-x-2">
                            <button
                                className="w-6 h-6 bg-[#f1510c] rounded-full text-white"
                                onClick={(e) => {
                                e.stopPropagation()
                                setGuests(Math.max(1, guests - 1))
                                }}
                            >
                                -
                            </button>
                            <span className="text-black">{guests}</span>
                            <button
                                className="w-6 h-6 bg-[#f1510c] rounded-full text-white"
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
                            <h3 className="text-sm text-black mb-2">Infants</h3>
                            <div className="flex items-center space-x-2">
                            <button
                                className="w-6 h-6 bg-[#f1510c] rounded-full text-white"
                                onClick={(e) => {
                                e.stopPropagation()
                                removeChild()
                                }}
                            >
                                -
                            </button>
                            <span className="text-black">{children}</span>
                            <button
                                className="w-6 h-6 bg-[#f1510c] rounded-full text-white"
                                onClick={(e) => {
                                e.stopPropagation()
                                addChild()
                                }}
                            >
                                +
                            </button>
                            </div>
                        </div>
                        {/* {children > 0 && (
                            <div className="space-y-2">
                            {childAges.map((age, index) => (
                                <div
                                key={index}
                                className="flex items-center justify-between mb-2"
                                >
                                <h3 className="text-sm text-black">
                                Infants {index + 1}
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
                        )} */}
                        </div>
                    )}
                    </div>
                    <div
                    className="relative flex items-center bg-gray-200 rounded-lg w-full p-3 cursor-pointer"
                    onClick={() => setShowSelector2(!showSelector2)}
                    >
                    <FaRegStar className="text-gray-800 mr-2" size={20} />
                    <span className="text-black text-sm">
                        {rooms} Class{rooms > 1 ? 's' : ''}
                    </span>
                    {/* <FaUserFriends className="text-gray-800 ml-4 mr-2" size={20} />
                    <span className="text-black text-sm">
                        {guests} Kids{guests > 1 ? 's' : ''}
                    </span> */}
{showSelector2 && (
  <div
    ref={selectorRef2}
    className="absolute top-full mt-2 bg-white border border-gray-300 w-[230px] shadow-lg p-4 rounded-lg z-20"
    onClick={handleClickInsideSelector}
  >
    <div className="mb-4 flex items-center justify-between border-b pb-1">
      <label className="text-sm text-black">Adults</label>
      <input
        type="checkbox"
        checked={rooms > 0}
        onChange={(e) => setRooms(e.target.checked ? 1 : 0)}
      />
    </div>
    
    <div className="mb-4 flex items-center justify-between border-b pb-1">
      <label className="text-sm text-black">Kids</label>
      <input
        type="checkbox"
        checked={guests > 0}
        onChange={(e) => setGuests(e.target.checked ? 1 : 0)}
      />
    </div>

    <div className="mb-4 flex items-center justify-between">
      <label className="text-sm text-black">Infants</label>
      <input
        type="checkbox"
        checked={children > 0}
        onChange={(e) => (e.target.checked ? addChild() : removeChild())}
      />
    </div>
  </div>
)}

                    </div>
                    <button className="px-5 py-2 bg-primary text-white rounded-lg hover:bg-second transition-all duration-200 text-sm">
                    Book
                    </button>
                </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default BannerBus
