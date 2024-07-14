import copyReducer from '@/app/store/slices/copySlice'
import countriesReducer from '@/app/store/slices/countriesSlice'
import langReducer from '@/app/store/slices/langSlice'
import statsReducer from '@/app/store/slices/statsSlice'
import statusReducer from '@/app/store/slices/statusSlice'
import themeReducer from '@/app/store/slices/themeSlice'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    stats: statsReducer,
    status: statusReducer,
    theme: themeReducer,
    lang: langReducer,
    countries: countriesReducer,
    copy: copyReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
