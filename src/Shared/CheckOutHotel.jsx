/* eslint-disable react/prop-types */
import { Card, Col, Row, Form, Input, Modal, message, Select } from 'antd'
import BannerCheckOut from '../Components/Hotels/CheckOut/BannerCheckOut'
import { useEffect, useState } from 'react'
// import master from '../assets/Img/mastercard.png'
// import visa from '../assets/Img/visa.png'
// import rupay from '../assets/Img/rupay.png'
// import cashback from '../assets/Img/chashback.png'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  useBookingHotelMutation,
  useVerifyHotelMutation,
} from '../app/Feature/API/Hotels'
import { FaSpinner } from 'react-icons/fa'
import dayjs from 'dayjs'

const CheckOutPage = ({ children }) => {
  const location = useLocation()
  const hotelData = location.state || localStorage.getItem('roomDate')
  const [verifyBooking, { isLoading }] = useVerifyHotelMutation()
  const [booking, { isLoading: isLoadBooking }] = useBookingHotelMutation()
  const [dataVerify, setDataVerify] = useState()
  const [showBooking, setShowBooking] = useState(false)
  const [data, setData] = useState(null)
  const navigate = useNavigate()
  const [currentPrice, setCurrentPrice] = useState(null)
  const [newPrice, setNewPrice] = useState(null)
  const [alternativeBooking, setAlternativeBooking] = useState(null)
  const [showAlternativeBooking, setShowAlternativeBooking] = useState(false)

  useEffect(() => {
    if (!hotelData) {
      return (window.location.href = '/')
    }
  }, [])

  const onFinish = async (values) => {
    const data = {
      booking: {
        propertyId: hotelData?.propertyId,
        roomStays: [
          {
            stayDates: {
              arrivalDateTime: hotelData?.stayDates?.arrivalDateTime,
              departureDateTime: hotelData?.stayDates?.departureDateTime,
            },
            ratePlan: {
              id: hotelData.ratePlan.id,
            },
            roomType: {
              id: hotelData.roomType.id,
              placements: hotelData.roomType.placements.map((e) => ({
                code: e.code,
              })),
            },
            guests: [
              {
                firstName: values.guestName || '',
                middleName: '',
                lastName: values.lastName || '',
                citizenship: values.nationality,
                sex: values.gender,
              },
            ],
            guestCount: {
              adultCount: hotelData.guestCount.adultCount,
              childAges: hotelData.guestCount.childAges,
            },
            checksum: hotelData.checksum,
            services: null,
            // services: [{id: '674942',quantity:1}],
            extraStay: {
              earlyArrival: {
                overriddenDateTime: hotelData.stayDates.arrivalDateTime,
              },
              lateDeparture: {
                overriddenDateTime: hotelData.stayDates.departureDateTime,
              },
            },
          },
        ],
        // services: hotelData.includedServices.map((e) => ({ id: e.id })) || null,
        services: null,
        customer: {
          firstName: values.guestName || '',
          lastName: values.lastName || '',
          citizenship: values.nationality,
          contacts: {
            phones: [{ phoneNumber: values.phone }],
            emails: [
              {
                emailAddress: values.email,
              },
            ],
          },
          comment: values.comment,
        },
        prepayment: {},
        // bookingComments: [],
      },
    }

    const res = await verifyBooking(data)

    const currentPrice = hotelData?.total?.priceBeforeTax
    const newPrice = res?.data?.booking?.total?.priceBeforeTax

    if (res?.error) {
      message.error('An error occurred while verifying your reservation')
      res?.error?.data?.errors?.forEach((err) => {
        message.error(err.message)
      })
    } else {
      setAlternativeBooking(res?.data?.alternativeBooking)
      if (res?.data?.alternativeBooking === null) {
        setCurrentPrice(currentPrice)
        setNewPrice(newPrice)
        setShowBooking(true)
        setDataVerify(res?.data?.booking)
        setData(data)
      } else {
        setShowAlternativeBooking(true)
      }
    }
  }

  async function handleBooking() {
    setShowBooking(false)
    let dataBooking = { ...data }
    dataBooking.booking.createBookingToken = dataVerify.createBookingToken
    const res = await booking(dataBooking)
    if (res.error) {
      message.error('Error Booking, please try again')
      message.error(
        `Error Code ${res.error.originalStatus} - ${res.error.status}`
      )
    } else {
      message.success('booking Successflly')
      location.state = null
      localStorage.removeItem('hotelData')
      const bookingNumber = res.data.booking.number
      navigate(`/booking-details/${bookingNumber}`)
    }
  }

  function handleClose() {
    setShowBooking(false)
    setData(null)
  }

  return (
    <div className="bg-white">
      <BannerCheckOut />
      <div className="container mx-auto p-6">
        <Row gutter={16}>
          {children}
          <Col span={12}>
            <Form layout="vertical" onFinish={onFinish}>
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
                    label="Gender"
                    name="gender"
                    rules={[
                      { required: true, message: 'Please enter your gender' },
                    ]}
                  >
                    <Select placeholder="Select Gender">
                      <Select.Option value={'male'}>Male</Select.Option>
                      <Select.Option value={'female'}>Female</Select.Option>
                      <Select.Option value={'other'}>Other</Select.Option>
                    </Select>
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
                    label="Nationality"
                    name="nationality"
                    rules={[{ required: false }]}
                  >
                    <Input type="text" placeholder="EGP" />
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
                  <Form.Item label="comment" name="comment">
                    <Input.TextArea
                      rows={4}
                      placeholder="Write Booking Comment..."
                    />
                  </Form.Item>
                </Card>
              </Col>

              {/* <Col span={24}> */}
              {/* <Card title="Card Details" variant={false}> */}
              {/* <Form.Item
                    label="Card Type"
                    name="cardType"
                    rules={[
                      {
                        required: true,
                        message: 'Please select the card type',
                      },
                    ]}
                  >
                    <Row gutter={16}>
                      <Col span={6}>
                        <Tooltip title="MasterCard">
                          <div
                            className={`flex items-center justify-center border-2 rounded-lg p-2 cursor-pointer transition-colors duration-300 ${cardType === 'mastercard' ? 'border-primary' : 'border-transparent'}`}
                            onClick={() => setCardType('mastercard')}
                          >
                            <img src={master} alt="MasterCard" />
                          </div>
                        </Tooltip>
                      </Col>

                      <Col span={6}>
                        <Tooltip title="Visa">
                          <div
                            className={`flex items-center justify-center border-2 rounded-lg p-2 cursor-pointer transition-colors duration-300 ${cardType === 'visa' ? 'border-primary' : 'border-transparent'}`}
                            onClick={() => setCardType('visa')}
                          >
                            <img src={visa} alt="Visa" />
                          </div>
                        </Tooltip>
                      </Col>

                      <Col span={6}>
                        <Tooltip title="RuPay">
                          <div
                            className={`flex items-center justify-center border-2 rounded-lg p-2 cursor-pointer transition-colors duration-300 ${cardType === 'rupay' ? 'border-primary' : 'border-transparent'}`}
                            onClick={() => setCardType('rupay')}
                          >
                            <img src={rupay} alt="RuPay" />
                          </div>
                        </Tooltip>
                      </Col>

                      <Col span={6}>
                        <Tooltip title="Cash Back">
                          <div
                            className={`flex items-center justify-center border-2 rounded-lg p-2 cursor-pointer transition-colors duration-300 ${cardType === 'cashback' ? 'border-primary' : 'border-transparent'}`}
                            onClick={() => setCardType('cashback')}
                          >
                            <img src={cashback} alt="CashBack" />
                          </div>
                        </Tooltip>
                      </Col>
                    </Row>
                  </Form.Item> */}

              {/* if use visa */}
              {/* <Form.Item
                    label="Cardholder Name"
                    name="cardholderName"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter the cardholder name',
                      },
                    ]}
                  >
                    <Input placeholder="John Doe" />
                  </Form.Item>

                  <Form.Item
                    label="Card Number"
                    name="cardNumber"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter your card number',
                      },
                    ]}
                  >
                    <Input placeholder="1234 5678 9012 3456" />
                  </Form.Item>

                  <Form.Item
                    label="Expiration Date"
                    name="expirationDate"
                    rules={[
                      {
                        required: true,
                        message: 'Please enter the expiration date',
                      },
                    ]}
                  >
                    <Input placeholder="MM/YY" />
                  </Form.Item>

                  <Form.Item
                    label="CVV"
                    name="cvv"
                    rules={[
                      { required: true, message: 'Please enter your CVV' },
                    ]}
                  >
                    <Input type="password" placeholder="123" />
                  </Form.Item> */}
              {/* =========== */}

              {/* </Card> */}
              {/* </Col> */}
              <Form.Item className="mt-8">
                <button
                  type="submit"
                  className="w-full px-5 py-[10px] bg-primary text-white rounded-lg hover:bg-second transition-all duration-200 text-sm"
                  disabled={isLoading}
                >
                  {!isLoading ? 'Booking Now' : 'loading...'}
                </button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
        <Modal
          title={'Booking Policy Summary'}
          open={showBooking}
          closable={false}
          footer={[
            <button
              key={'close'}
              className="ml-2 px-5 py-2 border hover:bg-gray-200 rounded-lg transition-all duration-200 text-sm"
              onClick={handleClose}
            >
              Cancel
            </button>,
            <button
              key={'booking'}
              className="ml-2 px-5 py-2 bg-primary text-white rounded-lg hover:bg-second transition-all duration-200 text-sm"
              onClick={handleBooking}
            >
              Confirm Booking
            </button>,
          ]}
        >
          {currentPrice !== null &&
            newPrice !== null &&
            currentPrice !== newPrice && (
              <div className="mb-4 p-3 bg-yellow-50 border border-yellow-300 rounded text-sm text-yellow-800">
                <p>
                  The price has changed from{' '}
                  <strong>
                    {currentPrice} {hotelData?.currencyCode}
                  </strong>{' '}
                  to{' '}
                  <strong>
                    {newPrice} {hotelData?.currencyCode}
                  </strong>
                  .
                </p>
                <p>Do you want to proceed with the new price?</p>
              </div>
            )}
          {/* <ul>
            <li>
              Free Cancellation Available:{' '}
              {dataVerify?.cancellationPolicy?.freeCancellationPossible ? (
                <strong>Yes</strong>
              ) : (
                <strong>No</strong>
              )}
            </li>
            {dataVerify?.cancellationPolicy?.freeCancellationPossible &&
              dataVerify?.cancellationPolicy?.freeCancellationDeadlineLocal && (
                <li>
                  Free Cancellation Deadline:{' '}
                  <strong>
                    {dayjs
                      .utc(
                        dataVerify?.cancellationPolicy
                          ?.freeCancellationDeadlineLocal
                      )
                      .tz(hotelData?.timeZone)
                      .format('YYYY-MM-DD , hh:mm A')}{' '}
                    ({hotelData?.timeZone})
                  </strong>
                </li>
              )}
            {dataVerify?.cancellationPolicy?.penaltyAmount > 0 && (
              <li>
                Penalty Amount:{' '}
                <strong>
                  {dataVerify?.cancellationPolicy?.penaltyAmount}{' '}
                  {hotelData?.currencyCode}
                </strong>
              </li>
            )}
          </ul> */}
          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">
                🔒 Cancellation Policy
              </h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>
                  Free Cancellation Available:{' '}
                  <strong>
                    {dataVerify?.cancellationPolicy?.freeCancellationPossible
                      ? 'Yes'
                      : 'No'}
                  </strong>
                </li>

                {dataVerify?.cancellationPolicy?.freeCancellationPossible &&
                  dataVerify?.cancellationPolicy
                    ?.freeCancellationDeadlineLocal && (
                    <li>
                      Free Cancellation Deadline:{' '}
                      <strong>
                        {dayjs(
                          dataVerify?.cancellationPolicy
                            ?.freeCancellationDeadlineLocal
                        ).format('YYYY-MM-DD , hh:mm A')}{' '}
                        ({hotelData?.timeZone})
                      </strong>
                    </li>
                  )}

                {dataVerify?.cancellationPolicy?.penaltyAmount > 0 && (
                  <li>
                    Late Cancellation Penalty:{' '}
                    <strong>
                      {dataVerify?.cancellationPolicy?.penaltyAmount}{' '}
                      {hotelData?.currencyCode}
                    </strong>
                  </li>
                )}
                {dataVerify?.total?.taxAmount > 0 && (
                  <li>
                    Taxs:{' '}
                    <ul className="ml-8">
                      <li>
                        {dataVerify?.taxes?.map((tax, i) => (
                          <ul>
                            <li key={i}>
                              {i + 1} - {tax?.name} :{' '}
                              <strong>
                                {dataVerify?.total?.taxes[i]?.amount}{' '}
                                {hotelData?.currencyCode}
                              </strong>
                            </li>
                          </ul>
                        ))}
                      </li>
                    </ul>
                  </li>
                )}
                {dataVerify?.total?.taxAmount > 0 && (
                  <li>
                    SubTotal:{' '}
                    <strong>
                      {dataVerify?.total?.priceBeforeTax +
                        dataVerify?.total?.taxAmount}{' '}
                      {hotelData?.currencyCode}
                    </strong>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </Modal>

        {/* alternative Booking */}
        <Modal
          title={'Alternative Booking Summary'}
          open={showAlternativeBooking}
          closable={false}
          footer={[
            <button
              key={'close'}
              className="ml-2 px-5 py-2 border hover:bg-gray-200 rounded-lg transition-all duration-200 text-sm"
              onClick={handleClose}
            >
              Cancel
            </button>,
            <button
              key={'confirm'}
              className="ml-2 px-5 py-2 bg-primary text-white rounded-lg hover:bg-second transition-all duration-200 text-sm"
              onClick={handleBooking}
            >
              Confirm Alternative Booking
            </button>,
          ]}
        >
          {dataVerify?.alternativeBooking && (
            <div className="space-y-4 text-sm">
              {/* السعر */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">💰 Price</h3>
                <p>Unknown {/* {hotelData?.currencyCode} */}</p>
              </div>

              {/* نوع الغرفة */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-1">
                  🛏 Room Type
                </h3>
                <p>{'N/A'}</p>
              </div>

              {/* سياسة الإلغاء */}
              <div className="space-y-4 text-sm">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">
                    🔒 Cancellation Policy
                  </h3>
                  <ul className="list-disc pl-5 text-gray-700 space-y-1">
                    <li>
                      Free Cancellation Available:{' '}
                      <strong>
                        {dataVerify?.cancellationPolicy
                          ?.freeCancellationPossible
                          ? 'Yes'
                          : 'No'}
                      </strong>
                    </li>

                    {dataVerify?.cancellationPolicy?.freeCancellationPossible &&
                      dataVerify?.cancellationPolicy
                        ?.freeCancellationDeadlineLocal && (
                        <li>
                          Free Cancellation Deadline:{' '}
                          <strong>
                            {dayjs
                              .utc(
                                dataVerify?.cancellationPolicy
                                  ?.freeCancellationDeadlineLocal
                              )
                              .tz(hotelData?.timeZone)
                              .format('YYYY-MM-DD , hh:mm A')}{' '}
                            ({hotelData?.timeZone})
                          </strong>
                        </li>
                      )}

                    {dataVerify?.cancellationPolicy?.penaltyAmount > 0 && (
                      <li>
                        Late Cancellation Penalty:{' '}
                        <strong>
                          {dataVerify?.cancellationPolicy?.penaltyAmount}{' '}
                          {hotelData?.currencyCode}
                        </strong>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
              {dataVerify?.alternativeBooking?.benefits && (
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">
                    ✨ Benefits
                  </h3>
                  <p>{dataVerify.alternativeBooking.benefits.join(', ')}</p>
                </div>
              )}
            </div>
          )}
        </Modal>

        <Modal open={isLoading} footer={null} centered closable={false}>
          <div className="flex items-center justify-center gap-2 text-xl">
            <FaSpinner className="animate-spin" />
            <h1 className="font-bold text-center">
              Please wait, your request is being processed.
            </h1>
          </div>
        </Modal>

        <Modal open={isLoadBooking} footer={null} centered closable={false}>
          <div className="flex flex-col items-center justify-center text-xl">
            <FaSpinner className="animate-spin" />
            <h1 className="font-bold text-center">
              Please wait, your request is being processed.
              <p className="text-sm text-slate-600">
                You are about to complete your booking.
              </p>
              <p className="text-sm text-slate-500">
                You will be redirected to the booking details page. Please save
                the number to be able to return later.
              </p>
            </h1>
          </div>
        </Modal>
      </div>
    </div>
  )
}

export default CheckOutPage
