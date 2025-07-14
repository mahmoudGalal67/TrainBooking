/* eslint-disable react/prop-types */

import SearchHotels from '../SearchHotels'
import HotelItem from './HotelItem'
import dayjs from 'dayjs'

function AllHotels({ rooms }) {
  const data = JSON.parse(localStorage.getItem('search-hotel-details'))

  const startDate = data?.arrivalDateTime ? dayjs(data.arrivalDateTime) : null
  const endDate = data?.departureDateTime ? dayjs(data.departureDateTime) : null

  return (
    <div className="md:w-3/4 w-full p-4">
      <div className="flex flex-col">
        <div className="w-full flex justify-between items-center mt-[-14px]">
          <SearchHotels
            sd={startDate}
            ed={endDate}
            adult={data?.adult}
            child={data?.childAges}
            ids={data?.propertyIds}
            cityName={data?.cityName}
          />
        </div>
        <div className="w-full flex justify-between items-center mt-2">
          <h2 className="text-xl font-semibold mb-4 text-black">
            {rooms?.length} properties in Moscow
          </h2>
          <div className="text-xl font-semibold mb-4 text-black flex items-center gap-2">
            <p>Sort By :</p>
            <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none  p-2.5">
              <option value="">Select Option</option>
              <option value="best">Best Values</option>
            </select>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {rooms?.map((room, index) => (
          <HotelItem id={room.propertyId} room={room} key={index} />
        ))}
      </div>
    </div>
  )
}

export default AllHotels
