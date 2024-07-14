import { RootState } from '@/app/store'
import { createSlice } from '@reduxjs/toolkit'

export interface ICopyState {
  value: string
}

const initialState: ICopyState = {
  value: 'copy',
}

export const copySlice = createSlice({
  name: 'copy',
  initialState,
  reducers: {
    setCopy: (state) => {
      state.value = 'copy'
    },
    setCopied: (state) => {
      state.value = 'copied'
    },
  },
})

export const { setCopy, setCopied } = copySlice.actions
export const selectCopy = (state: RootState) => state.copy.value
export default copySlice.reducer
