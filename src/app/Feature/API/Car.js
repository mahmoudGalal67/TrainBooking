import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const CarApi = createApi({
  reducerPath: 'CarApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://matroshka-travel.com/api',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token-matroshka-user')
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['Car'],
  endpoints: (build) => ({
    carReservation: build.mutation({
      query: (data) => ({
        url: `/available-cars`,
        method: 'Post',
        body: data,
      }),
      invalidatesTags: ['Car'],
    }),
    carLocation: build.query({
      query: () => ({
        url: `/v1/location`,
        method: 'Get',
      }),
      providesTags: ['Car'],
    }),

    // sendMessage: build.mutation({
    //   query: (message) => ({
    //     url: `/chat/send-message`,
    //     method: 'POST',
    //     body: message,
    //   }),
    //   invalidatesTags: ['Chat'],
    // }),
  }),
})

export const { useCarReservationMutation, useCarLocationQuery } = CarApi
