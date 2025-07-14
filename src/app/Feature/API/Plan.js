import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// const url = 'https://api.sputnik8.com/v1'

export const PlanApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://matroshka-travel.com/proxy-plans',
  }),
  reducerPath: 'PlanApi',
  endpoints: (build) => ({
    getPlans: build.query({
      query: () => ({
        url: '/products?lang=en',
        method: 'GET',
      }),
    }),
    getPlanById: build.query({
      query: (id) => ({
        url: `/products/${id}?lang=en`,
        method: 'GET',
      }),
    }),
    getPlanByCityId: build.query({
      query: (id) => ({
        url: `/products?city_id=${id}&lang=en`,
        method: 'GET',
      }),
    }),
    getPlanByCityIdAndCategory: build.query({
      query: ({ id, slug }) => ({
        url: `/products?city_id=${id}&category_slug=${slug}&lang=en`,
        method: 'GET',
      }),
    }),
    getCities: build.query({
      query: () => ({
        url: 'cities?lang=en',
        method: 'GET',
      }),
    }),
    getCitiesById: build.query({
      query: (id) => ({
        url: `cities/${id}?lang=en`,
        method: 'GET',
      }),
    }),
    getCountries: build.query({
      query: (id) => ({
        url: `countries?lang=en`,
        method: 'GET',
      }),
    }),
    getCategory: build.query({
      query: (id) => ({
        url: `cities/${id}/categories?lang=en`,
        method: 'GET',
      }),
    }),
  }),
})

export const {
  useGetPlansQuery,
  useGetPlanByIdQuery,
  useGetCitiesQuery,
  useGetCitiesByIdQuery,
  useGetCountriesQuery,
  useGetPlanByCityIdQuery,
  useGetCategoryQuery,
  useGetPlanByCityIdAndCategoryQuery,
} = PlanApi
