import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Url_Admin from '../../../../../UrlAdmin'

export const ShowUserApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${Url_Admin}`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token-matroshka-admin')
      const language = localStorage.getItem('userLanguage') || 'en'
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }

      headers.set('Accept-Language', language)

      return headers
    },
  }),
  reducerPath: 'ShowUserApi',
  endpoints: (build) => ({
    getAllUsers: build.query({
      query: ({ type, page = 1 }) => ({
        url: `/auth/showAll?type=${type}&page=${page}`,
        method: 'GET',
      }),
      providesTags: ['Users'],
    }),
  }),
})

export const { useGetAllUsersQuery } = ShowUserApi
