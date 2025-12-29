import { createAction } from '@reduxjs/toolkit';

import { CityType } from '../types/city-type.ts';
import { LocationType } from '../types/location-type.ts';

const Action = {
  CHANGE_CITY: 'CHANGE_CITY',
  CHANGE_LOCATION: 'CHANGE_LOCATION',
  SORT_OFFERS: 'SORT_OFFERS',
};

export const changeCityHandler = createAction(
  Action.CHANGE_CITY,
  (value: CityType) => ({
    payload: value,
  }),
);

export const changeLocationHandler = createAction(
  Action.CHANGE_LOCATION,
  (value: LocationType) => ({
    payload: value,
  }),
);

export const sortOffersHandler = createAction(
  Action.SORT_OFFERS,
  (value: string) => ({
    payload: value,
  }),
);
