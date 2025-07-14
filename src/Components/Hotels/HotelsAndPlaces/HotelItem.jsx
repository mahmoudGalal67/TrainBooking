import React, { useEffect, useState } from 'react'
import imgDefualt from '../../../assets/Img/adv1.png'
import { useGetHotelQuery } from '../../../app/Feature/API/Hotels'
import { CiHeart } from 'react-icons/ci'
import { FaAngleRight, FaBed, FaCheck, FaStar } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { AiFillStar } from 'react-icons/ai'
import { handleUploadImage } from '../../../../utils/cloadinary'

function calculateNights(arrival, departure) {
  const arrivalDate = new Date(arrival)
  const departureDate = new Date(departure)
  const nights = Math.ceil(
    (departureDate - arrivalDate) / (1000 * 60 * 60 * 24)
  )
  return nights
}

export default function HotelItem({ id, room }) {
  const cached = localStorage.getItem(`cachedHotel-${id}`)
  const [image, setImage] = useState([])

  const isValidCache =
    cached && Date.now() - JSON.parse(cached).timestamp < 86400000

  const { data: apiData, isLoading } = useGetHotelQuery(id, {
    skip: isValidCache,
    refetchOnMountOrArgChange: false,
  })
  const nightNumber = calculateNights(
    room?.stayDates?.arrivalDateTime,
    room?.stayDates?.departureDateTime
  )

  const hotel = isValidCache ? JSON.parse(cached).data : apiData

  useEffect(() => {
    async function Image() {
      if (hotel?.images[0] && id && image.length === 0) {
        const res = await handleUploadImage([hotel?.images[0]], id)
        setImage(res)
      }
    }
    Image()
  }, [hotel, id, image])

  // const numberGuest =
  //   room?.guestCount?.adultCount + room?.guestCount?.childAges.length

  // function handleNavigate() {
  //   const data = {
  //     propertyId: hotel?.id,
  //     arrivalDateTime: room?.stayDates?.arrivalDateTime,
  //     departureDateTime: room?.stayDates?.departureDateTime,
  //     adult: room?.guestCount?.adultCount,
  //     childAges: room?.guestCount?.childAges,
  //   }
  //   localStorage.setItem('hotel-details', JSON.stringify(data))
  // }

  if (isLoading) return <Skeleton />
  return (
    // <div className="relative rounded-lg shadow-md bg-white">
    //   <Link
    //     to={`/hotels/details/${hotel?.name}`}
    //     onClick={handleNavigate}
    //     className="relative"
    //   >
    //     <img
    //       src={hotel?.images[0]?.url || imgDefualt}
    //       alt={`Item ${hotel?.name}-${hotel?.id}`}
    //       loading="lazy"
    //       className="w-full h-[325px] object-cover rounded-t-lg cursor-pointer"
    //       //   onClick={() => showDetails(room)}
    //     />
    //     <div className="absolute top-2 right-2 bg-gray-200 bg-opacity-50 text-white p-2 rounded-full">
    //       <CiHeart className="text-primary text-3xl font-bold" />
    //     </div>
    //   </Link>
    //   <div className="mt-4 px-4 pb-4">
    //     <p className="text-lg font-semibold min-h-14 line-clamp-2">
    //       {hotel?.name}
    //     </p>
    //     <div className="flex justify-between">
    //       <div className="flex items-center">
    //         <span className="text-xl text-primary font-bold">
    //           price: {room?.total?.priceBeforeTax} {room?.currencyCode}
    //         </span>
    //         <span className="text-sm text-gray-500 font-bold ml-3">
    //           {nightNumber} night{nightNumber > 1 && 's'} , {numberGuest} guest
    //           {numberGuest > 1 && 's'}
    //         </span>
    //       </div>
    //     </div>
    //     <div className="flex gap-2 justify-between items-center">
    //       <Link
    //         className="flex items-center mt-3 px-5 py-2 bg-primary text-white rounded-lg hover:bg-second transition-all duration-200 text-sm"
    //         to={`/hotels/details/${hotel?.name}`}
    //         onClick={handleNavigate}
    //       >
    //         <FaBed /> <span className="ml-2">Explore Hotel</span>
    //       </Link>
    //       <span className="flex bg-yellow-100 py-0.5 px-2 font-bold rounded text-yellow-900">
    //         {hotel?.stars > 0 &&
    //           Array(hotel?.stars)
    //             .fill('')
    //             .map((e, i) => <FaStar key={i} />)}
    //       </span>
    //     </div>
    //   </div>
    // </div>
    <div className="border border-gray-300 rounded-lg shadow-lg bg-white flex flex-col md:flex-row">
      <div className="relative md:w-1/4">
        <img
          src={image[0] || imgDefualt}
          alt={`Item ${hotel?.name}-${hotel?.id}`}
          loading="lazy"
          className="w-full h-[250px] object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
        />
        <div className="absolute top-2 right-2 bg-gray-200 bg-opacity-50 text-white p-2 rounded-full">
          <CiHeart className="text-primary text-3xl font-bold" />
        </div>
      </div>

      <div className="p-4 flex flex-col justify-between md:w-3/4">
        <div>
          <h1 className="flex items-center text-lg font-semibold">
            {Array(hotel?.stars)
              .fill()
              .map((_, i) => (
                <AiFillStar key={i} className={'w-8 h-8 text-yellow-500'} />
              ))}
            <span className="ml-1">Hotel</span>
          </h1>
          <div className="flex justify-between gap-2">
            <h3 className="md:text-3xl text-xl font-semibold mb-2">
              {hotel?.name}
            </h3>
            <h3 className="md:text-3xl text-xl font-semibold mb-2 text-right">
              {room?.total?.priceBeforeTax + room?.total?.taxAmount}{' '}
              {room?.currencyCode}
            </h3>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-lg font-bold text-cyan-700"></span>
            <span className="font-semibold text-gray-500 text-lg">
              Including taxes and fees
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span></span>
            <span className="font-semibold text-gray-500 text-lg">
              For {nightNumber} night{nightNumber > 1 && 's'}
            </span>
          </div>
          <p className="text-gray-600 mt-2 text-sm"></p>
        </div>
        <hr />
        <div className="flex items-center justify-between">
          <p className="flex items-center gap-1 text-sm font-bold text-primary">
            {room?.cancellationPolicy?.freeCancellationPossible && (
              <>
                <FaCheck /> Free cancellation
              </>
            )}
          </p>
          <Link
            // onClick={handleNavigate}
            to={`/hotels/Details/${hotel?.name}`}
            className="bg-primary flex items-center gap-2 text-white font-semibold py-2 px-6 rounded-lg hover:bg-second transition duration-300"
          >
            Select <FaAngleRight />
          </Link>
        </div>
      </div>
    </div>
  )
}

function Skeleton() {
  return (
    <div className="border border-gray-300 rounded-lg shadow-lg bg-white flex flex-col md:flex-row animate-pulse">
      <div className="relative md:w-1/4">
        <div className="w-full h-[250px] bg-gray-300 rounded-t-lg md:rounded-l-lg md:rounded-t-none"></div>
        <div className="absolute top-2 right-2 bg-gray-400 bg-opacity-50 text-white p-2 rounded-full w-10 h-10"></div>
      </div>

      <div className="p-4 flex flex-col justify-between md:w-3/4">
        <div>
          <h1 className="flex items-center text-lg font-semibold">
            {Array(5)
              .fill()
              .map((_, i) => (
                <span
                  key={i}
                  className="w-6 h-6 bg-gray-300 rounded-full"
                ></span>
              ))}
            <span className="ml-1 bg-gray-300 h-4 w-20 rounded"></span>
          </h1>
          <div className="flex justify-between">
            <span className="md:text-3xl text-xl font-semibold mb-2 bg-gray-300 h-6 w-32 rounded"></span>
            <span className="md:text-3xl text-xl font-semibold mb-2 bg-gray-300 h-6 w-20 rounded"></span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-lg font-bold bg-gray-300 h-4 w-16 rounded"></span>
            <span className="font-semibold text-gray-500 text-lg bg-gray-300 h-4 w-32 rounded"></span>
          </div>
          <div className="flex justify-between items-center">
            <span className="bg-gray-300 h-4 w-16 rounded"></span>
            <span className="font-semibold text-gray-500 text-lg bg-gray-300 h-4 w-32 rounded"></span>
          </div>
          <p className="text-gray-600 mt-2 text-sm bg-gray-300 h-4 w-full rounded"></p>
        </div>
        <hr />
        <div className="flex items-center justify-between">
          <p className="flex items-center gap-1 text-sm font-bold text-primary">
            <span className="w-4 h-4 bg-gray-300 rounded-full"></span>
            <span className="bg-gray-300 h-4 w-24 rounded"></span>
          </p>
          <span className="bg-gray-300 flex items-center gap-2 text-white font-semibold py-2 px-6 rounded-lg hover:bg-second transition duration-300 h-10 w-24"></span>
        </div>
      </div>
    </div>
  )
}
