import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import base_url from '../../../../base_url'
import qs from 'qs'

export const UserApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${base_url}`,
    prepareHeaders: (headers,{getState}) => {
      const token = localStorage.getItem('token-matroshka-user')
      const language = localStorage.getItem('userLanguage') || 'en'
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }

      headers.set('Accept-Language', language)

      return headers
    },
  }),
  reducerPath: 'UserApi',
  endpoints: (build) => ({
    saveUser: build.mutation({
      query: (userData) => ({
        url: `/auth/register`,
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['saveUser'],
    }),
    loginUser: build.mutation({
      query: (userData) => ({
        url: `/auth/login`,
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['loginUser'],
    }),
    resendOtp: build.mutation({
      query: (userData) => ({
        url: `/auth/resend-otp`,
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['resendOtp'],
    }),
    resetPassword: build.mutation({
      query: (userData) => ({
        url: `/auth/reset-password`,
        method: 'PUT',
        body: userData,
      }),
      invalidatesTags: ['reset-password'],
    }),
    verifyEmail: build.mutation({
      query: (userData) => ({
        url: `/auth/verify-email`,
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['verifyEmail'],
    }),
    authGoogle: build.mutation({
      query: () => ({
        url: '/auth/google',
        method: 'GET',
      }),
    }),
    logOut: build.mutation({
      query: () => {
        const token = localStorage.getItem('token_Front_Mied')
        return {
          url: '/auth/logout',
          method: 'GET',
          headers: {
            Authorization: token ? `Bearer ${token}` : '',
          },
        }
      },
    }),
    updateProfile: build.mutation({
      query: (formData) => ({
        url: '/auth/update-profile',
        method: 'PUT',
        body: qs.stringify(formData),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }),
      invalidatesTags: ['User'],
    }),
    changeYourPassword: build.mutation({
      query: (formData) => ({
        url: '/auth/change-password',
        method: 'PUT',
        body: qs.stringify(formData),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }),
      invalidatesTags: ['User'],
    }),

    getProfileData: build.query({
      query: () => ({
        url: `/auth/showUser`,
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    getAllUsers: build.query({
      query: () => ({
        url: `/auth/showUser`,
        method: 'GET',
      }),
      providesTags: ['User'],
    }),
    getNotifications: build.query({
      query: (id) => ({
        url: `/notifications?user_id=${id}`,
        method: 'GET',
      }),
      providesTags: ['Notifications'],
    }),
  }),
})

export const {
  useSaveUserMutation,
  useLoginUserMutation,
  useResendOtpMutation,
  useResetPasswordMutation,
  useVerifyEmailMutation,
  useAuthGoogleMutation,
  useLogOutMutation,
  useUpdateProfileMutation,
  useGetProfileDataQuery,
  useChangeYourPasswordMutation,
  useGetNotificationsQuery,
} = UserApi
