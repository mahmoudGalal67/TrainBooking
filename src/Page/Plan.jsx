/* eslint-disable react/no-unescaped-entities */
import {
  useGetCategoryQuery,
  useGetCitiesQuery,
  useGetCountriesQuery,
  useGetPlanByCityIdAndCategoryQuery,
  useGetPlanByCityIdQuery,
  useGetPlansQuery,
} from '../app/Feature/API/Plan'
import Rectangle from '../assets/Img/Rectangle.png'
import trip from '../assets/Img/trip.png'
import CitiesPlan from '../Components/TripDetails/CitiesPlan'
import TopAttractive from '../Components/TripDetails/TopAttractive'
import ImageCat from '../Components/TripDetails/ImageCat'
import { Input, Modal, Select } from 'antd'
import { FaCircle, FaSearch } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { IoReload } from 'react-icons/io5'

const Plan = () => {
  const { data: cities } = useGetCitiesQuery()
  const { data: countries } = useGetCountriesQuery()
  const { data: plansData = [] } = useGetPlansQuery()
  const productsLength = countries?.reduce((acc, country) => {
    return acc + (country.products || 0)
  }, 0)
  const [plans, setPlans] = useState([])
  const [openSearch, setOpenSearch] = useState(false)
  const [textSearch, setTextSearch] = useState('')
  const [citySearch, setCitySearch] = useState(null)
  const [categorySearch, setCategorySearch] = useState(null)

  const { data: dataSearch, isLoading: dataSearchLoading } =
    useGetPlanByCityIdAndCategoryQuery(
      { id: citySearch, slug: categorySearch },
      {
        skip: !citySearch || !categorySearch,
      }
    )

  // useEffect(() => {
  //   if (!citySearch && !categorySearch) {
  //     setPlans(plansData)
  //   }
  // }, [citySearch, categorySearch, plansData])

  // useEffect(() => {
  //   setPlans(dataSearch)
  // }, [dataSearch])

  // useEffect(() => {
  //   if (citySearch || categorySearch) {
  //     if (dataSearch) setPlans(dataSearch)
  //   } else {
  //     setPlans(plansData)
  //   }
  // }, [citySearch, categorySearch, dataSearch, plansData])

  useEffect(() => {
    if (citySearch && !categorySearch) {
      const filtered = plansData.filter((p) => p.city_id === citySearch)
      setPlans(filtered)
    } else if (!citySearch && categorySearch) {
      const filtered = plansData.filter((p) =>
        p.categories?.some((c) => c.name === categorySearch)
      )
      setPlans(filtered)
    } else if (citySearch && categorySearch && dataSearch) {
      setPlans(dataSearch)
    } else {
      setPlans(plansData)
    }
  }, [citySearch, categorySearch, dataSearch, plansData])

  const ct = plans?.reduce((acc, item) => {
    if (!acc[item.city_slug]) {
      acc[item.city_slug] = {}
    }
    acc[item.city_slug] = {
      city_id: item.city_id,
      city_slug: item.city_slug,
    }
    return acc
  }, {})

  const citiesData = Object.values(ct)

  const filterDataSearch = plans?.filter((p) =>
    textSearch ? p?.title?.toLowerCase().includes(textSearch) : true
  )

  const CategoriesData = Array.from(
    new Set(plans?.map((p) => p?.categories?.map((c) => c?.name)).flat())
  )

  return (
    <div className="mt-[80px] container mx-auto py-10 px-2 mb-16">
      <div className="flex gap-16 items-center md:flex-row flex-col">
        <div className="relative md:flex-[.7] flex-1">
          <img src={Rectangle} alt="Rectangle" loading="lazy" />
          <img
            src={trip}
            alt="Rectangle"
            loading="lazy"
            className="absolute left-0 top-[9%] sm:left-[6%]"
          />
        </div>
        <div className="flex-1">
          <h1 className=" text-5xl font-bold mb-12">
            Create your trip in <br /> Moscow
          </h1>
          <p className=" text-xl text-gray-500 mb-12">
            Check out must-see sights and activities: Red Square, Saint <br />{' '}
            Basil's Cathedral, Architectural Buildings, Points of Interest &{' '}
            <br /> Landmarks . For personalized recommendations, try our AI
            trip- <br />
            planning product.
          </p>
          <p className=" text-xl text-gray-500 mb-12">
            {productsLength} экскурсии в {cities?.length} городе на одном сайте.
            Онлайн бронирование, настоящие отзывы, расписание на каждый день.
          </p>
        </div>
      </div>
      <div className="pt-8">
        <CitiesPlan />
      </div>
      <div className="pt-8">
        <TopAttractive />
      </div>
      <div className="pt-8">
        <ImageCat />
      </div>
      <div
        onClick={() => setOpenSearch(true)}
        className="fixed bottom-[10px] gap-2 flex items-center justify-center left-[10px] bg-primary font-bold text-white rounded-md p-8 h-[50px] hover:bg-second cursor-pointer active:bg-primary select-none"
      >
        <FaSearch className="text-[20px]" />
      </div>
      {/* modal */}
      <Modal
        open={openSearch}
        onCancel={() => {
          setOpenSearch(false)
        }}
        footer={null}
        closable={false}
        width={null}
        title="Search By Cities"
      >
        <Input.Search
          placeholder="Search by cities"
          className="w-full mx-auto min-w-full"
          style={{ borderRadius: '10px' }}
          size="large"
          onInput={(value) => setTextSearch(value.target.value.toLowerCase())}
        />
        <div className="flex gap-1 mt-1">
          <Select
            labelInValue
            allowClear
            value={citySearch !== null ? { value: citySearch } : undefined}
            placeholder={'Select City'}
            onChange={(v) => {
              if (!v) {
                setCitySearch(null)
              } else {
                if (textSearch === null) {
                  setTextSearch('')
                }
                setCitySearch(v.value)
              }
            }}
          >
            {citiesData?.map((cn, i) => (
              <Select.Option key={i} value={cn.city_id}>
                {cn.city_slug}
              </Select.Option>
            ))}
          </Select>
          <Select
            labelInValue
            allowClear
            value={
              categorySearch !== null ? { value: categorySearch } : undefined
            }
            placeholder={'Select Category'}
            onChange={(v) => {
              if (!v) {
                setCategorySearch(null)
              } else {
                if (textSearch === null) {
                  setTextSearch('')
                }
                setCategorySearch(v.value)
              }
            }}
          >
            {CategoriesData?.map((cn, i) => (
              <Select.Option key={i} value={cn}>
                {cn}
              </Select.Option>
            ))}
          </Select>
        </div>
        {dataSearchLoading && (
          <div className="flex items-center justify-center h-full">
            <h1 className="font-bold text-lg flex items-center gap-2">
              <IoReload className="animate-spin" />
              Loading...
            </h1>
          </div>
        )}
        <ul className="h-96 overflow-scroll">
          {filterDataSearch?.length > 0 ? (
            filterDataSearch?.map((s, i) => (
              <li
                key={i}
                className="p-2 font-bold text-[20px] bg-gray-200 my-2 cursor-pointer hover:bg-gray-300 active:bg-gray-200 select-none"
              >
                {s.title}
              </li>
            ))
          ) : (
            <div className="flex items-center justify-center h-full">
              <h1 className="font-bold text-lg">No Data</h1>
            </div>
          )}
        </ul>
      </Modal>
    </div>
  )
}

export default Plan
