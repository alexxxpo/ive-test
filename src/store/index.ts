import { configureStore } from '@reduxjs/toolkit'

import { setupListeners } from '@reduxjs/toolkit/query'
import { cardsDataApi } from './api/cardInfoQuery'

export const store = configureStore({
  reducer: {
    [cardsDataApi.reducerPath]: cardsDataApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cardsDataApi.middleware),
})
setupListeners(store.dispatch)