import img1 from '../../assets/Img/adv1.png'
import img2 from '../../assets/Img/adv2.png'
import img3 from '../../assets/Img/adv3.png'
import img4 from '../../assets/Img/av4.png'
import img5 from '../../assets/Img/ad5.png'
import img6 from '../../assets/Img/ad6.png'
import img7 from '../../assets/Img/ad7.png'

const ImageGrid = () => {
  const images = [
    { id: 1, src: img1, alt: 'Image 1', city: 'Paris' },
    { id: 2, src: img2, alt: 'Image 2', city: 'New York' },
    { id: 3, src: img3, alt: 'Image 3', city: 'Tokyo' },
    { id: 4, src: img7, alt: 'Image 4 (Tall)', city: 'Sydney' },
    { id: 5, src: img5, alt: 'Image 5', city: 'Dubai' },
    { id: 6, src: img4, alt: 'Image 6', city: 'London' },
    { id: 7, src: img5, alt: 'Image 7 (Tall)', city: 'Rome' },
    { id: 8, src: img6, alt: 'Image 8', city: 'Istanbul' },
  ]

  return (
    <div className="container mx-auto py-10 mt-12 mb-16">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <p className="lg:text-4xl text-3xl text-black font-bold">
            Explore hundreds of places to visit <br />
            for every corner of the world
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {images.slice(0, 3).map((image, index) => (
          <div key={index} className="relative col-span-1">
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-[400px] object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
              <p className="text-white text-3xl font-bold absolute bottom-6">
                {image.city}
              </p>
            </div>
          </div>
        ))}

        <div className="col-span-1 row-span-1 relative">
          <img
            src={images[3].src}
            alt={images[3].alt}
            className="w-full h-[400px] object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
            <p className="text-white text-3xl font-bold absolute bottom-6">
              {images[3].city}
            </p>
          </div>{' '}
        </div>

        {/* Next image takes one column */}
        <div className="col-span-2 row-span-1 relative">
          <img
            src={images[4].src}
            alt={images[4].alt}
            className="w-full h-[400px] object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
            <p className="text-white text-3xl font-bold absolute bottom-6">
              {images[4].city}
            </p>
          </div>
        </div>

        <div className="col-span-2 relative">
          <img
            src={images[5].src}
            alt={images[5].alt}
            className="w-full h-[400px] object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
            <p className="text-white text-3xl font-bold absolute bottom-6">
              {images[5].city}
            </p>
          </div>{' '}
        </div>
        <div className="row-span-1 relative">
          <img
            src={images[6].src}
            alt={images[6].alt}
            className="w-full h-[400px] object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
            <p className="text-white text-3xl font-bold absolute bottom-6">
              {images[6].city}
            </p>
          </div>{' '}
        </div>
      </div>
    </div>
  )
}

export default ImageGrid
