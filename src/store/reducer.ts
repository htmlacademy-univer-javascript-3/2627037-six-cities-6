import {createReducer, PayloadAction} from '@reduxjs/toolkit';
import {Offers} from '../mocks/offers';
import {fillOffersAction, changeLocationAction, changeCityAction, sortOffersAction} from './action';
import {OfferType} from '../types/offer-type.ts';
import {Cities, Sorting} from '../const.ts';
import {LocationType} from '../types/location-type.ts';
import {CityType} from '../types/city-type.ts';


export type State = {
  city: CityType;
  location: LocationType;
  offers: OfferType[];
  sorting: Sorting;
};

const initialState: State = {
  city: Cities['Paris'],
  location: Cities['Paris'].location,
  offers: Offers,
  sorting: Sorting.Popular,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCityAction, (state: State, action: PayloadAction<CityType>) => {
      state.city = action.payload;
    })
    .addCase(changeLocationAction, (state: State, action: PayloadAction<LocationType>) => {
      state.location = action.payload;
    })
    .addCase(fillOffersAction, (state: State, action: PayloadAction<OfferType[]>) => {
      state.offers = action.payload;
    })
    .addCase(sortOffersAction, (state: State, action: PayloadAction<Sorting>) => {
      state.sorting = action.payload;
    });
});
