/* eslint-disable react/prop-types */
import {
  Card,
  Col,
  Row,
  Form,
  Input,
  Modal,
  message,
  Select,
  DatePicker,
} from 'antd'
import BannerCheckOut from '../Components/Hotels/CheckOut/BannerCheckOut'
import { useEffect, useState } from 'react'
// import master from '../assets/Img/mastercard.png'
// import visa from '../assets/Img/visa.png'
// import rupay from '../assets/Img/rupay.png'
// import cashback from '../assets/Img/chashback.png'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

import { FaSpinner } from 'react-icons/fa'
import { useReservationCreateMutation } from '../app/Feature/API/Train'
import { useRailway } from '../context/railwayContext'
import dayjs from 'dayjs'
import MyDocument from './PDFDocument'
import { PDFDownloadLink } from '@react-pdf/renderer'

const CheckOutPage = ({ children, trainDetails }) => {
  const [isLoading, setisLoading] = useState(false)
  const [isloadingconfirmaion, setisloadingconfirmaion] = useState(false)
  const [Ticketconfirmation, setTicketconfirmation] = useState(false)
  const [printTicket, setprintTicket] = useState(false)
  const [Ticket, setTicket] = useState(null)
  const [ticketDetails, setticketDetails] = useState(null)
  const navigate = useNavigate()
  const passengers = JSON.parse(localStorage.getItem('Guests'))
  const seats = JSON.parse(localStorage.getItem('selectedSeats'))

  // useEffect(() => {
  //   if (!hotelbookingdata) {
  //     return (window.location.href = '/')
  //   }
  // }, [])
  const { carDetails } = useRailway()
  const grouped = []

  const [ReservationCreate] = useReservationCreateMutation()
  if (carDetails == null) {
    navigate('/train')
    return
  }
  const onFinish = async (values) => {
    let seatIndex = 0

    // Process Adults (guests)
    for (let i = 1; i <= passengers.adults; i++) {
      grouped.push({
        type: 'Adult',
        name: values[`guestName ${i}`] || '',
        email: values[`Guest email ${i}`] || '',
        phone: values[`Guest Phone ${i}`] || '',
        Nationality: values[`Guest Nationality ${i}`] || '',
        Document_number: values[`Guest Document number ${i}`] || '',
        dob: values[`Guest dob ${i}`].$d || '',
        gender: values[`Guest gender ${i}`] || '',
        seat: seats[seatIndex++] || null,
      })
    }

    // Process Children
    for (let i = 1; i <= passengers.children; i++) {
      grouped.push({
        type: 'Child',
        name: values[`childe name ${i}`] || '',
        email: values[`childe email ${i}`] || '',
        phone: values[`childe phone ${i}`] || '',
        Nationality: values[`childe Nationality ${i}`] || '',
        Document_number: values[`childe Document number ${i}`] || '',
        dob: values[`childe dob ${i}`].$d || '',
        gender: values[`childe gender ${i}`] || '',
        seat: seats[seatIndex++] || null,
      })
    }

    const bookingdata = {
      OriginCode: trainDetails.OriginCode,
      DestinationCode: trainDetails.DestinationCode,
      DepartureDate: trainDetails.TrainInfo?.DepartureDateTime,
      TrainNumber: trainDetails.TrainInfo?.TrainNumber,
      CarNumber: carDetails[0].CarNumber,
      Provider: trainDetails.TrainInfo?.Provider,
      CarType: carDetails[0].CarType,
      phone: grouped[0].phone,
      // phone: values.phone,
      email: grouped[0].email,
      clients: grouped,
      seats: JSON.parse(localStorage.getItem('selectedSeats')),
    }
    try {
      setisLoading(true)
      const result = await ReservationCreate(bookingdata)
      if (result.error) {
        message.error(result?.error?.data?.details?.Message)
        setisLoading(false)
        return
      }
      setTicket(result)
      setTicketconfirmation(true)
    } catch (err) {
      console.log(err)
    }
  }

  async function handleBooking() {
    setisloadingconfirmaion(true)
    fetch(
      'https://matroshka-travel.com/proxy-onelya/Order/V1/Reservation/Confirm',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Pos: 'aviation_test',
          Authorization: 'Basic ' + btoa('aviation_test:Matroshka@123'),
        },
        body: JSON.stringify({
          OrderId: Ticket?.data?.OrderId,
          OrderItemIds: null,
          OrderCustomerIds: null,
          OrderCustomerDocuments: null,
          ProviderPaymentForm: 'Cash',
          MaskedCardNumber: null,
          AgentPaymentId: null,
          PaymentMethod: null,
          FasterPaymentsQrTId: null,
          ProviderCustomerEmail: null,
          PaymentRemark: null,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          message.error(data?.error?.data?.details?.Message)
        }
        message.success('Confirmed')
        setticketDetails(data)
        setprintTicket(true)
        setTicketconfirmation(false)
        setisloadingconfirmaion(false)
        // localStorage.clear()
        // navigate('/')
      })
      .catch((error) => {
        message.error(error?.data?.details?.Message)
      })
  }

  function handleClose() {
    setTicketconfirmation(false)
  }
  return (
    <div className="bg-white">
      <BannerCheckOut />
      <div className="container mx-auto p-6">
        <Row gutter={16}>
          {children}
          <Col span={12}>
            <Form layout="vertical" onFinish={onFinish}>
              {passengers.adults &&
                Array(passengers.adults)
                  .fill(0)
                  .map((item, i) => (
                    <Col span={24}>
                      <Card
                        title={`Enter Adult ${i + 1} Details`}
                        className="mb-4"
                        variant={false}
                      >
                        <Form.Item
                          label="Passenger Name"
                          name={`guestName ${i + 1}`}
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
                          label="Email"
                          name={`Guest email ${i + 1}`}
                          rules={[
                            {
                              required: true,
                              message: 'Please enter your email',
                            },
                          ]}
                        >
                          <Input
                            type="email"
                            placeholder="john.doe@example.com"
                          />
                        </Form.Item>

                        <Form.Item
                          label="Phone"
                          name={`Guest Phone ${i + 1}`}
                          rules={[
                            {
                              required: true,
                              message: 'Please enter your phone',
                            },
                          ]}
                        >
                          <Input type="tel" placeholder="EX: +79991234567" />
                        </Form.Item>
                        <Form.Item
                          label="Nationality"
                          name={`Guest Nationality ${i + 1}`}
                          rules={[
                            {
                              required: true,
                              message: 'Please enter your nationality',
                            },
                          ]}
                        >
                          <Select placeholder="Select your Nationality code">
                            <Select.Option value={'EG'}>EG</Select.Option>
                            <Select.Option value={'RU'}>RU</Select.Option>
                            <Select.Option value={'US'}>US</Select.Option>
                            <Select.Option value={'KZ'}>KZ</Select.Option>
                            <Select.Option value={'UA'}>UA</Select.Option>
                            <Select.Option value={'BY'}>BY</Select.Option>
                            <Select.Option value={'other'}>Other</Select.Option>
                          </Select>
                        </Form.Item>
                        <Form.Item
                          label="Document number"
                          name={`Guest Document number ${i + 1}`}
                          rules={[
                            {
                              required: true,
                              message: 'Please enter your Document Number',
                            },
                          ]}
                        >
                          <Input type="tel" placeholder="EX: A12345678" />
                        </Form.Item>
                        <Form.Item
                          label="Date of Birth"
                          name={`Guest dob ${i + 1}`}
                          rules={[
                            {
                              required: true,
                              message: 'Please select a date!',
                            },
                          ]}
                        >
                          <DatePicker style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item
                          label="Gender"
                          name={`Guest gender ${i + 1}`}
                          rules={[
                            {
                              required: true,
                              message: 'Please enter your gender',
                            },
                          ]}
                        >
                          <Select placeholder="Select Gender">
                            <Select.Option value={'Male'}>Male</Select.Option>
                            <Select.Option value={'Female'}>
                              Female
                            </Select.Option>
                            <Select.Option value={'Other'}>Other</Select.Option>
                          </Select>
                        </Form.Item>
                      </Card>
                    </Col>
                  ))}
              {!!passengers.children &&
                Array(passengers.children)
                  .fill(0)
                  .map((item, i) => (
                    <Col span={24}>
                      <Card
                        title={`Enter children ${i + 1} Details`}
                        className="mb-4"
                        variant={false}
                      >
                        <Form.Item
                          label="Passenger Name"
                          name={`childe name ${i + 1}`}
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
                          label="Email"
                          name={`childe email ${i + 1}`}
                          rules={[
                            {
                              required: true,
                              message: 'Please enter your email',
                            },
                          ]}
                        >
                          <Input
                            type="email"
                            placeholder="john.doe@example.com"
                          />
                        </Form.Item>

                        <Form.Item
                          label="Phone"
                          name={`childe phone ${i + 1}`}
                          rules={[
                            {
                              required: true,
                              message: 'Please enter your phone',
                            },
                          ]}
                        >
                          <Input type="tel" placeholder="EX: +79991234567" />
                        </Form.Item>
                        <Form.Item
                          label="Nationality"
                          name={`childe Nationality ${i + 1}`}
                          rules={[
                            {
                              required: true,
                              message: 'Please enter your nationality',
                            },
                          ]}
                        >
                          <Select placeholder="Select your Nationality code">
                            <Select.Option value={'EG'}>EG</Select.Option>
                            <Select.Option value={'RU'}>RU</Select.Option>
                            <Select.Option value={'US'}>US</Select.Option>
                            <Select.Option value={'KZ'}>KZ</Select.Option>
                            <Select.Option value={'UA'}>UA</Select.Option>
                            <Select.Option value={'BY'}>BY</Select.Option>
                            <Select.Option value={'other'}>Other</Select.Option>
                          </Select>
                        </Form.Item>
                        <Form.Item
                          label="Document number"
                          name={`childe Document number ${i + 1}`}
                          rules={[
                            {
                              required: true,
                              message: 'Please enter your Document Number',
                            },
                          ]}
                        >
                          <Input type="tel" placeholder="EX: A12345678" />
                        </Form.Item>
                        <Form.Item
                          label=" Date of Birth"
                          name={`childe dob ${i + 1}`}
                          rules={[
                            {
                              required: true,
                              message: 'Please select a date!',
                            },
                          ]}
                        >
                          <DatePicker style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item
                          label=" Gender"
                          name={`childe gender ${i + 1}`}
                          rules={[
                            {
                              required: true,
                              message: 'Please enter your gender',
                            },
                          ]}
                        >
                          <Select placeholder="Select Gender">
                            <Select.Option value={'male'}>Male</Select.Option>
                            <Select.Option value={'female'}>
                              Female
                            </Select.Option>
                            <Select.Option value={'other'}>Other</Select.Option>
                          </Select>
                        </Form.Item>
                      </Card>
                    </Col>
                  ))}

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
          open={Ticketconfirmation}
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
              {!isloadingconfirmaion ? 'Confirm Booking' : 'loading...'}
            </button>,
          ]}
        >
          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">
                <p>ticket number - {Ticket?.data?.OrderId}</p>
                <p>
                  Available untill -
                  {dayjs(Ticket?.data?.ConfirmTill).format('hh:mm A')}
                </p>
                <p>Amount -{Ticket?.data?.Amount}</p>
              </h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Free Cancellation Available: </li>
              </ul>
            </div>
          </div>
        </Modal>
        <Modal
          title={'Ticket Details'}
          open={printTicket}
          closable={false}
          footer={[
            <button
              key={'close'}
              className="ml-2 px-5 py-2 border hover:bg-gray-200 rounded-lg transition-all duration-200 text-sm"
              onClick={() => setprintTicket(false)}
            >
              Cancel
            </button>,
            <button
              key={'booking'}
              className="ml-2 px-5 py-2 bg-primary text-white rounded-lg hover:bg-second transition-all duration-200 text-sm"
              onClick={() => {}}
            >
              <PDFDownloadLink
                document={
                  <MyDocument
                    ticketDetails={ticketDetails}
                    carDetails={carDetails}
                    trainDetails={trainDetails}
                    seats={seats}
                  />
                }
                fileName="data.pdf"
              >
                {({ loading }) => (loading ? 'Loading...' : 'Download PDF')}
              </PDFDownloadLink>
            </button>,
          ]}
        >
          <div className="space-y-4 text-sm">
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">
                <p>ticket number - {ticketDetails?.OrderId}</p>
                <h3>Passengers ({ticketDetails?.Customers.length})</h3>
                <br />
                {ticketDetails?.Customers.map((client, i) => (
                  <ul key={i}>
                    <li>
                      {' '}
                      Ticket Passenger Id ---
                      {client.OrderCustomerId}
                    </li>

                    <li>
                      {' '}
                      Gender---
                      {client.Sex}
                    </li>
                    <li>
                      {' '}
                      Seat No---
                      {seats[i]}
                    </li>
                    <li>
                      {' '}
                      Document Number---
                      {client.DocumentNumber}
                    </li>
                    <li>
                      {' '}
                      Citizenship Code---
                      {client.CitizenshipCode}
                    </li>
                    <li>
                      {' '}
                      Amount---
                      {
                        ticketDetails?.ConfirmResults[0].OrderItemCustomers[i]
                          ?.Amount
                      }
                    </li>
                    <li>
                      {' '}
                      Fare---
                      {
                        ticketDetails?.ConfirmResults[0].OrderItemCustomers[i]
                          .Fare
                      }
                    </li>
                    <li>
                      {' '}
                      Tax---
                      {
                        ticketDetails?.ConfirmResults[0].OrderItemCustomers[i]
                          .Tax
                      }
                    </li>
                    <hr />
                    <br />
                  </ul>
                ))}
              </h3>
              <p>Total Amount-- {ticketDetails?.ConfirmResults[0].Amount}</p>
              <p>Total Fare-- {ticketDetails?.ConfirmResults[0].Fare}</p>
              <p>Total Tax-- {ticketDetails?.ConfirmResults[0].Tax}</p>
            </div>
          </div>
        </Modal>

        <Modal open={isLoading} footer={null} centered closable={false}>
          <div className="flex items-center justify-center gap-2 text-xl">
            <FaSpinner className="animate-spin" />
            <h1 className="font-bold text-center">
              Please wait, your request is being processed.
            </h1>
          </div>
        </Modal>

        <Modal open={false} footer={null} centered closable={false}>
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
