import { AiOutlineCalendar } from 'react-icons/ai'
import bannerTrain from '../../assets/Img/bannerTrain.png'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useState, useMemo, useRef } from 'react'
import { Radio, Select } from 'antd'
import { FaLocationDot } from 'react-icons/fa6'
import { FaBed, FaCircleNotch, FaUserFriends } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'

import {
  useRailwaySearchMutation,
  useTransportNodesQuery,
} from '../../app/Feature/API/Train'
import { useRailway } from '../../context/railwayContext'

const BannerTrain = () => {
  const [selectedDateTime, setSelectedDateTime] = useState(null)
  const [tripType, setTripType] = useState('one-way')
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [selectFrom, setSelectFrom] = useState(null)
  const [selectTo, setSelectTo] = useState(null)
  //child
  const [showSelector, setShowSelector] = useState(false)
  const selectorRef = useRef(null)
  const { t } = useTranslation()

  const handleClickInsideSelector = (event) => {
    event.stopPropagation()
  }
  const [guests, setGuests] = useState(1)
  const [children, setChildren] = useState(0)
  // const [childAges, setChildAges] = useState([])
  const { data: transport, isLoading } = useTransportNodesQuery(undefined, {
    refetchOnMountOrArgChange: false,
    refetchOnReconnect: false,
    refetchOnFocus: false,
  })
  const addChild = () => {
    if (children >= 9) return
    setChildren(children + 1)
    // setChildAges([...childAges, 3])
  }

  const removeChild = () => {
    if (children > 0) {
      setChildren(children - 1)
      // setChildAges(childAges.slice(0, -1))
    }
  }

  //child

  const [railwayFn, { isLoading: isRailwayLoading }] =
    useRailwaySearchMutation()
  const { setRailway } = useRailway()

  const transportNodes = transport?.TransportNodes || []
  const filteredFrom = useMemo(() => {
    return from
      ? transportNodes.filter((item) =>
          item?.NameEn?.toLowerCase().includes(from.toLowerCase())
        )
      : transportNodes
  }, [from, transportNodes])

  const filteredTo = useMemo(() => {
    return to
      ? transportNodes.filter((item) =>
          item?.NameEn?.toLowerCase().includes(to.toLowerCase())
        )
      : transportNodes
  }, [to, transportNodes])

  const handleSearch = async () => {
    if (!selectFrom || !selectTo || !selectedDateTime) return
    setRailway({ isLoading: true })
    try {
      const res = await railwayFn({
        Origin: selectFrom.Code,
        Destination: selectTo.Code,
        DepartureDate: selectedDateTime,
      }).unwrap()
      setRailway({ data: res })
      if (!JSON.parse(localStorage.getItem('lastUpdated'))) {
        localStorage.setItem('lastUpdated', JSON.stringify(new Date()))
      }
      localStorage.setItem(
        'Guests',
        JSON.stringify({ adults: guests, children })
      )
    } catch (error) {
      setRailway({
        isLoading: false,
        isError: true,
        errorMsg: error.data.details.Message,
      })
    }
  }
  return (
    <div
      className="relative h-[80vh] bg-cover bg-center"
      style={{ backgroundImage: `url(${bannerTrain})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50" />
      <section className="relative h-full flex flex-col items-center justify-center text-center py-12 px-4">
        <div className="relative z-10 text-white min-w-full max-w-8xl mx-auto">
          <h1 className="text-3xl md:text-6xl font-bold mt-16">
            Search for the Best <br /> Rental Car Deals
          </h1>

          <div className="relative top-[60%] flex flex-col items-center md:flex-row space-y-4 md:space-y-0 md:space-x-4 bg-white px-4 py-1 rounded-lg shadow-lg">
            <div className="pt-4 pb-4 w-full">
              <div className="text-start mb-4">
                <Radio.Group
                  value={tripType}
                  onChange={(e) => setTripType(e.target.value)}
                >
                  <Radio value="one-way">One Way</Radio>
                  <Radio value="round-trip">Round Trip</Radio>
                </Radio.Group>
              </div>
              <div className="flex flex-col items-center md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                {!isLoading ? (
                  <div className="relative flex gap-1 items-center rounded-lg w-full p-2 bg-gray-200">
                    <FaLocationDot className="text-gray-800 mr-2" size={30} />
                    <Select
                      className="w-full"
                      showSearch
                      placeholder={'From'}
                      optionFilterProp="label"
                      onSearch={(v) => {
                        setFrom(v)
                        setSelectFrom(null)
                      }}
                      onChange={(v) => setSelectFrom(filteredFrom[+v])}
                      filterOption={false}
                      options={filteredFrom.map((item, i) => ({
                        value: i,
                        label: (
                          <div className="flex justify-between cursor-pointer">
                            <h3 className="text-[10px] font-bold">
                              {item?.NameEn}
                            </h3>
                            <h4 className="font-bold text-gray-400 text-[11px] ml-2">
                              {item?.Description}
                            </h4>
                          </div>
                        ),
                      }))}
                    />
                    <Select
                      className="w-full"
                      showSearch
                      placeholder={'To'}
                      optionFilterProp="label"
                      onSearch={(v) => {
                        setTo(v)
                        setSelectTo(null)
                      }}
                      onChange={(v) => setSelectTo(filteredTo[+v])}
                      filterOption={false}
                      options={filteredTo.map((item, i) => ({
                        value: i,
                        label: (
                          <div className="flex justify-between cursor-pointer">
                            <h3 className="text-[10px] font-bold">
                              {item?.NameEn}
                            </h3>
                            <h4 className="font-bold text-gray-400 text-[11px] ml-2">
                              {item?.Description}
                            </h4>
                          </div>
                        ),
                      }))}
                    />
                  </div>
                ) : (
                  <div className="text-black w-full border p-2 rounded-lg">
                    loading...
                  </div>
                )}

                <div className="flex items-center w-full border-gray-300 rounded-lg p-2 bg-gray-200">
                  <AiOutlineCalendar className="text-gray-800 mr-2" size={20} />
                  <DatePicker
                    minDate={new Date()}
                    selected={selectedDateTime}
                    onChange={(date) => setSelectedDateTime(date)}
                    dateFormat="MMM dd, yyyy"
                    placeholderText="select date"
                    className="px-2 py-1 min-w-full text-black text-sm focus:outline-none bg-gray-200"
                  />
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
                  <FaUserFriends
                    className="text-gray-800 ml-4 mr-2"
                    size={20}
                  />
                  <span className="text-black text-sm">
                    {guests + children} {t('Passengers')}
                    {guests + children > 1 ? 's' : ''}
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
                        <h3 className="text-sm text-black mb-2">
                          {t('Adult')}
                        </h3>
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
                        <h3 className="text-sm text-black mb-2">
                          {t('Children')}
                        </h3>
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
                      {/* {children > 0 && (
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
                                  updateChildAge(
                                    index,
                                    parseInt(e.target.value)
                                  )
                                }
                                className="px-2 py-1 border border-gray-300 rounded-md w-full text-black text-sm"
                              />
                            </div>
                          ))}
                        </div>
                      )} */}
                    </div>
                  )}
                </div>
                <button
                  onClick={handleSearch}
                  disabled={isRailwayLoading}
                  className="px-5 py-2 bg-primary text-white rounded-lg hover:bg-second transition-all duration-200 text-sm"
                >
                  {isRailwayLoading ? 'Loading...' : 'Search'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default BannerTrain
