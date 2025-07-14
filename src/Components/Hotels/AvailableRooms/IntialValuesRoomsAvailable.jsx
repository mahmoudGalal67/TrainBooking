import { AiOutlineCalendar } from 'react-icons/ai'
import { FaUserFriends } from 'react-icons/fa'

const IntialValuesRoomsAvailable = () => {
  return (
    <div className="border-b pb-8 flex gap-12 lg:flex-row flex-col">
      <div className="lg:w-1/4 w-full ">
        <div
          style={{ width: '100%', height: '200px', backgroundColor: '#e0e0e0' }}
        >
          <iframe
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11025897.
        871543838!2d24.087537140245593!3d26.820553937623954!2m3!1f0!2f0!3f0!3
        m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1458478d0e4db229%3A0x1466c34b3b1bdf
        21!2sEgypt!5e0!3m2!1sen!2sus!4v1620023120074!5m2!1sen!2sus"
          ></iframe>
        </div>
      </div>
      <div className="md:w-3/4 w-full">
        <h2 className="lg:text-5xl text-3xl text-black font-bold mb-12">
          Lotte Hotel Moscow
        </h2>
        <div className="flex gap-4 sm:flex-row flex-col">
          <div className="flex items-center md:w-[350px] w-full border border-gray-300 rounded-lg px-2 py-1">
            <AiOutlineCalendar className="text-gray-800 mr-2" size={20} />
            <div className="flex items-start flex-col w-full">
              <p className="text-gray-400 text-lg">Check in</p>
              <p className="text-black font-bold">Tue , Sep 17</p>
            </div>
          </div>
          <div className="flex items-center md:w-[350px] w-full border border-gray-300 rounded-lg px-2 py-1">
            <AiOutlineCalendar className="text-gray-800 mr-2" size={20} />
            <div className="flex items-start flex-col w-full">
              <p className="text-gray-400 text-lg">Check out</p>
              <p className="text-black font-bold">Tue , Sep 17</p>
            </div>
          </div>
          <div className="flex items-center md:w-[350px] w-full border border-gray-300 rounded-lg px-2 py-1">
            <FaUserFriends className="text-gray-800 mr-2" size={20} />
            <div className="flex items-start flex-col w-full">
              <p className="text-gray-400 text-lg">Guests</p>
              <p className="text-black font-bold">
                2 Room , 2 Adults , 1 Child
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IntialValuesRoomsAvailable
