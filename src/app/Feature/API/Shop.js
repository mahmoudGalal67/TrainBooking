import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import base_url from '../../../../base_url'

export const ShopApi = createApi({
  reducerPath: 'ShopApi',
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
  tagTypes: ['Product', 'Cart'],
  endpoints: (build) => ({
    ShowProduct: build.query({
      query: ({ categoryId = 0, page }) => ({
        url: `/product/${categoryId}?page=${page}`,
        method: 'GET',
      }),
      providesTags: ['Product'],
    }),
    ShowCategory: build.query({
      query: () => ({
        url: `/category`,
        method: 'GET',
      }),
      providesTags: ['Product'],
    }),
    ShowProductCart: build.query({
      query: () => ({
        url: `/cart`,
        method: 'GET',
      }),
      providesTags: ['Cart'],
    }),
    addToCart: build.mutation({
      query: (cartData) => ({
        url: `/cart`,
        method: 'POST',
        body: cartData,
      }),
      invalidatesTags: ['Cart'],
    }),
    removeFromCart: build.mutation({
      query: (id) => ({
        url: `/cart/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Cart'],
    }),
    updateProductInCart: build.mutation({
      query: ({ product_id, quantity }) => ({
        url: `/cart/${product_id}`,
        method: 'PATCH',
        body: { product_id, quantity },
      }),
      invalidatesTags: ['Cart'],
    }),
  }),
})

export const {
  useShowProductQuery,
  useShowCategoryQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useUpdateProductInCartMutation,
  useShowProductCartQuery,
} = ShopApi
