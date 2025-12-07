import { createAction } from '@reduxjs/toolkit';
import { OfferPreviewType } from '../types/offer-preview-type.ts';
import { LocationType } from '../types/location-type.ts';
import { CityType } from '../types/city-type.ts';
import { UserType } from '../types/user-type.ts';
import { OfferType } from '../types/offer-type.ts';
import { CommentType } from '../types/comment-type.ts';

const Action = {
  CHANGE_CITY: 'CHANGE_CITY',
  CHANGE_LOCATION: 'CHANGE_LOCATION',
  FILL_OFFERS: 'FILL_OFFERS',
  SORT_OFFERS: 'SORT_OFFERS',
  INVOKE_LOADING: 'INVOKE_LOADING',
  UPDATE_AUTH: 'UPDATE_AUTH',
  UPDATE_USER: 'UPDATE_USER',
  SETUP_OFFER: 'SETUP_OFFER',
  SETUP_NEAR_OFFERS: 'SETUP_NEAR_OFFERS',
  SETUP_COMMENTS: 'SETUP_COMMENTS',
  UPDATE_COMMENTS: 'UPDATE_COMMENTS',
  SETUP_FAVORITE_OFFERS: 'SETUP_FAVORITE_OFFERS',
  UPDATE_FAVORITE_OFFERS: 'UPDATE_FAVORITE_OFFERS',
};

export const changeCityHandler = createAction(Action.CHANGE_CITY, (value: CityType) => ({
  payload: value,
}));

export const changeLocationHandler = createAction(Action.CHANGE_LOCATION, (value: LocationType) => ({
  payload: value,
}));

export const fillOffersHandler = createAction(Action.FILL_OFFERS, (value: OfferPreviewType[]) => ({
  payload: value,
}));

export const sortOffersHandler = createAction(Action.SORT_OFFERS, (value: string) => ({
  payload: value,
}));

export const invokeLoadingHandler = createAction(Action.INVOKE_LOADING, (value: boolean) => ({
  payload: value,
}));

export const updateAuthorizationHandler = createAction(Action.UPDATE_AUTH, (value: string) => ({
  payload: value,
}));

export const updateUserHandler = createAction(Action.UPDATE_USER, (value?: UserType) => ({
  payload: value,
}));

export const setupOfferHandler = createAction(Action.SETUP_OFFER, (value?: OfferType) => ({
  payload: value,
}));

export const setupNearOffersHandler = createAction(Action.SETUP_NEAR_OFFERS, (value: OfferPreviewType[]) => ({
  payload: value,
}));

export const setupCommentsHandler = createAction(Action.SETUP_COMMENTS, (value: CommentType[]) => ({
  payload: value,
}));

export const updateCommentsHandler = createAction(Action.UPDATE_COMMENTS, (value: CommentType) => ({
  payload: value,
}));

export const setupFavoriteOffersHandler = createAction(Action.SETUP_FAVORITE_OFFERS, (value: OfferPreviewType[]) => ({
  payload: value,
}));

export const updateFavoriteOffersHandler = createAction(Action.UPDATE_FAVORITE_OFFERS, (value: OfferPreviewType) => ({
  payload: value,
}));
