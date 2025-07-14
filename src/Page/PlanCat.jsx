import { Link, useParams } from 'react-router-dom'
import {
  useGetCategoryQuery,
  useGetPlanByCityIdQuery,
} from '../app/Feature/API/Plan'
import PlanDetailsCard from '../Components/TripDetails/PlanDetailsCard'

export default function PlanCat() {
  const { id } = useParams()
  const { data: plans, isLoading } = useGetPlanByCityIdQuery(id, {
    skip: !id,
  })
  const { data: cat, isLoading: loadingCat } = useGetCategoryQuery(id, {
    skip: !id,
  })
  if (isLoading) return <TripSkeleton />
  return (
    <div className="mt-20">
      <div className="container mx-auto px-4 py-8">
        <div>
          {/* <p className="text-gray-500 text-sm mb-2">Экскурсии в {cat}</p> */}
          <h1 className="text-4xl font-bold mb-2">
            Экскурсии в {plans?.[0]?.city_slug}
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <h2 className="font-semibold mb-4">Все</h2>
            <ul className="space-y-2 text-sm text-blue-700">
              {loadingCat && (
                <div className="space-y-2">
                  <div className="w-full h-5 bg-gray-400 rounded animate-pulse"></div>
                  <div className="w-full h-5 bg-gray-400 rounded animate-pulse"></div>
                  <div className="w-full h-5 bg-gray-400 rounded animate-pulse"></div>
                  <div className="w-full h-5 bg-gray-400 rounded animate-pulse"></div>
                  <div className="w-full h-5 bg-gray-400 rounded animate-pulse"></div>
                  <div className="w-full h-5 bg-gray-400 rounded animate-pulse"></div>
                  <div className="w-full h-5 bg-gray-400 rounded animate-pulse"></div>
                </div>
              )}
              {cat?.[0]?.sub_categories?.map(
                (category, i) =>
                  category?.products?.length > 0 && (
                    <li key={i}>
                      <Link to={`/plan/ru/${id}/category/${category?.slug}`}>
                        {category?.short_name}{' '}
                        <span className="text-gray-500">
                          {category?.products?.length}
                        </span>
                      </Link>
                    </li>
                  )
              )}
            </ul>
          </div>

          <div className="md:col-span-3 space-y-8">
            <div className="text-sm text-gray-500">
              {plans?.length} предложений
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {plans?.length > 0 && !isLoading
                ? plans?.map((plan, i) => (
                    <PlanDetailsCard plan={plan} key={i} />
                  ))
                : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const TripSkeleton = () => {
  return (
    <div className="mt-20">
      <div className="container mx-auto px-4 py-8 space-y-6">
        <div>
          <div className="h-8 bg-gray-300 rounded w-1/2 mb-2 animate-pulse" />
        </div>

        <div className="text-sm text-gray-400 h-4 w-32 bg-gray-200 rounded animate-pulse" />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
          {Array(8)
            .fill()
            .map((_, i) => (
              <div key={i} className="bg-white h-full shadow-lg rounded-xl p-6 mb-12 animate-pulse">
                <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
                <div className="flex items-center mt-4 gap-4">
                  <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
                  <div className="w-16 h-4 bg-gray-300 rounded"></div>
                  <div className="w-24 h-4 bg-gray-200 rounded"></div>
                </div>
                <div className="mt-4 h-20 bg-gray-200 rounded"></div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
