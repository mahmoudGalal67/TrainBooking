import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Url_Admin from '../../../../../UrlAdmin'

export const ProductApi = createApi({
  reducerPath: 'ProductApi',
  baseQuery: fetchBaseQuery({
    baseUrl: Url_Admin,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token-matroshka-admin')
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['Products', 'categories'],
  endpoints: (build) => ({
    addCategory: build.mutation({
      query: (categoryData) => ({
        url: `/category`,
        method: 'POST',
        body: categoryData,
      }),
      invalidatesTags: ['categories'],
    }),
    removeCategory: build.mutation({
      query: (id) => ({
        url: `/category/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['categories'],
    }),
    updateCategory: build.mutation({
      query: ({ id, data }) => ({
        url: `/category/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['categories'],
    }),
    addProduct: build.mutation({
      query: (categoryData) => ({
        url: `/product`,
        method: 'POST',
        body: categoryData,
      }),
      invalidatesTags: ['Products'],
    }),
    removeProduct: build.mutation({
      query: (id) => ({
        url: `/product/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Products'],
    }),
    updateProduct: build.mutation({
      query: ({ id, data }) => ({
        url: `/product/${id}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Products'],
    }),
  }),
})

export const {
  useAddCategoryMutation,
  useRemoveCategoryMutation,
  useUpdateCategoryMutation,

  useAddProductMutation,
  useRemoveProductMutation,
  useUpdateProductMutation,
} = ProductApi
