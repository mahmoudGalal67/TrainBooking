import { useState } from "react";
import { Modal, Button, Checkbox, Slider, Select } from "antd";
import { RiFlightTakeoffLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
const { Option } = Select;
const trips = [
  {
    id: 1,
    airline: "AJet",
    rating: 4.5,
    time: "10:30 AM",
    duration: "3h",
    from: "Cairo (CAI)",
    to: "Dubai (DXB)",
    baggage: [
      { type: "Cabin Bag", included: true },
      { type: "Checked Bag", included: false },
    ],
    price: "$250",
    seatsLeft: 5,
  },
  {
    id: 1,
    airline: "AJet",
    rating: 4.5,
    time: "10:30 AM",
    duration: "3h",
    from: "Cairo (CAI)",
    to: "Dubai (DXB)",
    baggage: [
      { type: "Cabin Bag", included: true },
      { type: "Checked Bag", included: false },
    ],
    price: "$250",
    seatsLeft: 5,
  },  {
    id: 1,
    airline: "AJet",
    rating: 4.5,
    time: "10:30 AM",
    duration: "3h",
    from: "Cairo (CAI)",
    to: "Dubai (DXB)",
    baggage: [
      { type: "Cabin Bag", included: true },
      { type: "Checked Bag", included: false },
    ],
    price: "$250",
    seatsLeft: 5,
  },  {
    id: 1,
    airline: "AJet",
    rating: 4.5,
    time: "10:30 AM",
    duration: "3h",
    from: "Cairo (CAI)",
    to: "Dubai (DXB)",
    baggage: [
      { type: "Cabin Bag", included: true },
      { type: "Checked Bag", included: false },
    ],
    price: "$250",
    seatsLeft: 5,
  },  {
    id: 1,
    airline: "AJet",
    rating: 4.5,
    time: "10:30 AM",
    duration: "3h",
    from: "Cairo (CAI)",
    to: "Dubai (DXB)",
    baggage: [
      { type: "Cabin Bag", included: true },
      { type: "Checked Bag", included: false },
    ],
    price: "$250",
    seatsLeft: 5,
  },  {
    id: 1,
    airline: "AJet",
    rating: 4.5,
    time: "10:30 AM",
    duration: "3h",
    from: "Cairo (CAI)",
    to: "Dubai (DXB)",
    baggage: [
      { type: "Cabin Bag", included: true },
      { type: "Checked Bag", included: false },
    ],
    price: "$250",
    seatsLeft: 5,
  },
];


const ResultTrain = () => {
  const navigate = useNavigate()
    
    const handleNavigate=(name)=>{
      navigate(`/flight-details/${name}`)
    }
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [checkedBaggage, setCheckedBaggage] = useState(false);
  const [connectionTime, setConnectionTime] = useState(10);
  const [travelTime, setTravelTime] = useState(20);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedAirlines, setSelectedAirlines] = useState([]);
  const [selectedAirports, setSelectedAirports] = useState([]);
  
  const dates = Array.from({ length: 6 }, () => ({
    price: "153 EGP",
    date: "Sat, Mar 8",
  }));
  return (
    <div className="bg-white pt-[350px] px-8 md:pt-[150px]">
      <div className="max-w-6xl mx-auto">
      <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
          <div className="flex items-center gap-2 md:gap-4">
            <button className="bg-orange-500 text-white px-4 py-2 rounded" onClick={() => setIsFilterOpen(true)}>Filter</button>
            <button className="bg-red-100 text-red-500 px-4 py-2 rounded" onClick={() => setIsSortOpen(true)}>Sorting</button>
          </div>
          <div className="flex flex-wrap justify-center space-x-1 bg-gray-100 p-2 rounded-lg shadow-md overflow-x-auto">
            {dates.map((item, index) => (
              <button
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={`px-4 py-2 text-center border rounded-md text-sm font-semibold 
                  ${selectedIndex === index ? "border-orange-500 border-b-4 bg-white" : "bg-gray-100"}`}
              >
                <div>{item.price}</div>
                <div className="text-gray-500 text-xs">{item.date}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12">
        {trips.map((trip) => (
        <div key={trip.id} className="border rounded-lg p-4 shadow-lg bg-white flex flex-col">
          <div className="flex justify-between items-center border-b pb-2 mb-2">
            <h3 className="font-bold text-lg">AJet</h3>
            <span className="text-blue-500 text-sm font-semibold">{trip.rating} ★</span>
          </div>
          <div className="flex justify-between items-center text-gray-700 text-sm mb-2">
            <span className="font-semibold text-lg">{trip.time}</span>
            <div className="flex items-center">
              <hr className="border-gray-400 w-12 mx-2" />
              <RiFlightTakeoffLine className="text-gray-600" />
              <hr className="border-gray-400 w-12 mx-2" />
            </div>
            <span className="font-semibold text-lg">{trip.duration}</span>
          </div>
          <div className="flex justify-between text-gray-500 text-sm mb-3">
            <span>{trip.from}</span>
            <span className="text-xs">3h duration</span>
            <span>{trip.to}</span>
          </div>
          <div className="text-gray-700 text-sm mb-3">
            {trip?.baggage?.map((bag, index) => (
              <div key={index} className="flex justify-between">
                <span>{bag.type}</span>
                <span>{bag.included ? "Included" : "Not included"}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center">
            <span className="text-orange-500 font-bold text-lg">{trip.price}</span>
          </div>
          <div className="flex justify-between items-center mt-3">
            <span className="bg-red-100 text-red-600 px-3 py-1 rounded text-xs font-semibold">
              {trip.seatsLeft} Seats Left
            </span>
            <Button type="primary" className="w-full md:w-auto" onClick={()=>handleNavigate(trip.name || 'AJet')}>
              Choose Trip
            </Button>
          </div>
        </div>
      ))}
        </div>
        <div className="flex justify-center space-x-2 mt-12 pb-8">
          <button className="px-3 py-1 border rounded">&lt;</button>
          <button className="px-3 py-1 bg-orange-500 text-white rounded">4</button>
          <button className="px-3 py-1 border rounded">3</button>
          <button className="px-3 py-1 border rounded">2</button>
          <button className="px-3 py-1 border rounded">1</button>
          <button className="px-3 py-1 border rounded">&gt;</button>
        </div>
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
            setCheckedBaggage(false);
            setConnectionTime(10);
            setTravelTime(20);
            setSelectedAirlines([]);
            setSelectedAirports([]);
          }}
        >
          Clear
        </Button>,
        <Button key="apply" type="primary" onClick={() => setIsFilterOpen(false)}>
          Apply
        </Button>,
      ]}
    >
      {/* Checked Baggage */}
      <div className="flex items-center justify-between mb-4">
        <span>Checked bags included</span>
        <Checkbox checked={checkedBaggage} onChange={(e) => setCheckedBaggage(e.target.checked)} />
      </div>

      {/* Connections */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Connections</h3>
        <div className="flex gap-2">
          <Button className="border px-3 py-1 rounded bg-gray-100">Non-stop</Button>
          <Button className="border px-3 py-1 rounded bg-gray-100">1 Connection</Button>
          <Button className="border px-3 py-1 rounded bg-gray-100">2+ Connections</Button>
        </div>
      </div>

      {/* Airlines */}
      <div className="mb-4">
        <label className="block mb-2">Airline</label>
        <Select
          mode="multiple"
          style={{ width: "100%" }}
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
        <Slider min={0} max={32} value={connectionTime} onChange={setConnectionTime} />
      </div>

      {/* Travel Time Slider */}
      <div className="mb-4">
        <label className="block mb-2">Travel Time</label>
        <Slider min={0} max={42} value={travelTime} onChange={setTravelTime} />
      </div>

      {/* Connection Airports */}
      <div className="mb-4">
        <label className="block mb-2">Connection Airports</label>
        <Select
          mode="multiple"
          style={{ width: "100%" }}
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
          <Button key="apply" type="primary" onClick={() => setIsSortOpen(false)}>
            Apply
          </Button>,
        ]}
      >
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Sort By</h3>
          <div className="flex flex-col gap-2">
            <Button className="border px-3 py-2 rounded bg-gray-100 text-left">Price (Low to High)</Button>
            <Button className="border px-3 py-2 rounded bg-gray-100 text-left">Price (High to Low)</Button>
            <Button className="border px-3 py-2 rounded bg-gray-100 text-left">Departure Time (Earliest)</Button>
            <Button className="border px-3 py-2 rounded bg-gray-100 text-left">Departure Time (Latest)</Button>
            <Button className="border px-3 py-2 rounded bg-gray-100 text-left">Duration (Shortest)</Button>
            <Button className="border px-3 py-2 rounded bg-gray-100 text-left">Duration (Longest)</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ResultTrain;