import {
  FaBaby,
  FaClock,
  FaCoins,
  FaFlag,
  FaLanguage,
  FaSearch,
  FaStar,
  FaTimesCircle,
  FaUserFriends,
} from 'react-icons/fa'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import WhatTravelSaying from '../Components/TripDetails/WhatTravelSaying'
import { Link, useParams } from 'react-router-dom'
import { useGetPlanByIdQuery } from '../app/Feature/API/Plan'
import { useEffect, useState } from 'react'
import { Image } from 'antd'

const PlanDetails = () => {
  const id = useParams().id
  const [visibleIndex, setVisibleIndex] = useState(null)

  const handleVisiblePreview = (index) => {
    setVisibleIndex(index)
  }

  const [trip, setTrip] = useState()
  const [prices, setPrices] = useState({
    originalPrice: 0,
    discountedPrice: 0,
    discountPercentage: 0,
  })

  const { data, isLoading } = useGetPlanByIdQuery(id, {
    skip: !id,
  })

  const included = data?.what_included?.replace(/^"|"$/g, '')?.split(/",\s*"/)
  const notIncluded = data?.what_not_included
    ?.replace(/^"|"$/g, '')
    ?.replace(/<[^>]*>/g, '')
    ?.split(/",\s*"/)
    .slice(0, -1)

  useEffect(() => {
    if (data) {
      setTrip(data)
    }
  }, [data])

  const cleanPrice = (priceStr) => parseFloat(priceStr?.replace(/[^\d.]/g, ''))
  useEffect(() => {
    if (!isLoading && data?.id) {
      // const morePlanById = plans.find((e) => e.id === data.id)
      // const originalPrice = parseFloat(morePlanById?.price?.replace(' ₽', ''))
      const originalPrice = cleanPrice(data?.minimal_price)
      const discountedPrice = cleanPrice(data?.netto_price)
      const discountPercentage = Math.round(
        ((originalPrice - discountedPrice) / originalPrice) * 100
      )
      setPrices({
        originalPrice,
        discountedPrice,
        discountPercentage,
      })
    }
  }, [isLoading, data])

  const images = trip?.photos || []



  
  if (isLoading) {
    return <TripSkeleton />
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="bg-white shadow-lg rounded-xl p-6 mt-[60px] mb-12">
        <h2 className="lg:text-4xl text-2xl text-gray-800 font-extrabold">
          {trip?.title}
        </h2>
        <div className="flex items-center mt-4 text-lg font-semibold text-gray-700">
          <span className="text-yellow-500">
            <FaStar size={20} />
          </span>
          <span className="ml-2 text-gray-800">
            {trip?.customers_review_rating}
          </span>
          <span className="ml-4 text-gray-500">
            Rating ({trip?.review_rating})
          </span>
        </div>
        <p className="text-gray-600 mt-4 text-md">{trip?.short_info}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <div className="bg-white p-6 rounded-lg shadow-md max-h-full">
          {included?.length > 0 && (
            <>
              <h2 className="text-2xl font-semibold mb-4">Included</h2>
              <ul className="grid grid-cols-2 gap-2">
                {included?.length > 0 &&
                  included?.map((include, i) => (
                    <li key={i} className="flex items-start gap-1">
                      {i + 1} - {include}
                    </li>
                  ))}
              </ul>
            </>
          )}
          {notIncluded?.length > 0 && (
            <>
              <div className="w-full h-0.5 bg-gray-500 mt-2 mb-2" />
              <h2 className="text-2xl font-semibold mb-4">Not Included</h2>
              <ul className="grid grid-cols-2 gap-2">
                {notIncluded?.map((notInclude, i) => (
                  <li key={i} className="flex items-center gap-1">
                    {i + 1} - {notInclude}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        <div>
          <Image.PreviewGroup
            preview={{
              visible: visibleIndex !== null,
              current: visibleIndex,
              onVisibleChange: (vs) => {
                if (!vs) {
                  setVisibleIndex(null)
                }
              },
              onChange: (current) => {
                setVisibleIndex(current)
              },
            }}
          >
            <div className="relative w-full group">
              <Image
                onClick={() => handleVisiblePreview(0)}
                src={trip?.main_photo?.original}
                alt="Red Square"
                className="object-cover rounded-lg mb-4"
                width={'100%'}
                height={240}
                preview={{
                  mask: (
                    <div className="rounded-lg">
                      <FaSearch className="text-lg text-white" />
                    </div>
                  ),
                }}
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {images?.slice(0, 3)?.map((photo, i) => (
                <div className="relative w-full group" key={i}>
                  <Image
                    onClick={() => handleVisiblePreview(i + 1)}
                    src={photo?.original}
                    alt={photo?.name}
                    className="object-cover rounded-lg"
                    width={'100%'}
                    height={100}
                    preview={{
                      mask: (
                        <div className="rounded-lg">
                          <FaSearch className="text-lg text-white" />
                        </div>
                      ),
                    }}
                  />
                </div>
              ))}
              <div className="relative w-full h-full group">
                {images[3] && (
                  <Image
                    onClick={() => handleVisiblePreview(4)}
                    src={images?.[3]?.original}
                    alt={images?.[3]?.name}
                    className="object-cover rounded-lg z-20"
                    width={'100%'}
                    height={100}
                    preview={{
                      mask: (
                        <div>
                          <FaSearch className="text-lg text-white" />
                        </div>
                      ),
                    }}
                  />
                )}
                <span className="absolute h-[100px] inset-0 bg-black text-white opacity-70 flex items-center justify-center rounded-lg cursor-pointer transition-opacity duration-200 text-lg pointer-events-none">
                  {images?.length - 4}+ Фото
                </span>
              </div>
            </div>

            {images?.slice(5)?.map((img, i) => (
              <div
                key={i}
                className="hidden"
                onClick={() => handleVisiblePreview(i + 5)}
              >
                <Image src={img?.original} alt={img?.name} />
              </div>
            ))}
          </Image.PreviewGroup>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md text-lg grid grid-cols-2">
          {/* <h3 className="text-lg font-semibold text-gray-800 mb-4">The Area</h3> */}
          <p className="text-gray-600 flex items-center gap-2">
            <FaFlag />
            {trip?.type === 'shared' &&
            trip?.activity_type === 'composite_activity'
              ? 'Групповая сборная, на автобусе'
              : 'Индивидуальная экскурсия'}
          </p>
          {trip?.languages?.includes('ru') && (
            <p className="text-gray-600 flex items-center gap-2">
              <FaLanguage /> Русский язык
            </p>
          )}
          <p className="text-gray-600 flex items-center gap-2">
            <FaClock /> {trip?.composite_activity_options?.duration?.name}
          </p>
          <p className="text-gray-600 flex items-center gap-2">
            <FaUserFriends /> Размер группы до {trip?.group_size_max} человек
          </p>
          <p className="text-gray-600 flex items-center gap-2">
            <FaBaby />
            {trip?.important_info?.includes('дети') ||
            trip?.important_info?.includes('ребенок') ||
            trip?.important_info?.includes('ребёнок')
              ? 'Подходит для детей'
              : 'Не подходит для детей'}{' '}
          </p>
          <p className="text-gray-600 flex items-center gap-2">
            <FaCoins />
            {trip?.pay_type_in_text}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">
            Save up to {prices.discountPercentage}%
          </h3>
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <div className="flex items-end gap-2">
                <h2 className="text-3xl font-bold text-gray-600">
                  {prices.discountedPrice} ₽
                </h2>
                <p className=" line-through">{prices.originalPrice} ₽</p>
              </div>
              <p className="text-gray-600">for the excursion</p>
              <div className="flex items-center mt-4 text-lg font-semibold text-gray-700">
                <span className="text-yellow-500">
                  <FaStar size={20} />
                </span>
                <span className="ml-2 text-gray-800">
                  {trip?.customers_review_rating}
                </span>
                <span className="ml-4 text-gray-500">
                  Rating ({trip?.review_rating})
                </span>
              </div>
            </div>
            <Link
              to={`/plan/check-out/${trip?.id}`}
              className="flex items-center gap-2 px-12 py-3 bg-primary text-white rounded-lg hover:bg-second transition-all duration-200 text-md"
            >
              Check Dates
            </Link>
          </div>

          <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-2">
            How can I pay for the excursion?
          </h3>
          <p className="text-gray-600">
            <strong className="capitalize">
              {/* {trip?.pay_type === 'post_pay' ? 'Payment on site' : 'Prepayment on the website'} */}
              {trip?.pay_type_in_text}
            </strong>
          </p>
          <p className="text-gray-600">{trip?.refund_info}</p>
        </div>
        {/* <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Best Nearby
          </h3>
          <div className="grid grid-cols-1 gap-4">
            <div className="flex sm:items-center items-start sm:gap-12 sm:flex-row flex-col">
              <div>
                <div className="flex items-center mb-4">
                  <img
                    src={img2}
                    alt="Nearby"
                    className="w-16 h-16 object-cover rounded-lg mr-4"
                  />
                  <div>
                    <h4 className="text-md font-semibold text-gray-800">
                      Saints Cathedral
                    </h4>
                    <p className="text-gray-500 text-sm">0.14 km away</p>
                    <p className="text-yellow-500 flex items-center">
                      <FaStar />
                      <span className="ml-1">4.8</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center mb-4">
                  <img
                    src={img2}
                    alt="Nearby"
                    className="w-16 h-16 object-cover rounded-lg mr-4"
                  />
                  <div>
                    <h4 className="text-md font-semibold text-gray-800">
                      Saint s Cathedral
                    </h4>
                    <p className="text-gray-500 text-sm">0.14 km away</p>
                    <p className="text-yellow-500 flex items-center">
                      <FaStar />
                      <span className="ml-1">4.8</span>
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center mb-4">
                  <img
                    src={img2}
                    alt="Nearby"
                    className="w-16 h-16 object-cover rounded-lg mr-4"
                  />
                  <div>
                    <h4 className="text-md font-semibold text-gray-800">
                      Saint Basils Cathedral
                    </h4>
                    <p className="text-gray-500 text-sm">0.14 km away</p>
                    <p className="text-yellow-500 flex items-center">
                      <FaStar />
                      <span className="ml-1">4.8</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center mb-4">
                  <img
                    src={img2}
                    alt="Nearby"
                    className="w-16 h-16 object-cover rounded-lg mr-4"
                  />
                  <div>
                    <h4 className="text-md font-semibold text-gray-800">
                      Saint Basils Cathedral
                    </h4>
                    <p className="text-gray-500 text-sm">0.14 km away</p>
                    <p className="text-yellow-500 flex items-center">
                      <FaStar />
                      <span className="ml-1">4.8</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>

      <WhatTravelSaying
        reviewsList={trip?.reviews_list}
        reviewLength={trip?.reviews}
      />

      <div className="w-full p-6 border-r border-gray-300 bg-white rounded-lg shadow-lg mt-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Location</h2>
        <div className="relative h-96 rounded-lg overflow-hidden">
          <MapContainer
            center={[55.7558, 37.6176]}
            zoom={13}
            className="w-full h-full"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[55.7558, 37.6176]}>
              <Popup>
                Lotte Hotel Moscow
                <br />2 Bld., 8 Novinskiy Blvd., Moscow 121099 Russia
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </div>
  )
}

export default PlanDetails

const TripSkeleton = () => {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="bg-white shadow-lg rounded-xl p-6 mt-[60px] mb-12 animate-pulse">
        <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
        <div className="flex items-center mt-4 gap-4">
          <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
          <div className="w-16 h-4 bg-gray-300 rounded"></div>
          <div className="w-24 h-4 bg-gray-200 rounded"></div>
        </div>
        <div className="mt-4 h-20 bg-gray-200 rounded"></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <div className="bg-white p-6 rounded-lg shadow-md animate-pulse">
          <div className="h-6 bg-gray-300 w-1/3 mb-4 rounded"></div>
          <div className="h-32 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 w-1/2 mb-2 rounded"></div>
        </div>
        <div className="animate-pulse">
          <div className="w-full h-60 bg-gray-300 rounded-lg mb-4"></div>
          <div className="grid grid-cols-4 gap-2">
            {Array(4)
              .fill()
              .map((_, i) => (
                <div
                  key={i}
                  className="w-full h-24 bg-gray-200 rounded-lg"
                ></div>
              ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md animate-pulse">
          <div className="h-6 bg-gray-300 w-1/4 mb-4 rounded"></div>
          <div className="h-4 bg-gray-200 mb-2 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 mb-2 rounded w-1/3"></div>
          <div className="h-6 bg-gray-300 w-1/4 mt-6 mb-4 rounded"></div>
          <div className="h-4 bg-gray-200 mb-2 rounded w-2/3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-300 w-1/3 mb-4 rounded"></div>
          {Array(2)
            .fill()
            .map((_, i) => (
              <div key={i} className="flex items-center mb-4">
                <div className="w-16 h-16 bg-gray-300 rounded-lg mr-4"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-3 bg-yellow-200 rounded w-1/3"></div>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mt-10 animate-pulse">
        <div className="h-8 bg-gray-300 rounded w-1/3 mb-6"></div>
        <div className="h-96 bg-gray-200 rounded-lg"></div>
      </div>
    </div>
  )
}
