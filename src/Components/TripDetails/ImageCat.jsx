import { Link } from 'react-router-dom'
import {
  useGetCitiesByIdQuery,
  useGetPlansQuery,
} from '../../app/Feature/API/Plan'

export default function ImageCat() {
  const { data: plans } = useGetPlansQuery()
  const dataPlan = plans?.reduce((acc, item) => {
    if (!acc[item.city_slug]) {
      acc[item.city_slug] = {}
    }
    acc[item.city_slug] = item
    return acc
  }, {})

  if (dataPlan === undefined) return null
  const dataPlanArray = Object?.values(dataPlan)
  const dataPlan2 = dataPlanArray.slice(1)
  return (
    <div className="container mx-auto">
      <div className="relative rounded-lg overflow-hidden">
        <img
          src={dataPlanArray[0]?.image_big}
          alt={dataPlanArray[0]?.city_slug || 'City Image'}
          className="w-full h-96 object-cover"
        />

        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center px-8 text-white">
          <h2 className="text-4xl font-bold mb-4">
            {dataPlanArray[0]?.city_slug}
          </h2>

          <div className="flex flex-wrap gap-4 text-sm mb-6">
            {dataPlanArray[0]?.categories?.map((e, i) => (
              <Link
                to={`/plan/ru/${dataPlanArray[0]?.city_id}/category/${e?.slug}`}
                key={i}
                className="font-bold"
              >
                {e.name}
              </Link>
            ))}
          </div>

          <Link
            to={`/plan/ru/${dataPlanArray[0]?.city_id}`}
            className="bg-yellow-400 text-black font-semibold px-6 py-3 rounded hover:bg-yellow-500 transition w-max"
          >
            <span className="mr-2">
              Plans <GetNumberProudcts id={dataPlanArray[0]?.city_id} />
            </span>
            <span className="inline-block transform">➔</span>
          </Link>
        </div>
      </div>
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 grid-flow-dense gap-1">
        {dataPlan2?.map((item, i) => (
          <div className="relative rounded-lg overflow-hidden h-full" key={i}>
            <img
              src={item?.image_big}
              alt={item?.city_slug || 'City Image'}
              className="w-full h-full object-cover"
            />
            <div className="sticky inset-0 z-50 h-full bg-black bg-opacity-60 flex flex-col justify-center px-8 text-white">
              <h2 className="text-4xl font-bold mb-4">{item?.city_slug}</h2>

              <div className="flex flex-wrap gap-4 text-sm mb-6">
                {item?.categories?.map((e, i) => (
                  <Link
                    to={`/plan/ru/${item?.city_id}/category/${e.slug}`}
                    key={i}
                    className="font-bold"
                  >
                    {e.name}
                  </Link>
                ))}
              </div>

              <Link
                to={`/plan/ru/${item?.city_id}`}
                className="bg-yellow-400 text-black font-semibold px-6 py-3 rounded hover:bg-yellow-500 transition w-max"
              >
                <span className="mr-2">
                  Plans <GetNumberProudcts id={item?.city_id} />
                </span>
                <span className="inline-block transform">➔</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const GetNumberProudcts = ({ id }) => {
  const { data, isLoading, isError } = useGetCitiesByIdQuery(id, {
    skip: !id,
  })
  if (isLoading) return null
  if (isError || data?.products === 0) return null
  return <>{data?.products}</>
}
