import { RootState } from '@/app/store'
import { createSlice } from '@reduxjs/toolkit'

let userLanguage = navigator.language

if (userLanguage !== 'ru') {
  userLanguage = 'en'
}

export interface ILangState {
  value: string
}

const initialState: ILangState = {
  value: userLanguage,
}

export const langSlice = createSlice({
  name: 'lang',
  initialState,
  reducers: {
    setEn: (state) => {
      state.value = 'en'
    },
    setRu: (state) => {
      state.value = 'ru'
    },
  },
})

export const { setEn, setRu } = langSlice.actions
export const selectLang = (state: RootState) => state.lang.value
export default langSlice.reducer
