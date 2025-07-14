import { FaArrowRight } from 'react-icons/fa'
import img from '../../assets/Img/image.png'

const HeaderHero = () => {
  return (
    <div
      className="relative h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${img})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <section className="relative h-full flex flex-col items-center justify-center text-center py-12 px-4">
        <div className="relative z-10 text-white max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            One app for all your travel planning needs
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Create detailed itineraries, explore user-shared guides, and manage
            your <br />
            bookings seamlessly — all in one place.
          </p>
          <div className="flex gap-4 justify-center sm:flex-row flex-col">
            <button
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-second transition-all duration-200"
              aria-label="Start Planning"
            >
              Start Planning
            </button>
            <button
              className="px-6 py-3 flex justify-center border border-primary bg-transparent text-white rounded-lg flex items-center hover:bg-primary transition-all duration-200"
              aria-label="Get The App"
            >
              Get The App <FaArrowRight className="ml-2 mt-1" />
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HeaderHero
