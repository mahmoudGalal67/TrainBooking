import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import base_url from '../../../../base_url'

export const PaymentApi = createApi({
  reducerPath: 'PaymentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: base_url,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token-matroshka-user')
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['Payment'],
  endpoints: (build) => ({
    paymentStripe: build.mutation({
      query: (paymentData) => ({
        url: `/payment/stripe/sendPayment`,
        method: 'POST',
        body: paymentData,
      }),
      invalidatesTags: ['Payment'],
    }),
    getPaymentsStripeUser: build.query({
      query: () => `/payment/user/payments`,
      providesTags: ['Payment'],
    }),
    getCashbackUser: build.query({
      query: () => `/payment/user/cashback`,
      providesTags: ['Payment'],
    }),
  }),
})

export const {
  usePaymentStripeMutation,
  useGetPaymentsStripeUserQuery,
  useGetCashbackUserQuery,
} = PaymentApi
