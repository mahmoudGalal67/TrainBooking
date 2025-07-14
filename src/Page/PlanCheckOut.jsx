import { useParams } from 'react-router-dom'
import {
  useGetCitiesQuery,
  useGetCountriesQuery,
  useGetPlanByIdQuery,
} from '../app/Feature/API/Plan'
import { Row, Col, Form, Input, Select, Card, DatePicker } from 'antd'
import BannerCheckOut from '../Components/Hotels/CheckOut/BannerCheckOut'
import dayjs from 'dayjs'
import { useState } from 'react'

export default function PlanCheckOut() {
  const { id } = useParams()
  const [selectEvent, setSelectEvent] = useState(null)
  const { data: product } = useGetPlanByIdQuery(id, {
    skip: !id,
  })
  const { data: cities } = useGetCitiesQuery()
  const { data: countries } = useGetCountriesQuery()
  const productsLength = countries?.reduce((acc, country) => {
    return acc + (country.products || 0)
  }, 0)
  const availableDatesTimes = [...new Set(product?.last_events)]
  const availableDates = [...new Set(product?.last_events?.map((e) => e.date))]
  // console.log({
  //   product_id: product?.id,
  //   supplier_id: product?.host?.id,
  //   event_id: selectEvent?.id,
  //   customer_first_name: '',
  //   customer_last_name: '',
  //   customer_email: '',
  //   customer_phone: '',
  //   tickets: [],
  // })
  return (
    <div className="container mt-20 py-8 px-4 mx-auto min-h-[100vh]">
      <div className="bg-white">
        <BannerCheckOut />
        <div className="container mx-auto p-6">
          <Row gutter={16}>
            <Col xs={{ span: 24, order: 2 }} lg={{ span: 12 }}>
              <Form layout="vertical">
                <Col span={24}>
                  <Card
                    title="Enter Guest Details"
                    className="mb-4"
                    variant={false}
                  >
                    <Form.Item
                      label="Guest Name"
                      name="guestName"
                      rules={[
                        {
                          required: true,
                          message: 'Please enter your guest name',
                        },
                      ]}
                    >
                      <Input placeholder="john.." />
                    </Form.Item>
                    <Form.Item
                      label="Last Name"
                      name="lastName"
                      rules={[
                        {
                          required: true,
                          message: 'Please enter your last name',
                        },
                      ]}
                    >
                      <Input placeholder="doe.." />
                    </Form.Item>
                    <Form.Item
                      label={'Choose date and time'}
                      name={'date'}
                      rules={[
                        { required: true, message: 'Please Enter The Date' },
                      ]}
                    >
                      <DatePicker
                        onChange={(date) => {
                          if (!date) {
                            setSelectEvent(null)
                            return
                          }
                          const selectedDate = date.format('YYYY-MM-DD')
                          const selectedTime = date.format('HH:mm')
                          const event = product?.last_events?.find(
                            (e) =>
                              e.date === selectedDate && e.time === selectedTime
                          )
                          setSelectEvent(event)
                        }}
                        disabledDate={(current) => {
                          if (!current) return false
                          const selectedDate = current.format('YYYY-MM-DD')
                          return !availableDates.includes(selectedDate)
                        }}
                        disabledTime={(current) => {
                          if (!current) return {}

                          const selectedDate = current.format('YYYY-MM-DD')
                          const timesForDate = availableDatesTimes
                            .filter((e) => e.date === selectedDate)
                            .map((e) => e.time)

                          const allowedHours = timesForDate.map((t) =>
                            parseInt(t.split(':')[0])
                          )
                          const allowedMin = timesForDate.map((t) =>
                            parseInt(t.split(':')[1])
                          )

                          const disabledHours = Array.from(
                            { length: 24 },
                            (_, i) => i
                          ).filter((hour) => !allowedHours.includes(hour))
                          const disabledMins = Array.from(
                            { length: 24 },
                            (_, i) => i
                          ).filter((min) => !allowedMin.includes(min))

                          return {
                            disabledHours: () => disabledHours,
                            disabledMinutes: () => disabledMins,
                          }
                        }}
                        showTime
                        format={'YYYY-MM-DD HH:mm'}
                        className="px-2 py-1 w-full text-black text-sm focus:outline-none"
                      />
                    </Form.Item>
                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[
                        { required: true, message: 'Please enter your email' },
                      ]}
                    >
                      <Input type="email" placeholder="john.doe@example.com" />
                    </Form.Item>
                    <Form.Item
                      label="Phone"
                      name="phone"
                      rules={[
                        { required: true, message: 'Please enter your phone' },
                      ]}
                    >
                      <Input type="tel" placeholder="+9406465" />
                    </Form.Item>
                  </Card>
                </Col>
                <Form.Item className="mt-8">
                  <button
                    type="submit"
                    className="w-full px-5 py-[10px] bg-primary text-white rounded-lg hover:bg-second transition-all duration-200 text-sm"
                  >
                    Booking Now
                  </button>
                </Form.Item>
              </Form>
            </Col>
            <Col xs={{ span: 24, order: 1 }} lg={{ span: 12 }}>
              <div className="rounded-xl p-5 shadow-md w-full">
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={product?.host?.photo}
                    alt={product?.host?.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">{product?.host?.name}</p>
                    <p className="text-yellow-500 text-sm">
                      ★ {product?.customers_review_rating} (
                      {product?.reviews.length})
                    </p>
                  </div>
                </div>

                {/* <h2 className="text-xl font-bold mb-2">{product?.title}</h2> */}

                <div className="text-sm text-gray-700 space-y-1">
                  <p>
                    <strong>Start time :</strong>{' '}
                    {product?.last_events[0]?.date}{' '}
                    {dayjs(
                      `2002-05-22T${product?.last_events[0]?.time}`
                    ).format('hh:mm A')}
                  </p>
                  <p>
                    <strong>Type of excursion:</strong>{' '}
                    {product?.type === 'private' ? 'Private' : 'Group'}
                  </p>
                  <p>
                    <strong>Duration:</strong>{' '}
                    {product?.composite_activity_options?.duration?.name ||
                      'Unknown'}
                  </p>
                  <p>
                    <strong>Meeting point :</strong>{' '}
                    {product?.begin_place.address}
                  </p>
                  <p>
                    <strong>End point:</strong> {product?.finish_point}
                  </p>
                </div>

                <div className="mt-4 border-t pt-2 text-xs text-gray-500">
                  <p className="flex flex-col">
                    ✔ Secure online payments .{' '}
                    <span>
                      You don’t need to worry when paying for excursions on our
                      website. All your data is protected.
                    </span>
                  </p>
                  <p className="flex flex-col">
                    ✔ A wide range of excursions.{' '}
                    <span>
                      {productsLength} excursions in {cities?.length} cities
                      around the world
                    </span>
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  )
}
