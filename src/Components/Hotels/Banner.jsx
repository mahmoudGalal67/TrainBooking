import bannerHotel from '../../assets/Img/bannerHotel.png'
import { useTranslation } from 'react-i18next'
import SearchHotels from './SearchHotels'

const Banner = () => {
  const { t } = useTranslation()

  return (
    <div
      className="relative h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bannerHotel})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <section className="relative h-full flex flex-col items-center justify-center text-center py-12 px-4">
        <div className="relative z-10 text-white w-[80%] mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-16">
            {t('Stay somewhere great')}
          </h1>
          <SearchHotels />
        </div>
      </section>
    </div>
  )
}

export default Banner
