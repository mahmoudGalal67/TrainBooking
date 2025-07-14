import { useNavigate } from 'react-router-dom';
import bannerCar from '../assets/Img/bannerBus.png';
import { FaBus, FaUsers } from 'react-icons/fa';

const BusDetails = () => {
  const navigate = useNavigate()
  
  const handleNavigate=()=>{
    navigate(`/payment-services/bus`)
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
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Trip Details</h1>
          </div>
        </section>
      </div>
      <div className='bg-white px-4 md:px-8  pt-12 flex flex-col md:flex-row pb-12 gap-8'>
        <div className="flex-1 p-6 bg-white">
        <div className="border rounded-lg p-4 shadow-lg bg-white flex flex-col w-full">
      <div className="flex justify-between items-center border-b pb-2 mb-2">
        <h3 className="font-bold text-lg">SwiftBus</h3>
      </div>
      <div className="flex justify-between items-center text-gray-700 text-sm mb-2">
        <span className="font-semibold text-lg">10:30 AM</span>
        <div className="flex items-center">
          <hr className="border-gray-400 w-12 mx-2" />
          <FaBus className="text-gray-600" />
          <hr className="border-gray-400 w-12 mx-2" />
        </div>
        <span className="font-semibold text-lg">2h 15m</span>
      </div>
      <div className="flex justify-between text-gray-500 text-sm mb-3">
        <span>New York</span>
        <span className="font-semibold text-xs">30 min duration</span>
        <span>Washington</span>
      </div>
      <div className="flex flex-wrap justify-between items-center gap-2">
        <span className="text-orange-500 font-bold text-lg">$25</span>
        <div className="flex items-center text-gray-600 text-sm gap-2">
          <span className="bg-red-100 text-red-600 px-3 py-1 rounded text-xs font-semibold">
            3 Seats Left
          </span>
          <span className="flex items-center">
            <FaUsers className="mr-1" /> Almost full
          </span>
        </div>
      </div>
    </div>
          <button className="mt-4 w-full bg-orange-500 text-white py-2 rounded-md text-lg font-semibold" onClick={()=>handleNavigate()}>Select</button>
        </div>
        <div className='flex-1'>
          <div className="mt-6 p-4 bg-white shadow-md rounded-md">
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

          <div className="mt-6 p-4 bg-white shadow-md rounded-md">
            <h3 className="text-lg font-semibold">Fare Rules</h3>
            <div className="mt-2">
              <p className="flex justify-between border-b py-2"><span>Adult 12 y.o and over</span> <span className="font-bold">150 EGP</span></p>
              <p className="flex justify-between border-b py-2"><span>Child 2-11 y.o</span> <span className="font-bold">100 EGP</span></p>
              <p className="flex justify-between py-2"><span>Infant, under 2 y.o, no seat</span> <span className="font-bold">50 EGP</span></p>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default BusDetails;
