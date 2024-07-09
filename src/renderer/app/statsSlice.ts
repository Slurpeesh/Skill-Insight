import { RootState } from '@/app/store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IStatsState {
  value: string
}

const initialState: IStatsState = {
  value: 'Here are some results...',
}

export const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    setWaiting: (state) => {
      state.value = 'Getting stats...'
    },
    setReady: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    },
  },
})

export const { setWaiting, setReady } = statsSlice.actions
export const selectStats = (state: RootState) => state.stats.value
export default statsSlice.reducer
