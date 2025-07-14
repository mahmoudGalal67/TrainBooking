import { useEffect, useState } from 'react'
import { FaBed } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { message, Modal, Radio } from 'antd'
import { useSearchRoomStaysQuery } from '../../../app/Feature/API/Hotels'
import dayjs from 'dayjs'

const AvailableRoomsBox = ({ hotel, dataRoom, propertyId }) => {
  const [showModal, setShowModal] = useState(false)
  const [dataModal, setDataModal] = useState(null)
  const navigate = useNavigate()

  const [rooms, setRooms] = useState([])

  const roomType = rooms?.map((room) => {
    const hotelType = hotel.roomTypes.find((rt) => rt.id === room.roomType.id)
    return { id: room.roomType.id, data: hotelType }
  })

  function getDate(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
  }

  const dataRooms = useSearchRoomStaysQuery(
    {
      propertyId,
      arrivalDate: getDate(new Date(dataRoom?.arrivalDateTime)),
      departureDate: getDate(new Date(dataRoom?.departureDateTime)),
      adults: dataRoom.adult || 1,
      childAges: dataRoom.childAges,
    },
    { skip: !propertyId }
  )


  useEffect(() => {
    async function getRooms() {
      if (dataRooms?.error) {
        message.error('Failed to room loading. Please try again later.')
      } else {
        setRooms(dataRooms?.data?.roomStays)
      }
    }
    getRooms()
  }, [dataRooms, propertyId])

  function showDetails(data) {
    const cloneData = { ...data }
    const moreData = roomType.find((r) => r.id === data.roomType.id)
    cloneData.roomType = { ...cloneData.roomType, data: moreData.data }

    setShowModal(true)
    setDataModal(cloneData)
  }
  function cancelModal() {
    setShowModal(false)
    setDataModal(null)
  }
  function handleBooking() {
    const data = {
      hotelName: hotel?.name,
      stars: hotel?.stars || 0,
      addressLine: hotel?.contactInfo?.address?.addressLine,
      timeZone: hotel?.timeZone?.id,
      ...dataModal,
    }
    localStorage.setItem('roomData', JSON.stringify(data))
    navigate('/payment-services/hotels', { state: data })
  }

  if (dataRooms.isLoading) return <Skelaton />

  return (
    <>
      <div>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-800">
            {' '}
            Available Rooms
          </h2>
          <span className="text-md text-gray-500">
            Total Result {rooms?.length} Rooms
          </span>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {rooms?.length > 0 &&
            rooms?.map((room, i) => {
              const hotelType = hotel.roomTypes.find(
                (rt) => rt.id === room.roomType.id
              )
              return (
                <div className="relative rounded-lg shadow-md bg-white" key={i}>
                  <div className="relative"></div>
                  <div className="mt-4 px-4 pb-4">
                    <p className="text-lg font-semibold min-h-14 line-clamp-2">
                      {/* {room?.fullPlacementsName} */}
                      {hotelType?.name}
                    </p>
                    <div className="flex justify-between">
                      <div className="flex items-center mt-2">
                        <span className="text-xl text-primary font-bold">
                          price: {room?.total?.priceBeforeTax}{' '}
                          {room?.currencyCode}
                        </span>
                      </div>
                      <div className="flex items-center mt-2">
                        <span className="bg-green-100 py-0.5 px-2 font-bold rounded text-green-900">
                          Avilable: {room?.availability} rooms
                        </span>
                      </div>
                    </div>
                    <div className="text-gray-600 mt-2 sm:flex sm:justify-between">
                      <p className="flex flex-col font-bold mb-2">
                        check-in:{' '}
                        {dayjs(room?.stayDates?.arrivalDateTime).format(
                          'YYYY-MM-DD'
                        )}
                        <span>
                          Time:{' '}
                          <span className="bg-gray-300 p-0.5 rounded">
                            {dayjs(room?.stayDates?.arrivalDateTime).format(
                              'hh:mm A'
                            )}{' '}
                            ({hotel?.timeZone?.id})
                          </span>
                        </span>
                      </p>
                      <p className="flex flex-col font-bold">
                        check-out:{' '}
                        {dayjs(room?.stayDates?.departureDateTime).format(
                          'YYYY-MM-DD'
                        )}
                        <span>
                          Time:{' '}
                          <span className="bg-gray-300 p-0.5 rounded">
                            {dayjs(room?.stayDates?.departureDateTime).format(
                              'hh:mm A'
                            )}{' '}
                            ({hotel?.timeZone?.id})
                          </span>
                        </span>
                      </p>
                    </div>
                    <button
                      className="flex items-center mt-3 px-5 py-2 bg-primary text-white rounded-lg hover:bg-second transition-all duration-200 text-sm"
                      onClick={() => showDetails(room)}
                    >
                      <FaBed /> <span className="ml-2">Book Now</span>
                    </button>
                  </div>
                </div>
              )
            })}
          {rooms?.length == 0 && (
            <div className="text-xl border-8 p-2 shadow-lg">
              <p className="font-bold text-red-900">
                Unfortunately, there are no rooms available for the specified
                dates,Please change the date.
              </p>
              <button
                className="px-5 py-2 mt-2 bg-primary text-white rounded-lg hover:bg-second transition-all duration-200 text-md"
                onClick={() => {
                  navigate('/hotels/all')
                }}
              >
                {'Go To Hotels'}
              </button>
            </div>
          )}
        </div>
      </div>

      <Modal
        title={'Room Details'}
        open={showModal}
        onCancel={cancelModal}
        width={undefined}
        style={{
          minWidth: '70vw',
          maxWidth: '95vw',
        }}
        footer={[
          <button
            key={'cancel'}
            onClick={cancelModal}
            className="ml-2 px-5 py-2 border hover:bg-gray-200 rounded-lg transition-all duration-200 text-sm"
          >
            Cancel
          </button>,
          <button
            key={'booking'}
            onClick={handleBooking}
            className="ml-2 px-5 py-2 bg-primary text-white rounded-lg hover:bg-second transition-all duration-200 text-sm"
          >
            Book Now
          </button>,
        ]}
      >
        <div className="">
          <div className="p-4 border rounded-2xl shadow-sm bg-white space-y-2 w-full max-w-full">
            <h2 className="text-xl font-semibold text-gray-800">
              {dataModal?.fullPlacementsName}
            </h2>
            <span className="font-bold text-green-600">
              Room: {dataModal?.availability} available
            </span>
          </div>

          {dataModal?.roomType?.data?.images.length > 0 && (
            <div className="p-4 border rounded-2xl shadow-sm bg-white space-y-2 w-full max-w-full">
              <h2 className="text-xl font-semibold text-gray-800">
                Room Images
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {dataModal?.roomType?.data?.images?.map((img, index) => (
                  <img
                    key={index}
                    src={img.url}
                    alt={`room-${index}`}
                    className="rounded-lg w-full h-40 object-cover"
                  />
                ))}
              </div>
            </div>
          )}

          {/* <div>
            <h2 className="text-lg font-bold">
              {dataModal?.fullPlacementsName}
              <span className="font-bold text-green-600">
                Room: {dataModal?.availability} available
              </span>
            </h2>
          </div> */}
          {/* <h1 className="font-bold">Room Information</h1> */}
          {/* <div className="ml-2 font-bold"> */}
          {/* <p>ID : {dataModal?.roomType?.data?.id}</p> */}
          {/* <p>Category Code : {dataModal?.roomType?.data?.categoryCode}</p> */}
          {/* <p>Property name : {dataModal?.roomType?.data?.name}</p> */}
          {/* <p>Property type : {dataModal?.roomType?.data?.categoryName}</p> */}
          {/* <p> */}
          {/* Beds for adults : {dataModal?.roomType?.data?.occupancy?.adultBed} */}
          {/* </p> */}
          {/* <p>Extra beds : {dataModal?.roomType?.data?.occupancy?.extraBed}</p> */}
          {/* <p> */}
          {/* A child without a bed :{' '} */}
          {/* {dataModal?.roomType?.data?.occupancy?.childWithoutBed} */}
          {/* </p> */}
          {/* <p>Description : {dataModal?.roomType?.data?.description}</p> */}
          {/* </div> */}
          <div className="p-4 border rounded-2xl shadow-sm bg-white space-y-2 w-full max-w-full">
            <h2 className="text-xl font-semibold text-gray-800">
              Room Information
            </h2>
            <p>
              <span className="font-medium">ID:</span>{' '}
              {dataModal?.roomType?.data?.id}
            </p>
            <p>
              <span className="font-medium">Property name:</span>{' '}
              {dataModal?.roomType?.data?.name}
            </p>
            <p>
              <span className="font-medium">Property type:</span>{' '}
              {dataModal?.roomType?.data?.categoryName}
            </p>
            <p>
              <span className="font-medium">Beds for adults:</span>{' '}
              {dataModal?.roomType?.data?.occupancy?.adultBed}
            </p>
            <p>
              <span className="font-medium">Extra beds:</span>{' '}
              {dataModal?.roomType?.data?.occupancy?.extraBed}
            </p>
            <p>
              <span className="font-medium">A child without a bed:</span>{' '}
              {dataModal?.roomType?.data?.occupancy?.childWithoutBed}
            </p>
            <p>
              <span className="font-medium">🏠Room size:</span>{' '}
              {dataModal?.roomType?.data?.size?.value}{' '}
              {dataModal?.roomType?.data?.size?.unit === 'SquareMetre'
                ? 'm²'
                : dataModal?.roomType?.data?.size?.unit}
            </p>
          </div>
          <div className="p-4 border rounded-2xl shadow-sm bg-white space-y-2 w-full max-w-full">
            <h2 className="text-xl font-semibold text-gray-800">Amenities</h2>
            {dataModal?.roomType?.data?.amenities.length > 0 ? (
              dataModal?.roomType?.data?.amenities?.map((item, index) => (
                <ul key={index}>
                  <li>
                    {index + 1} - {item.name}
                  </li>
                </ul>
              ))
            ) : (
              <h2>No amenities available at this time</h2>
            )}
          </div>

          <div className="p-4 border rounded-2xl shadow-sm bg-white space-y-2 w-full max-w-full">
            <h2 className="text-xl font-semibold text-gray-800">
              Guest Information
            </h2>
            <ul className="m-1">
              <li>Adults: {dataModal?.guestCount?.adultCount}</li>
              <li>Children: {dataModal?.guestCount?.childAges?.length}</li>
            </ul>
          </div>

          {/* <h1 className="font-bold">
            Guest Information
            <ul className="m-1">
              <li>Adults: {dataModal?.guestCount?.adultCount}</li>
              <li>Children: {dataModal?.guestCount?.childAges?.length}</li>
            </ul>
          </h1> */}

          <div className="p-4 border rounded-2xl shadow-sm bg-white space-y-2 w-full max-w-full">
            <h2 className="text-xl font-semibold text-gray-800">
              Room Configuration
            </h2>
            <ul className="m-1">
              {dataModal?.roomType?.placements.map((placement, i) => {
                return (
                  <li key={i}>
                    {placement?.count + 'x'} {placement?.kind} (
                    {placement?.code})
                  </li>
                )
              })}
            </ul>
          </div>

          {/* <h1 className="font-bold">
            Room Configuration
            <ul className="m-1">
              {dataModal?.roomType?.placements.map((placement, i) => {
                return (
                  <li key={i}>
                    {placement?.count + 'x'} {placement?.kind} (
                    {placement?.code})
                  </li>
                )
              })}
            </ul>
          </h1> */}

          <div className="p-4 border rounded-2xl shadow-sm bg-white space-y-2 w-full max-w-full">
            <h2 className="text-xl font-semibold text-gray-800">
              Meal Plan Options
            </h2>
            <Radio.Group defaultValue={dataModal?.mealPlanCode}>
              {dataModal?.mealPlanCode === 'RoomOnly' ? (
                <Radio value={undefined}>
                  <p className="text-xs text-gray-500">
                    {dataModal?.mealPlanCode}
                  </p>
                  <p>
                    {dataModal?.total?.priceBeforeTax} {dataModal?.currencyCode}
                  </p>
                </Radio>
              ) : (
                <div className="flex flex-col">
                  <Radio value={dataModal?.mealPlanCode}>
                    <p className="text-xs text-gray-500">
                      Room{' '}
                      {dataModal?.includedServices?.map(
                        (service) => '+ ' + service?.mealPlanCode
                      )}
                    </p>
                    <p>
                      {dataModal?.total?.priceBeforeTax}{' '}
                      {dataModal?.currencyCode}
                    </p>
                  </Radio>
                </div>
              )}
            </Radio.Group>
          </div>

          {/* <h1 className="font-bold flex flex-col">
            Meal Plan Options
            <Radio.Group defaultValue={dataModal?.mealPlanCode}>
              {dataModal?.mealPlanCode === 'RoomOnly' ? (
                <Radio value={undefined}>
                  <p className="text-xs text-gray-500">
                    {dataModal?.mealPlanCode}
                  </p>
                  <p>
                    {dataModal?.total?.priceBeforeTax} {dataModal?.currencyCode}
                  </p>
                </Radio>
              ) : (
                <div className="flex flex-col">
                  <Radio value={dataModal?.mealPlanCode}>
                    <p className="text-xs text-gray-500">
                      Room{' '}
                      {dataModal?.includedServices?.map(
                        (service) => '+ ' + service?.mealPlanCode
                      )}
                    </p>
                    <p>
                      {dataModal?.total?.priceBeforeTax}{' '}
                      {dataModal?.currencyCode}
                    </p>
                  </Radio>
                </div>
              )}
            </Radio.Group>
          </h1> */}

          <div className="p-4 border rounded-xl bg-white shadow-sm space-y-2">
            <h3 className="text-lg font-semibold">Occupancy Breakdown</h3>
            <ul className="list-disc list-inside space-y-1">
              {dataModal?.roomType?.data?.placements.map((place, index) => (
                <li key={index}>
                  <span className="font-medium">{place.kind}</span>:{' '}
                  {place.count}
                  {place.minAge !== undefined && place.maxAge !== undefined && (
                    <span className="text-gray-600">
                      {' '}
                      (Age: {place.minAge}–{place.maxAge})
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 border rounded-2xl shadow-sm bg-white space-y-2 w-full max-w-full">
            <h2 className="text-xl font-semibold text-gray-800">
              Cancellation Policy
            </h2>
            <ul className="m-1">
              <li>
                - Free Cancellation Available:{' '}
                {dataModal?.cancellationPolicy?.freeCancellationPossible ? (
                  <strong>Yes</strong>
                ) : (
                  <strong>No</strong>
                )}
              </li>
              {dataModal?.cancellationPolicy?.freeCancellationPossible &&
                dataModal?.cancellationPolicy
                  ?.freeCancellationDeadlineLocal && (
                  <li>
                    ⏳ Free Cancellation Deadline:{' '}
                    <strong>
                      {dayjs(
                        dataModal?.cancellationPolicy
                          ?.freeCancellationDeadlineLocal
                      ).format('YYYY-MM-DD , hh:mm A')}{' '}
                      ({hotel?.timeZone?.id})
                    </strong>
                  </li>
                )}
              {dataModal?.cancellationPolicy?.penaltyAmount > 0 && (
                <li>
                  - Penalty Amount:{' '}
                  <strong>
                    {dataModal?.cancellationPolicy?.penaltyAmount}{' '}
                    {dataModal?.currencyCode}
                  </strong>
                </li>
              )}
            </ul>
          </div>

          {/* <h1 className="font-bold">
            Cancellation Policy
            <ul className="m-1">
              <li>
                - Free Cancellation Available:{' '}
                {dataModal?.cancellationPolicy?.freeCancellationPossible ? (
                  <strong>Yes</strong>
                ) : (
                  <strong>No</strong>
                )}
              </li>
              {dataModal?.cancellationPolicy?.freeCancellationPossible &&
                dataModal?.cancellationPolicy
                  ?.freeCancellationDeadlineLocal && (
                  <li>
                    ⏳ Free Cancellation Deadline:{' '}
                    <strong>
                      {dayjs(
                        dataModal?.cancellationPolicy
                          ?.freeCancellationDeadlineLocal
                      ).format('YYYY-MM-DD , hh:mm A')}
                    </strong>
                  </li>
                )}
              {dataModal?.cancellationPolicy?.penaltyAmount > 0 && (
                <li>
                  - Penalty Amount:{' '}
                  <strong>
                    {dataModal?.cancellationPolicy?.penaltyAmount}{' '}
                    {dataModal?.currencyCode}
                  </strong>
                </li>
              )}
            </ul>
          </h1> */}
        </div>
      </Modal>
    </>
  )
}

export default AvailableRoomsBox

function Skelaton() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8 animate-pulse">
        <div className="h-10 bg-gray-300 rounded w-1/3"></div>
        <div className="h-6 bg-gray-300 rounded w-1/4"></div>
      </div>
      <div className="grid grid-cols-1 gap-8">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="relative rounded-lg shadow-md bg-white animate-pulse"
          >
            <div className="relative h-40 bg-gray-300 rounded-t-lg"></div>
            <div className="mt-4 px-4 pb-4">
              <div className="h-6 bg-gray-300 rounded w-3/4"></div>
              <div className="flex justify-between mt-4">
                <div className="h-6 bg-gray-300 rounded w-1/3"></div>
                <div className="h-6 bg-gray-300 rounded w-1/3"></div>
              </div>
              <div className="text-gray-600 mt-4 sm:flex sm:justify-between">
                <div className="h-5 bg-gray-300 rounded w-1/2"></div>
                <div className="h-5 bg-gray-300 rounded w-1/2"></div>
              </div>
              <div className="h-10 bg-gray-300 rounded mt-4 w-full"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
