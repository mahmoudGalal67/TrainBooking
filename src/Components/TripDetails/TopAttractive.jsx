/* eslint-disable react/no-unescaped-entities */
import {
  useGetPlansQuery,
} from '../../app/Feature/API/Plan'
import PlanDetailsCard from './PlanDetailsCard'
import { useEffect, useState } from 'react'

const TopAttractive = () => {
  const [plans, setPlans] = useState([])
  const { data, isLoading } = useGetPlansQuery()
  const [page, setPage] = useState(1)

  const totalPages = Math.ceil(data?.length / 8)

  const handelNext = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1)
      setPlans(data.slice(page * 8, (page + 1) * 8))
    }
  }
  const handelPrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1)
      setPlans(data.slice((page - 2) * 8, (page - 1) * 8))
    }
  }

  useEffect(() => {
    if (data) {
      setPlans(data.slice(0, 8))
    }
  }, [data])

  return (
    <div className="container mx-auto py-10 mb-16">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-800">
            Top Attractive in Moscow
          </h2>
          <p className="font-extrabold text-gray-600 mt-1 -mb-2">
            {/* Reviews ( {plans?.length} ) out of {data?.length} */}
            Page {page} of {totalPages} · 8 parties , total {data?.length} parties
          </p>
        </div>
        {/* <Link to={''} className="text-2xl font-extrabold text-primary">
          Show More
        </Link> */}
        <div className="flex gap-2 items-center">
          <button
            onClick={handelPrev}
            disabled={page === 1}
            className="rounded-lg border-primary border-2 p-2 hover:bg-second hover:text-white active:bg-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            prev
          </button>
          <span className="font-bold text-[20px]">{page}</span>
          <button
            onClick={handelNext}
            disabled={page === totalPages}
            className="rounded-lg border-primary border-2 p-2 hover:bg-second hover:text-white active:bg-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            next
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="relative rounded-lg shadow-md bg-white">
            <div className="relative">
              <img
                src={img}
                alt={`Item ${index + 1}`}
                className="w-full h-[325px] object-cover rounded-t-lg"
              />
              <div className="absolute top-2 right-2 bg-gray-200 bg-opacity-50 text-white p-2 rounded-full">
                <CiHeart className="text-primary text-3xl font-bold" />
              </div>
            </div>
            <div className="mt-4 px-4 pb-4">
              <p className="text-lg font-semibold">Latte Hotel Moscow</p>
              <div className="flex items-center mt-2">
                <span className="text-yellow-500">
                  <FaStar />
                </span>
                <span className="ml-2">4.5</span>
              </div>
              <p className="text-gray-600 font-semibold pt-2">Historic site</p>
              <p className="text-gray-600 mt-2 border-t pt-4">
                Red Square is a city square in Moscow, Russia. The buildings
                surrounding the Square are all significant: Nearby to the South
                is the elaborate brightly domed Saint Basil's Cathedral and the
                palaces and cathedrals of the Kremlin, Lenin's Mausoleum. On the
                Eastern side of the square is the GUM department store, and next
                to it the restored Kazan Cathedral.{' '}
              </p>
            </div>
          </div>
        ))} */}
        {plans?.length > 0 && !isLoading
          ? plans?.map((plan, i) => <PlanDetailsCard plan={plan} key={i} />)
          : Array(4)
              .fill('')
              .map((_, i) => <PlanSkelaton key={i} />)}
      </div>
    </div>
  )
}

export default TopAttractive

const PlanSkelaton = () => {
  return (
    <div className="max-w-sm bg-white rounded-xl shadow-lg overflow-hidden border animate-pulse">
      <div className="relative">
        <div className="w-full h-48 bg-gray-200" />
        <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-20 h-6" />
      </div>

      <div className="p-4 space-y-3">
        <div className="flex gap-4">
          <div className="w-20 h-4 bg-gray-200 rounded" />
          <div className="w-8 h-4 bg-gray-200 rounded" />
          <div className="w-12 h-4 bg-gray-200 rounded" />
        </div>

        <div className="h-6 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />

        <div className="flex gap-2 mt-2 justify-between">
          <div className="w-32 h-8 bg-gray-200 rounded" />
          <div className="w-8 h-8 bg-gray-200 rounded" />
        </div>

        <div className="flex items-center justify-between mt-3">
          <div>
            <div className="h-4 bg-gray-200 rounded w-16 mb-1" />
            <div className="h-5 bg-gray-200 rounded w-20 mb-1" />
            <div className="h-3 bg-gray-200 rounded w-24" />
          </div>

          <div className="text-right space-y-1">
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-4 h-4 bg-gray-200 rounded" />
                ))}
              </div>
              <div className="w-6 h-4 bg-gray-200 rounded" />
            </div>
            <div className="h-3 bg-gray-200 rounded w-20" />
          </div>
        </div>
      </div>
    </div>
  )
}
