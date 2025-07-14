import { useParams } from 'react-router-dom'
import { useGetPlanByCityIdAndCategoryQuery } from '../app/Feature/API/Plan'
import PlanDetailsCard from '../Components/TripDetails/PlanDetailsCard'

export default function PlanCityCat() {
  const { id, slug } = useParams()
  const { data: plans, isLoading } = useGetPlanByCityIdAndCategoryQuery(
    { id, slug },
    {
      skip: !id || !slug,
    }
  )
  if (isLoading) return <TripSkeleton />
  return (
    <div className="mt-20">
      <div className="container mx-auto px-4 py-8">
        <div>
          {/* <p className="text-gray-500 text-sm mb-2">Экскурсии в {cat}</p> */}
          <h1 className="text-4xl font-bold mb-2">
            Drawbridge Tours {plans?.[0]?.city_slug}
          </h1>
        </div>

        <div>
          <div className="md:col-span-3 space-y-8">
            <div className="text-sm text-gray-500">{plans?.length} Offers</div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-col-3 lg:grid-cols-4 gap-6">
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
              <div className="bg-white h-full shadow-lg rounded-xl p-6 mb-12 animate-pulse">
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
