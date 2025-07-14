import { useState } from 'react'
import { Modal, Button, Checkbox, Slider, Select } from 'antd'
import { FaTrain } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useRailway } from '../../context/railwayContext'
import dayjs from 'dayjs'

const { Option } = Select

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

const ResultTrain = () => {
  const { railway } = useRailway()

  const trains = railway?.data?.Trains

  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isSortOpen, setIsSortOpen] = useState(false)
  const [checkedBaggage, setCheckedBaggage] = useState(false)
  const [connectionTime, setConnectionTime] = useState(10)
  const [travelTime, setTravelTime] = useState(20)
  const [selectedAirlines, setSelectedAirlines] = useState([])
  const [selectedAirports, setSelectedAirports] = useState([])
  const [traindata, settraindata] = useState([])

  function groupCarGroupsByCarType(carGroups) {
    const result = {}

    for (const car of carGroups) {
      const type = car.CarType

      if (!result[type]) {
        result[type] = {
          CarType: car.CarType,
          CarTypeName: car.CarTypeName,
          MinPrice: car.MinPrice,
          MaxPrice: car.MaxPrice,
          TotalPlaceQuantity: car.TotalPlaceQuantity || 0,
          Carriers: new Set(car.Carriers),
          ServiceClasses: new Set(car.ServiceClasses),
        }
      } else {
        result[type].MinPrice = Math.min(result[type].MinPrice, car.MinPrice)
        result[type].MaxPrice = Math.max(result[type].MaxPrice, car.MaxPrice)
        result[type].TotalPlaceQuantity += car.TotalPlaceQuantity || 0

        car.Carriers.forEach((c) => result[type].Carriers.add(c))
        car.ServiceClasses.forEach((s) => result[type].ServiceClasses.add(s))
      }
    }

    // Convert Sets to Arrays
    return Object.values(result).map((group) => ({
      ...group,
      Carriers: Array.from(group.Carriers),
      ServiceClasses: Array.from(group.ServiceClasses),
    }))
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

  if (trains?.CarGroups) {
    trains?.map((train, i) => {
      groupByCarType(train.CarGroups)
      settraindata((prev) => [...prev, groupByCarType(train.CarGroups)])
    })
  }
  return (
    <div className="bg-white pt-[350px] px-8 md:pt-[150px]">
      <div className="max-w-6xl mx-auto">
        {/* <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
          <div className="flex items-center gap-2 md:gap-4">
            <button
              className="bg-orange-500 text-white px-4 py-2 rounded"
              onClick={() => setIsFilterOpen(true)}
            >
              Filter
            </button>
            <button
              className="bg-red-100 text-red-500 px-4 py-2 rounded"
              onClick={() => setIsSortOpen(true)}
            >
              Sorting
            </button>
          </div>
          <div className="flex flex-wrap justify-center space-x-1 bg-gray-100 p-2 rounded-lg shadow-md overflow-x-auto">
            {dates.map((item, index) => (
              <button
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={`px-4 py-2 text-center border rounded-md text-sm font-semibold 
                  ${selectedIndex === index ? 'border-orange-500 border-b-4 bg-white' : 'bg-gray-100'}`}
              >
                <div>{item.price}</div>
                <div className="text-gray-500 text-xs">{item.date}</div>
              </button>
            ))}
          </div>
        </div> */}

        {!railway?.isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {trains?.map((train, i) => (
              <div
                key={i}
                className="border rounded-lg p-4 shadow-lg mb-12 bg-white flex flex-col"
              >
                <div className="flex justify-between items-center border-b pb-2 mb-2">
                  <h3 className="font-bold text-lg">
                    {train?.TrainName || train?.TrainNumber}
                  </h3>
                  {/* <span className="text-blue-500 text-sm font-semibold">
                    0 ★ <span className="text-gray-500">(0 Review)</span>
                  </span> */}
                </div>

                <div className="flex justify-between items-center text-gray-700 text-sm mb-2">
                  <span className="font-semibold text-lg">
                    {dayjs(train?.LocalDepartureDateTime).format('hh:mm A')}
                  </span>
                  <div className="flex items-center">
                    <hr className="border-gray-400 w-12 mx-2" />
                    <FaTrain className="text-gray-600 text-xl" />
                    <hr className="border-gray-400 w-12 mx-2" />
                  </div>
                  <span className="font-semibold text-lg">
                    {dayjs(train?.LocalArrivalDateTime).format('hh:mm a')}
                  </span>
                </div>

                <div className="text-center text-gray-500 text-sm mb-3">
                  Duration : {formatDuration(train?.TripDuration)}
                </div>

                <div className="text-gray-700 text-sm mb-3">
                  <h4 className="font-semibold mb-1">Available seats:</h4>
                  {groupCarGroupsByCarType(train.CarGroups).map(
                    (seat, index) => (
                      <div key={index} className="flex justify-between">
                        <span>
                          {seat?.CarType} {seat?.TotalPlaceQuantity || 0} seats
                        </span>
                        <span>
                          - from <strong>{seat?.MinPrice} ₽</strong>
                        </span>
                      </div>
                    )
                  )}
                </div>

                <div className="flex justify-between items-center mt-3">
                  <span className="text-orange-500 font-bold text-lg">
                    {Math.min(...train.CarGroups.map((car) => car.MinPrice))} ₽
                  </span>
                  <Link
                    to={`/train-details/${train?.TrainNumber}?departure=${train.LocalDepartureDateTime}&provider=${train.Provider}&originCode=${railway.data.OriginCode}&destinationCode=${railway.data.DestinationCode}`}
                    className="flex items-center gap-2 px-12 py-3 bg-primary text-white rounded-lg hover:bg-second transition-all duration-200 text-md"
                  >
                    Choose Train
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center">
            <h1 className="p-12 font-bold text-lg">Loading...</h1>
          </div>
        )}
        {railway.isError && (
          <div className="text-center">
            <h1 className="p-12 font-bold text-lg">{railway.errorMsg}</h1>
          </div>
        )}
      </div>

      {/* Filter Modal */}
      <Modal
        title="Filter Options"
        open={isFilterOpen}
        onCancel={() => setIsFilterOpen(false)}
        footer={[
          <Button
            key="clear"
            onClick={() => {
              setCheckedBaggage(false)
              setConnectionTime(10)
              setTravelTime(20)
              setSelectedAirlines([])
              setSelectedAirports([])
            }}
          >
            Clear
          </Button>,
          <Button
            key="apply"
            type="primary"
            onClick={() => setIsFilterOpen(false)}
          >
            Apply
          </Button>,
        ]}
      >
        {/* Checked Baggage */}
        <div className="flex items-center justify-between mb-4">
          <span>Checked bags included</span>
          <Checkbox
            checked={checkedBaggage}
            onChange={(e) => setCheckedBaggage(e.target.checked)}
          />
        </div>

        {/* Connections */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Connections</h3>
          <div className="flex gap-2">
            <Button className="border px-3 py-1 rounded bg-gray-100">
              Non-stop
            </Button>
            <Button className="border px-3 py-1 rounded bg-gray-100">
              1 Connection
            </Button>
            <Button className="border px-3 py-1 rounded bg-gray-100">
              2+ Connections
            </Button>
          </div>
        </div>

        {/* Airlines */}
        <div className="mb-4">
          <label className="block mb-2">Airline</label>
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="Select Airlines"
            value={selectedAirlines}
            onChange={setSelectedAirlines}
          >
            <Option value="EgyptAir">EgyptAir</Option>
            <Option value="Emirates">Emirates</Option>
            <Option value="QatarAir">Qatar Air</Option>
          </Select>
        </div>

        {/* Connection Time Slider */}
        <div className="mb-4">
          <label className="block mb-2">Connection Time</label>
          <Slider
            min={0}
            max={32}
            value={connectionTime}
            onChange={setConnectionTime}
          />
        </div>

        {/* Travel Time Slider */}
        <div className="mb-4">
          <label className="block mb-2">Travel Time</label>
          <Slider
            min={0}
            max={42}
            value={travelTime}
            onChange={setTravelTime}
          />
        </div>

        {/* Connection Airports */}
        <div className="mb-4">
          <label className="block mb-2">Connection Airports</label>
          <Select
            mode="multiple"
            style={{ width: '100%' }}
            placeholder="Select Airports"
            value={selectedAirports}
            onChange={setSelectedAirports}
          >
            <Option value="Abu Dhabi">Abu Dhabi</Option>
            <Option value="Amman">Amman</Option>
            <Option value="Beirut">Beirut</Option>
          </Select>
        </div>
      </Modal>

      {/* نافذة الفرز */}
      <Modal
        title="Sort Options"
        visible={isSortOpen}
        onCancel={() => setIsSortOpen(false)}
        footer={[
          <Button key="clear" onClick={() => setIsSortOpen(false)}>
            Clear
          </Button>,
          <Button
            key="apply"
            type="primary"
            onClick={() => setIsSortOpen(false)}
          >
            Apply
          </Button>,
        ]}
      >
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Sort By</h3>
          <div className="flex flex-col gap-2">
            <Button className="border px-3 py-2 rounded bg-gray-100 text-left">
              Price (Low to High)
            </Button>
            <Button className="border px-3 py-2 rounded bg-gray-100 text-left">
              Price (High to Low)
            </Button>
            <Button className="border px-3 py-2 rounded bg-gray-100 text-left">
              Departure Time (Earliest)
            </Button>
            <Button className="border px-3 py-2 rounded bg-gray-100 text-left">
              Departure Time (Latest)
            </Button>
            <Button className="border px-3 py-2 rounded bg-gray-100 text-left">
              Duration (Shortest)
            </Button>
            <Button className="border px-3 py-2 rounded bg-gray-100 text-left">
              Duration (Longest)
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default ResultTrain
