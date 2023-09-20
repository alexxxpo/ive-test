import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { ICardsData, IConnectionState, IDepartment } from './../../models'

export const cardsDataApi = createApi({
  reducerPath: 'cardsData',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://v1336-api-test.onrender.com/' }),
  endpoints: (builder) => ({
    getBrigadesData: builder.query<ICardsData[], void>({
      query: () => `getBrigadesData`,
    }),
    getDepartments: builder.query<IDepartment[], void>({
      query: () => `getDepartments`,
    }),
    getConnectionState: builder.query<IConnectionState[], void>({
      query: () => `getConnectionState`,
    }),
  }),
})

export const { useGetBrigadesDataQuery, useGetDepartmentsQuery, useGetConnectionStateQuery } = cardsDataApi