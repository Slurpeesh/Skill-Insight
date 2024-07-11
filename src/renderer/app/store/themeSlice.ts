import { RootState } from '@/app/store/store'
import { createSlice } from '@reduxjs/toolkit'

const initialTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
  ? 'dark'
  : 'light'

export interface IThemeState {
  value: string
}

const initialState: IThemeState = {
  value: initialTheme,
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setLight: (state) => {
      state.value = 'light'
    },
    setDark: (state) => {
      state.value = 'dark'
    },
  },
})

export const { setLight, setDark } = themeSlice.actions
export const selectTheme = (state: RootState) => state.theme.value
export default themeSlice.reducer
