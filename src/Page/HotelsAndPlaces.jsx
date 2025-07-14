import { useEffect, useState } from 'react'
import Filteration from '../Components/Hotels/HotelsAndPlaces/Filteration'
import AllHotels from '../Components/Hotels/HotelsAndPlaces/AllHotels'

// const hotels = [
//   {
//     id: 1,
//     img: img,
//     name: 'Latte Hotel Moscow',
//     location: 'Location 1',
//     rating: 4,
//     deal: 'Fully Refundable',
//     price: 100,
//   },
//   {
//     id: 2,
//     img: img,
//     name: 'Latte Hotel Moscow',
//     location: 'Location 2',
//     rating: 5,
//     deal: 'Properties With Special Offers',
//     price: 200,
//   },
//   {
//     id: 3,
//     img: img,
//     name: 'Latte Hotel Moscow',
//     location: 'Location 3',
//     rating: 3,
//     deal: 'No Payment Needed',
//     price: 50,
//   },
// ]

// function useLocalStorage(key, initialValue) {
//   const [rooms, setRooms] = useState(() => {
//     return JSON.parse(localStorage.getItem(key)) || initialValue
//   })

//   useEffect(() => {
//     localStorage.setItem(key, JSON.stringify(rooms))
//   }, [rooms, key])

//   useEffect(() => {
//     const handleStorage = (event) => {
//       if (event.key === key) {
//         setRooms(JSON.parse(event.newValue) || initialValue)
//       }
//     }

//     window.addEventListener('storage', handleStorage)
//     return () => {
//       window.removeEventListener('storage', handleStorage)
//     }
//   }, [key, initialValue])

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const data = JSON.parse(localStorage.getItem(key))
//       if (JSON.stringify(data) !== JSON.stringify(rooms)) {
//         setRooms(data || initialValue)
//       }
//     }, 1000)

//     return () => clearInterval(interval)
//   }, [key, rooms, initialValue])

//   return [rooms, setRooms]
// }

const HotelsAndPlaces = () => {
  const rooms = JSON.parse(localStorage.getItem('hotel-search'))

  const [filter, setFilter] = useState({
    location: '',
    rating: 0,
    deal: '',
    minPrice: 0,
    maxPrice: 500,
  })
  // const filteredHotels = hotels.filter(
  //   (hotel) =>
  //     (filter.location === '' || hotel.location === filter.location) &&
  //     (filter.rating === 0 || hotel.rating >= filter.rating) &&
  //     (filter.deal === '' || hotel.deal === filter.deal) &&
  //     hotel.price >= filter.minPrice &&
  //     hotel.price <= filter.maxPrice
  // )

  return (
    <div className="mt-[80px] container mx-auto py-10 mb-16">
      {/* <IntialValueHotel /> */}
      <div className="flex md:flex-row flex-col pt-8">
        <Filteration filter={filter} setFilter={setFilter} />
        <AllHotels rooms={rooms} />
      </div>
    </div>
  )
}

export default HotelsAndPlaces
