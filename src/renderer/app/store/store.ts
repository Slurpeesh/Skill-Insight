import statsReducer from '@/app/store/statsSlice'
import statusReducer from '@/app/store/statusSlice'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    stats: statsReducer,
    status: statusReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
