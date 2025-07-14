import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { FaEye } from 'react-icons/fa'
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules'
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa'
import img1 from '../../assets/Img/adv1.png'
import img2 from '../../assets/Img/adv2.png'
import img3 from '../../assets/Img/adv3.png'
import avatar from '../../assets/Img/avatar.png'
const NextAdventure = () => {
  const slides = [
    {
      image: img1,
      title: 'Russia 5 Days Tourist Itinerary +Recommendations',
      description:
        'I`ve studied abroad in Russia. Other than that, I`ve visited Russia....',
      avatar: avatar,
      views: 120,
    },
    {
      image: img2,
      title: 'Russia 5 Days Tourist Itinerary +Recommendations',
      description:
        'I`ve studied abroad in Russia. Other than that, I`ve visited Russia....',
      avatar: avatar,
      views: 95,
    },
    {
      image: img3,
      title: 'Russia 5 Days Tourist Itinerary +Recommendations',
      description:
        'I`ve studied abroad in Russia. Other than that, I`ve visited Russia....',
      avatar: avatar,
      views: 120,
    },
    {
      image: img1,
      title: 'Russia 5 Days Tourist Itinerary +Recommendations',
      description:
        'I`ve studied abroad in Russia. Other than that, I`ve visited Russia....',
      avatar: avatar,
      views: 120,
    },
    {
      image: img2,
      title: 'Russia 5 Days Tourist Itinerary +Recommendations',
      description:
        'I`ve studied abroad in Russia. Other than that, I`ve visited Russia....',
      avatar: avatar,
      views: 95,
    },
    {
      image: img3,
      title: 'Russia 5 Days Tourist Itinerary +Recommendations',
      description:
        'I`ve studied abroad in Russia. Other than that, I`ve visited Russia....',
      avatar: avatar,
      views: 120,
    },
  ]

  return (
    <div className="container mx-auto max-w-auto relative mb-[60px]">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <p className="lg:text-4xl text-3xl text-black font-bold">
            Find your next adventure{' '}
          </p>
          <h2
            className={`lg:text-2xl text-xl font-semibold text-gray-400 mt-4 max-w-50`}
          >
            Browse through itineraries and guides crafted by fellow travelers.
            Get inspired <br />
            by real experiences and detailed plans for your next adventure.
          </h2>
        </div>
      </div>

      <Swiper
        loop
        spaceBetween={30}
        slidesPerView={3}
        navigation={{
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next',
        }}
        effect="fade"
        speed={600}
        pagination={{ clickable: true }}
        autoplay={{ delay: 2500, disableOnInteraction: true, EffectFade }}
        modules={[Autoplay, Navigation, Pagination]}
        className="container mx-auto max-w-auto lg:px-0 px-4"
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              style={{
                // border: '1px solid #ddd',
                borderRadius: '8px',
                // padding: '16px',
                textAlign: 'center',
              }}
            >
              <img
                src={slide.image}
                alt={slide.title}
                style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
              />
              <h3
                className="text-start text-xl font-bold "
                style={{ marginTop: '16px' }}
              >
                {slide.title}
              </h3>
              <p className="text-start text-lg text-gray-400">
                {slide.description}
              </p>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'start',
                  alignItems: 'center',
                  marginTop: '16px',
                  gap: '4px',
                }}
              >
                <div>
                  <img
                    src={slide.avatar}
                    alt="Avatar"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      marginRight: '8px',
                    }}
                  />
                </div>
                <div>
                  <span>Emma</span>
                  <span className="flex items-center text-gray-400">
                    <FaEye style={{ marginRight: '8px' }} />
                    {slide.views}
                  </span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="swiper-button-prev absolute left-0 top-1/2 transform -translate-y-1/2 z-10">
        <div
          className={`bg-primary-yellow cursor-pointer border border-gray-500 w-[50px] h-[50px] flex justify-center items-center rounded-3xl transition-all duration-300 ease-in-out`}
        >
          <FaChevronLeft className="text-xl text-white" />
        </div>
      </div>
      <div className="swiper-button-next absolute right-0 top-1/2 transform -translate-y-1/2 z-10">
        <div
          className={`bg-primary-yellow cursor-pointer border border-gray-500 w-[50px] h-[50px] flex justify-center items-center rounded-3xl transition-all duration-300 ease-in-out`}
        >
          <FaChevronRight className="text-xl text-white" />
        </div>
      </div>
    </div>
  )
}

export default NextAdventure
