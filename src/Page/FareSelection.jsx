import { RiFlightTakeoffLine } from 'react-icons/ri';
import bannerCar from '../assets/Img/bannerFlights.png';
import { useNavigate } from 'react-router-dom';


const tripData = {
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
  };
  
const FareSelection = () => {
  const navigate = useNavigate()
  
  const handleNavigate=()=>{
    navigate(`/payment-services/flight`)
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
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Fare Selection</h1>
          </div>
        </section>
      </div>
      <div className="bg-gray-100 px-4 md:px-8 pt-12 pb-12 flex flex-col md:flex-row gap-8">
      {/* Left Section */}
      <div className="flex-1 p-6 bg-white shadow-lg rounded-lg ">
        <div key={tripData.id} className="border rounded-lg p-4 shadow-md bg-white">
          <div className="flex justify-between items-center border-b pb-2 mb-2">
            <h3 className="font-bold text-lg">{tripData.airline}</h3>
            <span className="text-blue-500 text-sm font-semibold">{tripData.rating} ★</span>
          </div>
          <div className="flex justify-between items-center text-gray-700 text-sm mb-2">
            <span className="font-semibold text-lg">{tripData.time}</span>
            <div className="flex items-center">
              <hr className="border-gray-400 w-12 mx-2" />
              <RiFlightTakeoffLine className="text-gray-600" />
              <hr className="border-gray-400 w-12 mx-2" />
            </div>
            <span className="font-semibold text-lg">{tripData.duration}</span>
          </div>
          <div className="flex justify-between text-gray-500 text-sm mb-3">
            <span>{tripData.from}</span>
            <span className="text-xs">{tripData.duration} duration</span>
            <span>{tripData.to}</span>
          </div>
          <div className="text-gray-700 text-sm mb-3">
            {tripData.baggage.map((bag, index) => (
              <div key={index} className="flex justify-between">
                <span>{bag.type}</span>
                <span>{bag.included ? "Included" : "Not included"}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center">
            <span className="text-orange-500 font-bold text-lg">{tripData.price}</span>
          </div>
          <div className="flex justify-between items-center mt-3">
            <span className="bg-red-100 text-red-600 px-3 py-1 rounded text-xs font-semibold">
              {tripData.seatsLeft} Seats Left
            </span>
            {/* <Button type="primary" className="w-full md:w-auto">
              Choose Trip
            </Button> */}
          </div>
        </div>
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md mt-6">
      <h2 className="text-lg font-semibold mb-2">Passengers</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium">No. of passengers</label>
        <select className="w-full p-2 border rounded">
          <option>1 adult, 1 child</option>
        </select>
        <p className="text-xs text-gray-500">
          Child, 2 – 11 y.o. +$356.81<br />Infant, under 2 y.o., no seat free of charge
        </p>
      </div>

      {["Adult (over 12 y.o.)", "Child (2 – 11 y.o.)"].map((title, index) => (
        <div key={index} className="mb-6">
          <h3 className="font-semibold text-lg">{title}</h3>
          <div className="grid grid-cols-3 gap-4 mt-2">
            <input type="text" placeholder="First Name" className="border p-2 rounded" />
            <input type="text" placeholder="Middle Name" className="border p-2 rounded" />
            <input type="text" placeholder="Last Name" className="border p-2 rounded" />
            <select className="border p-2 rounded">
              <option>Gender</option>
            </select>
            <input type="date" className="border p-2 rounded" />
            <input type="text" placeholder="Citizenship" className="border p-2 rounded" />
            <input type="text" placeholder="Passport No." className="border p-2 rounded" />
            <input type="date" placeholder="Expiry date" className="border p-2 rounded" />
          </div>
        </div>
      ))}

      <div className="mb-6">
        <h3 className="font-semibold text-lg">Your contact details</h3>
        <p className="text-sm text-gray-500">We will send you the tickets and your booking details</p>
        <div className="grid grid-cols-2 gap-4 mt-2">
          <input type="email" placeholder="Email" className="border p-2 rounded" />
          <input type="text" placeholder="Buyer’s phone number" className="border p-2 rounded" />
        </div>
      </div>
</div>
        <button className="mt-4 w-full bg-orange-500 text-white py-2 rounded-md text-lg font-semibold" onClick={()=>handleNavigate()}>Select</button>
      </div>
      
      {/* Right Section */}
      <div className="flex-1">
        {/* More Details */}
        <div className="p-4 bg-white shadow-md rounded-md">
          <h3 className="text-lg font-semibold">More Details</h3>
          <div className="mt-2 space-y-2">
            <details className="border p-2 rounded-md">
              <summary className="font-medium cursor-pointer">Return conditions</summary>
              <p className="text-gray-500 mt-2">Details about return conditions.</p>
            </details>
            <details className="border p-2 rounded-md">
              <summary className="font-medium cursor-pointer">Baggage Transportation rules</summary>
              <p className="text-gray-500 mt-2">Details about baggage rules.</p>
            </details>
            <details className="border p-2 rounded-md">
              <summary className="font-medium cursor-pointer">Rules for transporting pets</summary>
              <p className="text-gray-500 mt-2">Details about pet transportation.</p>
            </details>
          </div>
        </div>

        {/* Fare Rules */}
        <div className="mt-6 p-4 bg-white shadow-md rounded-md">
          <h3 className="text-lg font-semibold">Fare Rules</h3>
          <div className="mt-2">
            <p className="flex justify-between border-b py-2"><span>Adult 12 y.o and over</span> <span className="font-bold">150 EGP</span></p>
            <p className="flex justify-between border-b py-2"><span>Child 2-11 y.o</span> <span className="font-bold">100 EGP</span></p>
            <p className="flex justify-between py-2"><span>Infant, under 2 y.o, no seat</span> <span className="font-bold">50 EGP</span></p>
          </div>
        </div>

        {/* Flight Details */}
        <div className="mt-6 p-4 bg-white shadow-md rounded-md">
          <h3 className="text-lg font-semibold">Flight details</h3>
          <div className="mt-2">
            <p className="flex justify-between border py-2 px-4 rounded-md">
              <span>Travel time</span>
              <span className="font-bold">9h55min</span>
            </p>
            <p className="flex justify-between border py-2 px-4 rounded-md mt-2">
              <span>Cabin baggage 1 x 8kg</span>
              <span className="font-bold">Included</span>
            </p>
            <p className="flex justify-between border py-2 px-4 rounded-md mt-2">
              <span>Checked baggage</span>
              <span className="font-bold">A fee applies</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default FareSelection;
