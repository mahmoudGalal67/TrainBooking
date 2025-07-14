/* eslint-disable react/no-unescaped-entities */
import { FaStar } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import img from '../../assets/Img/avatar.png'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

const WhatTravelSaying = ({ reviewsList, reviewLength }) => {
  const data = reviewsList?.slice(0, 12)

  return (
    <div className="container mx-auto py-10 mb-16">
      <div className="flex justify-between items-center mb-8">
        <div className="flex flex-col">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-800">
            What Travelers Are Saying
          </h2>
          <p className="font-extrabold text-gray-600">
            Reviews ( {data?.length} ) out of {reviewLength}
          </p>
        </div>
        <Link
          to="/reviews"
          className="text-2xl font-extrabold text-primary hover:underline"
        >
          Show More
        </Link>
      </div>
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
        pagination={{ clickable: true }}
        navigation
      >
        {data?.map((review, index) => (
          <SwiperSlide key={index} className="h-auto">
            <div className="relative rounded-lg shadow-lg bg-white p-6 h-full">
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={img}
                  alt={`Reviewer ${index + 1}`}
                  className="w-16 h-16 object-cover rounded-full"
                />
                <p className="text-lg font-semibold text-gray-700">
                  {review?.name}
                </p>
              </div>
              <div className="mt-2">
                <div className="flex items-center mb-2">
                  <span className="text-yellow-500 text-xl">
                    <FaStar />
                  </span>
                  <span className="ml-2 text-lg font-semibold">
                    {review?.rating}
                  </span>
                </div>
                <p className="text-lg font-semibold text-gray-600 mb-2">
                  Time : {review?.date}
                </p>
                <p className="text-gray-600">{review?.content||"No Comment.."}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default WhatTravelSaying
