import { RootState } from '@/app/store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ICountriesState {
  value: Array<string>
}

const initialState: ICountriesState = {
  value: [],
}

export const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    update: (state, actions: PayloadAction<Array<string>>) => {
      state.value = actions.payload
    },
  },
})

export const { update } = countriesSlice.actions
export const selectCountries = (state: RootState) => state.countries.value
export default countriesSlice.reducer
