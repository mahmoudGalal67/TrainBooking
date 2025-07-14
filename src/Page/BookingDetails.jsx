import img from '../assets/Img/check.jpg'
import { Link, useParams } from 'react-router-dom'
import {
  useCalculateCancellationPenaltyQuery,
  useCancelBookingMutation,
  useGetBookingDetailsQuery,
} from '../app/Feature/API/Hotels'
import dayjs from 'dayjs'
import { Input, Modal } from 'antd'
import { useState } from 'react'
import { FaCheck, FaSpinner } from 'react-icons/fa'
import { AiOutlineReload } from 'react-icons/ai'
const BookingDetails = () => {
  const { bookingNumber } = useParams()
  const { data, isLoading, isError } = useGetBookingDetailsQuery(bookingNumber)
  const [cancel, { isLoading: isLoadCancel, isSuccess: isSuccessCancel }] =
    useCancelBookingMutation()
  const booking = data?.booking
  const [show, setShow] = useState(false)
  const [cancelShow, setCancelShow] = useState(false)
  const [reasonText, setReasonText] = useState('')
  const [startCalculate, setStartCalculate] = useState(false)

  const details = {
    number: booking?.number,
    time: booking?.createdDateTime,
  }

  let { data: penalty, isLoading: loadPenalty } =
    useCalculateCancellationPenaltyQuery(details, {
      skip: !startCalculate,
    })

  async function handleCancelOrder() {
    const data = {
      number: booking.number,
      reason: reasonText,
      expectedPenaltyAmount: penalty?.penaltyAmount,
    }

    setCancelShow(false)
    await cancel(data)
  }

  function handleShowCancel() {
    setShow(false)
    setCancelShow(true)
  }

  if (isError) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <div className="border mx-auto rounded-lg p-4 shadow-lg bg-white flex flex-col">
          <div className="flex justify-between items-center border-b pb-2 mb-2">
            <h3 className="font-bold text-lg text-primary">Error</h3>
          </div>
          <div className="flex justify-between items-center text-gray-700 text-sm mb-2">
            <span className="font-semibold text-md">
              The identifier is incorrect. Please check and verify again.
            </span>
          </div>
          <Link
            to={'/hotels'}
            className="text-center mt-4 w-full bg-orange-500 text-white py-2 rounded-md text-lg font-semibold"
          >
            Go to Hotels Search
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <div
        className="relative h-[450px] bg-cover bg-center"
        style={{ backgroundImage: `url(${img})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <section className="relative h-full flex flex-col items-center justify-center text-center py-12 px-4">
          <div className="relative z-10 text-white max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Booking Details
            </h1>
          </div>
        </section>
      </div>
      {isLoading ? (
        <Skeleton />
      ) : (
        <div className="bg-white px-4 md:px-8  pt-12 pb-12">
          <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-2 min-w-[100%] p-6 bg-white">
            <div className="border rounded-lg p-4 shadow-lg bg-white flex flex-col w-full">
              <div className="flex justify-between items-center border-b pb-2 mb-2">
                <h3 className="font-bold text-lg text-primary">
                  Booking Information
                </h3>
              </div>
              <div className="flex justify-between items-center text-gray-700 text-sm mb-2">
                <span className="font-semibold text-md">Booking Number</span>
                <span className="font-semibold text-md">{booking?.number}</span>
              </div>
              <div className="flex justify-between items-center text-gray-700 text-sm mb-2">
                <span className="font-semibold text-md">Booking Status</span>
                <span className="font-semibold text-md">{booking?.status}</span>
              </div>
              <div className="flex justify-between items-center text-gray-700 text-sm mb-2">
                <span className="font-semibold text-md">Property ID</span>
                <span className="font-semibold text-md">
                  {booking?.propertyId}
                </span>
              </div>
              <div className="flex justify-between items-center text-gray-700 text-sm mb-2">
                <span className="font-semibold text-md">Currency</span>
                <span className="font-semibold text-md">
                  {booking?.currencyCode}
                </span>
              </div>
            </div>
            <div className="border rounded-lg p-4 shadow-lg bg-white flex flex-col w-full">
              <div className="flex justify-between items-center border-b pb-2 mb-2">
                <h3 className="font-bold text-lg text-primary">
                  Customer Information
                </h3>
              </div>
              <div className="flex justify-between items-center text-gray-700 text-sm mb-2">
                <span className="font-semibold text-md">Customer Name</span>
                <span className="font-semibold text-md">
                  {booking?.customer?.firstName} {booking?.customer?.lastName}
                </span>
              </div>
              <div className="flex justify-between items-center text-gray-700 text-sm mb-2">
                <span className="font-semibold text-md">Citizenship</span>
                <span className="font-semibold text-md">
                  {booking?.customer?.citizenship || 'N/A'}
                </span>
              </div>
              <div className="flex justify-between items-center text-gray-700 text-sm mb-2">
                <span className="font-semibold text-md">Email</span>
                <span className="font-semibold text-md">
                  {booking?.customer?.contacts?.emails[0]?.emailAddress}
                </span>
              </div>
              <div className="flex justify-between items-center text-gray-700 text-sm mb-2">
                <span className="font-semibold text-md">Phone</span>
                <span className="font-semibold text-md">
                  {booking?.customer?.contacts?.phones[0]?.phoneNumber}
                </span>
              </div>
              <div className="flex justify-between items-center text-gray-700 text-sm mb-2">
                <span className="font-semibold text-md">Customer Comment</span>
                <span className="font-semibold text-md">
                  {booking?.customer?.comment}
                </span>
              </div>
            </div>
            <div className="border rounded-lg p-4 shadow-lg bg-white flex flex-col w-full">
              <div className="flex justify-between items-center border-b pb-2 mb-2">
                <h3 className="font-bold text-lg text-primary">
                  Room 1 Details
                </h3>
              </div>
              <div className="flex justify-between items-center text-gray-700 text-sm mb-2">
                <span className="font-semibold text-md">Room Type</span>
                <span className="font-semibold text-md">
                  <ul>
                    {booking?.roomStays[0]?.roomType?.placements.map((e, i) => {
                      return (
                        <li key={i}>
                          {e.count}x {e.kind} ({e.code}) - ( {i + 1} )
                        </li>
                      )
                    })}
                  </ul>
                </span>
              </div>
              <div className="flex justify-between items-center text-gray-700 text-sm mb-2">
                <span className="font-semibold text-md">Room ID</span>
                <span className="font-semibold text-md">
                  {booking?.roomStays[0]?.roomType?.id}
                </span>
              </div>
              <div className="flex justify-between items-center text-gray-700 text-sm mb-2">
                <span className="font-semibold text-md">Chick In</span>
                <span className="font-semibold text-md">
                  {dayjs(
                    booking?.roomStays[0]?.stayDates?.arrivalDateTime
                  ).format('ddd , MM DD')}
                </span>
              </div>
            </div>
          </div>
          {booking?.status === 'Confirmed' && (
            <button
              className="mt-4 w-full bg-orange-500 text-white py-2 rounded-md text-lg font-semibold"
              onClick={() => {
                setShow(true)
                setStartCalculate(true)
              }}
            >
              Cancellation
            </button>
          )}
        </div>
      )}
      <Modal
        open={show}
        onCancel={() => setShow(false)}
        footer={null}
        title={'Cancel Booking'}
        centered
      >
        <div className="font-bold">
          <ul className="m-1">
            <li>
              room type
              {booking?.roomStays[0]?.roomType?.placements.map((e, i) => {
                return (
                  <p className="ml-3" key={i}>
                    ( {i + 1} ) - {e.count}x {e.kind} ({e.code})
                  </p>
                )
              })}
            </li>
            <li>
              checkIn data and time :{' '}
              {dayjs(booking?.roomStays[0]?.stayDates?.arrivalDateTime).format(
                'YYYY-MM-DD , hh:mm A'
              )}
            </li>
            <li>
              checkOut data and time :{' '}
              {dayjs(
                booking?.roomStays[0]?.stayDates?.departureDateTime
              ).format('YYYY-MM-DD , hh:mm A')}
            </li>
            <li>
              no of adults : {booking?.roomStays[0]?.guestCount?.adultCount}
            </li>
            <li>
              no of children :{' '}
              {booking?.roomStays[0]?.guestCount?.childAges?.length}
            </li>
            <li>no of rooms : 1</li>
            <hr className="mt-2 mb-2 border-2 border-gray-600" />
            <li>
              Price : {booking?.total?.priceBeforeTax} {booking?.currencyCode}
            </li>
            <li>
              Tax : {booking?.total?.taxAmount} {booking?.currencyCode}
            </li>
            <li>
              Total :{' '}
              {booking?.total?.priceBeforeTax + booking?.total?.taxAmount}{' '}
              {booking?.currencyCode}
            </li>
            <hr className="mt-2 mb-2 border-2 border-gray-600" />
            <li>
              {booking?.cancellationPolicy?.freeCancellationPossible &&
                booking?.cancellationPolicy?.freeCancellationDeadlineLocal ===
                  null && (
                  <p className="text-green-600 relative before:contents-[''] before:absolute before:left-[-10px] before:top-[50%] before:translate-y-[-50%] before:bg-green-700 before:w-[5px] before:h-[5px] rounded-full">
                    cancellation is free
                  </p>
                )}
              {booking?.cancellationPolicy?.freeCancellationPossible &&
                booking?.cancellationPolicy?.freeCancellationDeadlineLocal && (
                  <div>
                    <p className="text-green-600 relative before:contents-[''] before:absolute before:left-[-10px] before:top-[50%] before:translate-y-[-50%] before:bg-green-700 before:w-[5px] before:h-[5px] rounded-full">
                      cancellation is free before:{' '}
                      {dayjs(
                        booking?.cancellationPolicy
                          ?.freeCancellationDeadlineLocal
                      ).format('D MMMM YYYY')}
                    </p>
                    <p className="text-red-600 relative before:contents-[''] before:absolute before:left-[-10px] before:top-[50%] before:translate-y-[-50%] before:bg-red-700 before:w-[5px] before:h-[5px] rounded-full">
                      if you cancel before{' '}
                      {dayjs(
                        booking?.cancellationPolicy
                          ?.freeCancellationDeadlineLocal
                      ).format('D MMMM YYYY')}
                      , no charges will apply. After that, the full booking
                      amount of {penalty?.penaltyAmount} {booking?.currencyCode}{' '}
                      will be charged
                    </p>
                  </div>
                )}
              {!booking?.cancellationPolicy?.freeCancellationPossible && (
                <p className="text-red-600 flex items-center gap-1 relative before:contents-[''] before:absolute before:left-[-10px] before:top-[50%] before:translate-y-[-50%] before:bg-red-700 before:w-[5px] before:h-[5px] rounded-full">
                  Free cancellation is not available, you will be charged{' '}
                  {loadPenalty ? (
                    <AiOutlineReload className="animate-spin" />
                  ) : (
                    penalty?.penaltyAmount
                  )}{' '}
                  {booking?.currencyCode}
                </p>
              )}
            </li>
            <button
              onClick={handleShowCancel}
              className="w-full mt-5 ml-2 px-5 py-2 bg-primary text-white rounded-lg hover:bg-second transition-all duration-200 text-sm"
            >
              Cancel Order
            </button>
          </ul>
        </div>
      </Modal>

      <Modal
        open={cancelShow}
        onCancel={() => setCancelShow(false)}
        footer={null}
        title={'Cancel Booking'}
        centered
      >
        <div className="font-bold">
          <h1 className="text-xl mb-2">
            are you sure you want to cancel this booking ?
          </h1>
          {penalty?.penaltyAmount > 0 ? (
            <h3 className="text-sm text-red-500 mb-2 mt-2">
              you will be charged{' '}
              {loadPenalty ? (
                <AiOutlineReload className="animate-spin" />
              ) : (
                penalty?.penaltyAmount
              )}{' '}
              {booking?.currencyCode}
            </h3>
          ) : (
            <p className="mb-3 text-green-600 relative before:contents-[''] before:absolute before:left-[-10px] before:top-[50%] before:translate-y-[-50%] before:bg-green-700 before:w-[5px] before:h-[5px] rounded-full">
              cancellation is free
            </p>
          )}
          <Input.TextArea
            row={3}
            placeholder="reason for cancellation (oprional)"
            allowClear
            onChange={(e) => setReasonText(e.target.value)}
          ></Input.TextArea>
          <button
            onClick={handleCancelOrder}
            className="w-full mt-5 ml-2 px-5 py-2 bg-primary text-white rounded-lg hover:bg-second transition-all duration-200 text-sm"
          >
            Cancel Order
          </button>
        </div>
      </Modal>
      <Modal open={isLoadCancel} footer={null} centered closable={false}>
        <div className="flex items-center justify-center gap-2 text-xl">
          <FaSpinner className="animate-spin" />
          <h1 className="font-bold text-center">
            Please wait, your request is being processed.
          </h1>
        </div>
      </Modal>
      <Modal open={isSuccessCancel} footer={null} centered closable={false}>
        <div className="flex flex-col items-center justify-center gap-2 text-xl">
          <div className="flex gap-2 items-center">
            <FaCheck className="text-green-600 text-2xl" />
            <h1 className="font-bold text-center">
              The reservation was successfully cancelled.
            </h1>
          </div>
          <button
            className="mt-4 w-full bg-orange-500 text-white py-2 rounded-md text-lg font-semibold"
            onClick={() => location.reload()}
          >
            Reload
          </button>
        </div>
      </Modal>
    </>
  )
}

function Skeleton() {
  return (
    <div className="bg-white px-4 md:px-8 pt-12 pb-12">
      <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-2 min-w-[100%] p-6 bg-white">
        <div className="border rounded-lg p-4 shadow-lg bg-white flex flex-col w-full">
          <div className="flex justify-between items-center border-b pb-2 mb-2">
            <div className="h-6 w-40 bg-gray-300 animate-pulse rounded-md"></div>
          </div>
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="flex justify-between items-center text-gray-700 text-sm mb-2"
              >
                <div className="h-5 bg-gray-300 animate-pulse rounded-md w-1/3"></div>
                <div className="h-5 bg-gray-300 animate-pulse rounded-md w-1/3"></div>
              </div>
            ))}
        </div>
        <div className="border rounded-lg p-4 shadow-lg bg-white flex flex-col w-full">
          <div className="flex justify-between items-center border-b pb-2 mb-2">
            <div className="h-6 w-40 bg-gray-300 animate-pulse rounded-md"></div>
          </div>
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="flex justify-between items-center text-gray-700 text-sm mb-2"
              >
                <div className="h-5 bg-gray-300 animate-pulse rounded-md w-1/3"></div>
                <div className="h-5 bg-gray-300 animate-pulse rounded-md w-1/3"></div>
              </div>
            ))}
        </div>

        <div className="border rounded-lg p-4 shadow-lg bg-white flex flex-col w-full">
          <div className="flex justify-between items-center border-b pb-2 mb-2">
            <div className="h-6 w-40 bg-gray-300 animate-pulse rounded-md"></div>
          </div>
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="flex justify-between items-center text-gray-700 text-sm mb-2"
              >
                <div className="h-5 bg-gray-300 animate-pulse rounded-md w-1/3"></div>
                <div className="h-5 bg-gray-300 animate-pulse rounded-md w-1/3"></div>
              </div>
            ))}
        </div>
      </div>

      <div className="mt-4 w-full h-10 bg-gray-300 animate-pulse rounded-md"></div>
    </div>
  )
}

export default BookingDetails
