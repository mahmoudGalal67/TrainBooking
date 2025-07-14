import AvailableRoomsBox from '../Components/Hotels/AvailableRooms/AvailableRooms'
import IntialValuesRoomsAvailable from '../Components/Hotels/AvailableRooms/IntialValuesRoomsAvailable'

const AvailableRooms = () => {
  return (
    <div className="mt-[80px] container mx-auto py-10 mb-16">
      <IntialValuesRoomsAvailable />
      <div className="pt-8">
        <div className="w-full p-6 border-r border-gray-300 bg-white rounded-lg shadow-lg">
          <AvailableRoomsBox />
        </div>
      </div>
    </div>
  )
}

export default AvailableRooms
