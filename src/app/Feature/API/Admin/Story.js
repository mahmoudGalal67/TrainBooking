import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import Url_Admin from '../../../../../UrlAdmin'

export const StoryApi = createApi({
  reducerPath: 'StoryApi',
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
  tagTypes: ['Story'],
  endpoints: (build) => ({
    getStories: build.query({
      query: () => ({
        url: `/story`,
        method: 'GET',
      }),
      providesTags: ['Story'],
    }),
    saveStory: build.mutation({
      query: (formData) => ({
        url: '/story',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Story'],
    }),
    delStory: build.mutation({
      query: (id) => ({
        url: `/story/${id}`,
        method: 'Delete',
      }),
      invalidatesTags: ['Story'],
    }),
    updateStory: build.mutation({
      query: ({ id, data }) => ({
        url: `/story/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Story'],
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

export const {
  useGetStoriesQuery,
  useSaveStoryMutation,
  useDelStoryMutation,
  useUpdateStoryMutation,
} = StoryApi
