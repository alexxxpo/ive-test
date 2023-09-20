import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { ICardsData } from './../../models'

export const cardsDataApi = createApi({
  reducerPath: 'cardsData',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://v1336-api-test.onrender.com/' }),
  endpoints: (builder) => ({
    getBrigadesData: builder.query<ICardsData[], void>({
      query: () => `getBrigadesData`,
    }),
  }),
})

export const { useGetBrigadesDataQuery } = cardsDataApi