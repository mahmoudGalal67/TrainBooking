import google from '../assets/Img/googleplay.png'
import app_store from '../assets/Img/app-store.png'

const Footer = () => {
  return (
    <footer className="bg-[#D9D9D9] text-gray-800 py-10 font-sans">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4 lg:place-items-center">
        <div>
          <h4 className="lg:text-3xl text-2xl font-semibold mb-4">
            Website Name
          </h4>
          <ul className="text-xl  space-y-2">
            <li>
              <a href="#home" className="hover:text-gray-600">
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-gray-600">
                Things to do
              </a>
            </li>
            <li>
              <a href="#services" className="hover:text-gray-600">
                Plan
              </a>
            </li>
            <li>
              <a href="#shop" className="hover:text-gray-600">
                Shop
              </a>
            </li>
            <li>
              <a href="#hotels" className="hover:text-gray-600">
                Hotels
              </a>
            </li>
            <li>
              <a href="#car" className="hover:text-gray-600">
                Car
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="lg:text-3xl text-2xl font-semibold mb-4">
            {' '}
            Website Name Site{' '}
          </h4>
          <p className="text-xl leading-relaxed">
            Discover your dream destination
            <br />
            Book the best restaurants
            <br />
            Book tours and attraction tickets
            <br />
            Read cruise reviews
            <br />
            Find vacation rentals
            <br />
            Plan and book your next trip
          </p>
        </div>

        <div>
          <h4 className="lg:text-3xl text-2xl font-semibold mb-4">
            Get The App
          </h4>
          <div className="flex flex-col gap-4">
            <a href="https://play.google.com">
              <img src={google} alt="Google Play Store" className="w-40" />
            </a>
            <a href="https://www.apple.com/app-store/">
              <img src={app_store} alt="App Store" className="w-40" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
