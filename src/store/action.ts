import {createAction} from '@reduxjs/toolkit';
import {OfferType} from '../types/offer-type.ts';
import {LocationType} from '../types/location-type.ts';
import {CityType} from '../types/city-type.ts';
import {UserType} from '../types/user-type.ts';

const Action = {
  CHANGE_CITY: 'CHANGE_CITY',
  CHANGE_LOCATION: 'CHANGE_LOCATION',
  FILL_OFFERS: 'FILL_OFFERS',
  SORT_OFFERS: 'SORT_OFFERS',
  INVOKE_LOADING: 'INVOKE_LOADING',
  UPDATE_AUTH: 'UPDATE_AUTH',
  UPDATE_USER: 'UPDATE_USER',
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

export const sortOffersAction = createAction(Action.SORT_OFFERS, (value: string) => ({
  payload: value,
}));

export const invokeLoadingAction = createAction(Action.INVOKE_LOADING, (value: boolean) => ({
  payload: value,
}));

export const updateAuthorizationAction = createAction(Action.UPDATE_AUTH, (value: string) => ({
  payload: value,
}));

export const updateUserAction = createAction(Action.UPDATE_USER, (value?: UserType) => ({
  payload: value,
}));
