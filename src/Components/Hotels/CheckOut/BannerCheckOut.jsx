import img from '../../../assets/Img/check.jpg'

const BannerCheckOut = () => {
  return (
    <div
      className="relative  h-[350px]  bg-cover bg-center"
      style={{ backgroundImage: `url(${img})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <section className="relative h-full flex flex-col items-center justify-center text-center py-12 px-4">
        <div className="relative z-10 text-white max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Checkout Details
          </h1>
        </div>
      </section>
    </div>
  )
}

export default BannerCheckOut
