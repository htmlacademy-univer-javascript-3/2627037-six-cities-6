import {createAction} from '@reduxjs/toolkit';
import {OfferType} from '../types/offer-type.ts';
import {LocationType} from '../types/location-type.ts';
import {CityType} from '../types/city-type.ts';

const Action = {
  CHANGE_CITY: 'CHANGE_CITY',
  CHANGE_LOCATION: 'CHANGE_LOCATION',
  FILL_OFFERS: 'FILL_OFFERS'
};

export const changeCityAction = createAction(Action.CHANGE_CITY, (value: CityType) => ({
  payload: value,
}));

export const changeLocationAction = createAction(Action.CHANGE_LOCATION, (value: LocationType) => ({
  payload: value,
}));

export const fillOffersAction = createAction(Action.FILL_OFFERS, (value: OfferType[]) => ({
  payload: value,
}));
