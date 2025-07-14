import { useEffect, useState } from 'react'
import useSearchData from '../../../hooks/useSearchData'
import HotelItem from './HotelItem'

const RecentlyViewed = () => {
  // const { getSearch } = useSearchData()
  // const [rooms, setRooms] = useState([])

  // useEffect(() => {
  //   const searchRoom = getSearch()
  //   setRooms(searchRoom)
  // }, [getSearch])

  return (
    <div>
      {[] > 0 && (
        <div className="container mx-auto py-10 mb-16">
          <div className="text-start mb-12">
            <p className="lg:text-4xl text-3xl flex flex-col text-black font-bold">
              Available Hotels
              <span className="text-sm text-gray-500">
                Total Result 0 Hotels
              </span>
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* {rooms?.map((room, index) => (
              <HotelItem id={room.propertyId} room={room} key={index} />
            ))} */}
          </div>
        </div>
      )}
    </div>
  )
}

export default RecentlyViewed
