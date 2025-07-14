import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { MdLocationOn } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { AiFillStar } from 'react-icons/ai'
import avatar from '../../../assets/Img/avatar.png'
import AvailableRoomsBox from '../AvailableRooms/AvailableRooms'
import CustomImage from '../CustomImage'
import { useEffect, useState } from 'react'
import { handleUploadImage } from '../../../../utils/cloadinary'

const totalReviews = 150
const ratingsBreakdown = {
  5: 80,
  4: 40,
  3: 20,
  2: 5,
  1: 5,
}

const getPercentage = (rating) => {
  return ((ratingsBreakdown[rating] / totalReviews) * 100).toFixed(1)
}

const HotelInformation = ({ hotel, dataRoom }) => {
  const [image, setImage] = useState([])
  const [loading, setLoading] = useState(false)
  const handleClick = (image) => {
    // setMainImage(image)
  }

  useEffect(() => {
    async function Image() {
      if (hotel) {
        setLoading(true)
        const res = await handleUploadImage(hotel?.images, hotel.id)
        setImage(res)
        setLoading(false)
      }
    }
    Image()
  }, [hotel])

  return (
    <div>
      <div className="bg-white shadow-lg rounded-xl p-6">
        <div className="flex items-center text-lg font-semibold text-gray-700">
          <span className="text-yellow-500 flex">
            {Array(hotel?.stars)
              .fill()
              .map((_, i) => (
                <AiFillStar key={i} className={'w-8 h-8 text-yellow-500'} />
              ))}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <h2 className="lg:text-4xl text-2xl text-gray-800 font-extrabold">
            {hotel?.name}
          </h2>
        </div>

        <p className="text-gray-600 mt-4 text-md">{hotel?.description}</p>
      </div>

      <div className="grid grid-cols-4 gap-4 p-4">
        <div className="col-span-4 md:col-span-3">
          <div className="relative h-[500px] rounded-lg overflow-hidden shadow-lg">
            {/* <img
              src={hotel?.images[0]?.url}
              alt={hotel?.images[0]?.url}
              className="w-full h-full object-cover"
            /> */}
            {loading ? (
              <div className="w-full h-full bg-gray-300 animate-pulse"></div>
            ) : (
              <CustomImage
                src={image[0]}
                alt={hotel?.images[0]?.url}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        </div>
        <div className="col-span-4 md:col-span-1 grid grid-cols-2 gap-4 max-h-[500px] overflow-y-auto">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-[150px] rounded-lg overflow-hidden shadow-lg bg-gray-300 animate-pulse"
                ></div>
              ))
            : image?.map((img, i) => (
                <div
                  key={i}
                  className="h-[150px] rounded-lg overflow-hidden shadow-lg cursor-pointer"
                  onClick={() => handleClick(img)}
                >
                  <img
                    src={img}
                    alt={img}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
        </div>
      </div>
      <div className="flex gap-4 md:flex-row flex-col">
        <div className="max-h-[700px] overflow-y-auto md:w-1/2 w-full p-6 border-r border-gray-300 bg-white rounded-lg shadow-lg">
          <AvailableRoomsBox
            hotel={hotel}
            dataRoom={dataRoom}
            propertyId={hotel?.id}
          />
        </div>
        <div className="md:w-1/2 w-full p-6 border-r border-gray-300 bg-white rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-start text-gray-800 mb-8">
            Rating
          </h2>
          <div className="text-center mb-8">
            <p className="text-6xl font-bold text-gray-800">
              {hotel?.stars || 0}
            </p>
            <div className="flex justify-center items-center text-yellow-500 mb-4">
              {Array(5)
                .fill()
                .map((_, i) => (
                  <AiFillStar
                    key={i}
                    className={`w-8 h-8 ${i < Math.floor(hotel?.stars) ? 'text-yellow-500' : 'text-gray-300'}`}
                  />
                ))}
            </div>
            <p className="text-gray-600">Based on {totalReviews} reviews</p>
          </div>
          <div className="space-y-4">
            {Object.keys(ratingsBreakdown)
              .reverse()
              .map((rating) => (
                <div key={rating} className="flex items-center">
                  <span className="w-10 font-medium text-gray-700">
                    {rating}
                  </span>
                  <div className="relative w-full h-5 bg-gray-200 rounded-lg overflow-hidden mx-4">
                    <div
                      className="h-full bg-primary"
                      style={{ width: `${getPercentage(rating)}%` }}
                    />
                  </div>
                  <span className="w-12 text-sm text-gray-500">
                    {getPercentage(rating)}%
                  </span>
                </div>
              ))}
          </div>
          <div>
            <h2 className="text-gray-800 font-bold mt-8 text-xl">
              Property Amenities
            </h2>
            <ol className="list-decimal list-inside mt-4 text-gray-600 text-md space-y-2">
              {/* <li>Free Parking</li>
              <li>Free High Speed Internet (WiFi)</li>
              <li>Pool</li>
              <li>Free Breakfast</li>
              <li>Babysitting</li> */}
              {hotel?.roomTypes?.map((roomType) => (
                <div key={roomType.id} className="grid grid-cols-2">
                  {roomType?.amenities?.map((amenite) => (
                    <li key={amenite?.code}>
                      {amenite.name} - ({amenite.code})
                    </li>
                  ))}
                </div>
              ))}
            </ol>
          </div>
        </div>
      </div>

      <div className="w-full p-6 border-r border-gray-300 bg-white rounded-lg shadow-lg mt-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-800">
            Reviews
          </h2>
          <Link
            to={'/hotels/all/Reviews'}
            className="text-2xl font-extrabold text-primary"
          >
            Show More
          </Link>
        </div>

        {Array(2)
          .fill(null)
          .map((e, i) => (
            <div
              key={i}
              className="flex items-start border-b border-gray-300 pb-6 mb-6"
            >
              <img
                src={avatar}
                alt="User"
                className="w-16 h-16 rounded-full mr-4 shadow-lg"
              />

              <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-800">
                      John Doe
                    </h3>
                    <p className="text-md text-gray-600">September 24, 2024</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-400 text-4xl">
                      <AiFillStar className={`w-8 h-8 text-yellow-500`} />
                    </span>
                    <span className="text-yellow-400 text-4xl">
                      <AiFillStar className={`w-8 h-8 text-yellow-500`} />
                    </span>
                    <span className="text-yellow-400 text-4xl">
                      <AiFillStar className={`w-8 h-8 text-yellow-500`} />
                    </span>
                    <span className="text-gray-400 text-4xl">
                      <AiFillStar className={`w-8 h-8 text-gray-300`} />
                    </span>
                    <span className="text-gray-400 text-4xl">
                      <AiFillStar className={`w-8 h-8 text-gray-300`} />
                    </span>
                  </div>
                </div>

                <p className="text-gray-700 text-xl">
                  The service was excellent, and the staff was very friendly. I
                  highly recommend this place to anyone looking for a
                  comfortable stay.
                </p>
              </div>
            </div>
          ))}
      </div>
      <div className="w-full p-6 border-r border-gray-300 bg-white rounded-lg shadow-lg mt-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Location</h2>
        <div className="rounded-lg gap-2 grid grid-cols-1 xl:grid-cols-2 sm:h-auto">
          <div className="h-full w-full">
            <h3 className="flex items-center text-xl font-bold">
              Address:
              <MdLocationOn className="text-red-500" size={20} />
              {hotel?.contactInfo?.address?.addressLine}
            </h3>
            <h3 className="flex items-center text-xl font-bold mt-2">
              City Name:
              <span className="ml-1 py-1 px-2 rounded-xl">
                {hotel?.contactInfo?.address?.cityName}
              </span>
            </h3>
            <h3 className="flex items-center text-xl font-bold mt-2">
              Postal Code:
              <span className="ml-1 py-1 px-2 rounded-xl">
                {hotel?.contactInfo?.address?.postalCode}
              </span>
            </h3>
            <h3 className="flex items-center text-xl font-bold mt-2 mb-2">
              Region:
              <span className="ml-1 py-1 px-2 rounded-xl">
                {hotel?.contactInfo?.address?.region}
              </span>
            </h3>
            <hr className="bg-slate-400 h-1" />
            <div className="mt-2">
              <h1 className="text-xl font-bold ">
                Email: {hotel?.contactInfo?.emails[0]}
              </h1>
            </div>
            <div className="mt-2">
              <h1 className="text-xl font-bold ">
                Phone: {hotel?.contactInfo?.phones[0]?.phoneNumber}
              </h1>
            </div>
            <div className="mt-2">
              <h1 className="text-xl font-bold ">
                Remark: {hotel?.contactInfo?.phones[0]?.remark}
              </h1>
            </div>
            <div className="mt-2">
              <h1 className="text-xl font-bold ">
                Tech Type: {hotel?.contactInfo?.phones[0]?.techType}
              </h1>
            </div>
          </div>
          <div className="w-full h-96">
            {hotel?.contactInfo?.address && (
              <MapContainer
                center={[
                  hotel?.contactInfo?.address?.latitude,
                  hotel?.contactInfo?.address?.longitude,
                ]}
                zoom={13}
                className="w-full h-full"
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker
                  position={[
                    hotel?.contactInfo?.address?.latitude,
                    hotel?.contactInfo?.address?.longitude,
                  ]}
                >
                  <Popup>
                    {hotel?.name}
                    <br />
                    {hotel?.contactInfo?.address?.addressLine}
                  </Popup>
                </Marker>
              </MapContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HotelInformation
