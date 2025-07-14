import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import base_url from '../../../../base_url'

export const ChatApi = createApi({
  reducerPath: 'ChatApi',
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
  tagTypes: ['Chat'],
  endpoints: (build) => ({
    getUserConversations: build.query({
      query: () => ({
        url: `/chat/conversations`,
        method: 'GET',
      }),
      providesTags: ['Chat'],
    }),
    getChats: build.query({
      query: () => ({
        url: `/chat/getChats`,
        method: 'GET',
      }),
      providesTags: ['Chat'],
    }),
    getUserMessages: build.query({
      query: (conversationId) => ({
        url: `/chat/messages/${conversationId}`,
        method: 'GET',
      }),
      providesTags: ['Chat'],
    }),
    getUnReadMessagesCount: build.query({
      query: (conversationId) => ({
        url: `/chat/unreadMessages/${conversationId}`,
        method: 'GET',
      }),
      providesTags: ['Chat'],
    }),

    sendMessage: build.mutation({
      query: (message) => ({
        url: `/chat/send-message`,
        method: 'POST',
        body: message,
      }),
      invalidatesTags: ['Chat'],
    }),

    sendImage: build.mutation({
      query: (message) => ({
        url: `/chat/send-image`,
        method: 'POST',
        body: message,
      }),
      invalidatesTags: ['Chat'],
    }),
  }),
})

export const {
  useGetUserConversationsQuery,
  useGetUserMessagesQuery,
  useSendMessageMutation,
  useSendImageMutation,
  useGetUnReadMessagesCountQuery,
  useGetChatsQuery,
} = ChatApi
