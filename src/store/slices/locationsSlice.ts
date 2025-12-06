import { Cities } from '../../const.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { changeCityHandler, changeLocationHandler } from '../action.ts';
import { CityType } from '../../types/city-type.ts';
import { LocationType } from '../../types/location-type.ts';

interface LocationsState {
  city: CityType;
  location: LocationType;
}

const initialState: LocationsState = {
  city: Cities['Paris'],
  location: Cities['Paris'].location,
};

const locationsSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(changeCityHandler, (state: LocationsState, action: PayloadAction<CityType>) => {
        state.city = action.payload;
      })
      .addCase(changeLocationHandler, (state: LocationsState, action: PayloadAction<LocationType>) => {
        state.location = action.payload;
      });
  },
});

export default locationsSlice.reducer;
