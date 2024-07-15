import { RootState } from '@/app/store'
import { IGlobStats } from '@/global'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IStatsState {
  value: IGlobStats
}

const initialState: IStatsState = {
  value: {},
}

export const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<IGlobStats>) => {
      state.value = action.payload
    },
  },
})

export const { setData } = statsSlice.actions
export const selectStats = (state: RootState) => state.stats.value
export default statsSlice.reducer
