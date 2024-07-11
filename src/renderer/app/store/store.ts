import langReducer from '@/app/store/langSlice'
import statsReducer from '@/app/store/statsSlice'
import statusReducer from '@/app/store/statusSlice'
import themeReducer from '@/app/store/themeSlice'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    stats: statsReducer,
    status: statusReducer,
    theme: themeReducer,
    lang: langReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
