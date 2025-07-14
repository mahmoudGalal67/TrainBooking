import { Link } from 'react-router-dom'
import {
  useGetCitiesByIdQuery,
  useGetCitiesQuery,
  useGetPlansQuery,
} from '../../app/Feature/API/Plan'

// async function getCityDetails(cityId) {
//   const res = useGetCitiesByIdQuery(cityId, {
//     skip: !cityId,
//   })
//   if (res.isLoading) {
//     return null
//   }
//   if (res.isError) {
//     console.error('Error fetching city details:', res.error)
//     return null
//   }
//   return res.data
// }

export default function CitiesPlan() {
  const { data: plans, isLoading } = useGetPlansQuery()

  const dataPlan = plans?.reduce((acc, item) => {
    if (!acc[item.city_slug]) {
      acc[item.city_slug] = {}
    }
    acc[item.city_slug] = {
      city_id: item.city_id,
    }
    return acc
  }, {})
  if (dataPlan === undefined) return null
  const dataPlanArray = Object?.values(dataPlan)

  return (
    <div className="container mx-auto py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-flow-dense gap-1">
        {dataPlanArray?.map((e) => (
          <Details id={e.city_id} key={e.city_id} />
        ))}
      </div>
    </div>
  )
}

const Details = ({ id }) => {
  const { data, isLoading, isError } = useGetCitiesByIdQuery(id, {
    skip: !id,
  })
  if (isLoading)
    return (
      <h1 className="text-xl flex items-center gap-2 px-6 py-1 active:bg-red-300 border text-left border-primary text-primary rounded hover:bg-gray-300 transition-all duration-200 text-md">
        loading...
      </h1>
    )
  if (isError || data?.products === 0) return null
  return (
    <Link
      to={`/plan/ru/${data?.id}`}
      className="text-xl w-full flex items-center gap-2 px-6 py-1 active:bg-red-300 border text-left border-primary text-primary rounded hover:bg-gray-300 transition-all duration-200 text-md"
    >
      {data?.products} - {data?.name}
    </Link>
  )
}
