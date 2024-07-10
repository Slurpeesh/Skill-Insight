import { RootState } from '@/app/store/store'
import { createSlice } from '@reduxjs/toolkit'

export interface IStatusState {
  value: string
}

const initialState: IStatusState = {
  value: 'initial',
}

export const statusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    setWaiting: (state) => {
      state.value = 'waiting'
    },
    setReady: (state) => {
      state.value = 'ready'
    },
    setError: (state) => {
      state.value = 'error'
    },
  },
})

export const { setWaiting, setReady, setError } = statusSlice.actions
export const selectStatus = (state: RootState) => state.status.value
export default statusSlice.reducer
