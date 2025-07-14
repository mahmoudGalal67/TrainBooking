import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
  Base_Content,
  Base_Reservation,
  Base_Search,
} from '../../../../base_url'

export const HotelsApi = createApi({
  reducerPath: 'HotelsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/apiProperties',
    prepareHeaders: (headers) => {
      headers.set('Authorization', 'No-Auth')
      headers.set('X-API-KEY', '2dcdc433-4d54-4079-8ee0-293e36e0446c')
      return headers
    },
  }),

  tagTypes: ['Hotels'],
  endpoints: (build) => ({
    allHotels: build.query({
      query: () => `${Base_Content}/properties?include=all`,
      keepUnusedDataFor: 86400,
      async onQueryStarted(id, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          localStorage.setItem(
            `cachedHotels`,
            JSON.stringify({ data, timestamp: Date.now() })
          )
        } catch (err) {
          console.error('error cache: ' + err)
        }
      },
    }),
    getHotel: build.query({
      query: (id) => ({
        url: `${Base_Content}/properties/${id}`,
        method: 'GET',
      }),
      keepUnusedDataFor: 86400,
      async onQueryStarted(id, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled
          localStorage.setItem(
            `cachedHotel-${id}`,
            JSON.stringify({ data, timestamp: Date.now() })
          )
        } catch (err) {
          console.error('error cache: ' + err)
        }
      },
    }),
    searchRooms: build.mutation({
      query: (data) => ({
        method: 'POST',
        url: `${Base_Search}/properties/room-stays/search`,
        body: {
          // 'check-in': data.checkIn,
          ArrivalDate: data.arrivalDate,
          DepartureDate: data.departureDate,
          adults: data.adults,
          childAges: data.childAges,
          propertyIds: data.propertyIds,
        },
      }),
      invalidatesTags: ['Hotels'],
    }),
    searchRoomStays: build.query({
      query: (data) => {
        const params = new URLSearchParams({
          ArrivalDate: data.arrivalDate,
          DepartureDate: data.departureDate,
          adults: data.adults,
          // includeExtraStays: true,
          // includeExtraServices: true,
        })
        data.childAges.forEach((age) => params.append('childAges', age))
        return {
          method: 'GET',
          url: `${Base_Search}/properties/${data.propertyId}/room-stays?${params.toString()}`,
        }
      },
      invalidatesTags: ['Hotels'],
    }),
    verifyHotel: build.mutation({
      query: (data) => ({
        url: `${Base_Reservation}/bookings/verify`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Hotels'],
    }),
    BookingHotel: build.mutation({
      query: (data) => ({
        url: `${Base_Reservation}/bookings`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Hotels'],
    }),
    getBookingDetails: build.query({
      query: (number) => ({
        url: `${Base_Reservation}/bookings/${number}`,
        method: 'GET',
      }),
    }),
    cancelBooking: build.mutation({
      query: ({ number, reason, expectedPenaltyAmount }) => ({
        url: `${Base_Reservation}/bookings/${number}/cancel`,
        method: 'POST',
        body: { reason, expectedPenaltyAmount },
      }),
    }),
    calculateCancellationPenalty: build.query({
      query: (data) => ({
        url: `${Base_Reservation}/bookings/${data.number}/calculate-cancellation-penalty?cancellationDateTimeUtc=${data.time}`,
        method: 'GET',
      }),
    }),
  }),
})

export const {
  useAllHotelsQuery,
  useGetHotelQuery,
  useSearchRoomsMutation,
  useVerifyHotelMutation,
  useBookingHotelMutation,
  useGetBookingDetailsQuery,
  useCancelBookingMutation,
  useSearchRoomStaysQuery,
  useCalculateCancellationPenaltyQuery,
} = HotelsApi
