import {createReducer, PayloadAction} from '@reduxjs/toolkit';
import * as storeAction from './action';
import {OfferPreviewType} from '../types/offer-preview-type.ts';
import {AuthorizationStatus, Cities, Sorting} from '../const.ts';
import {LocationType} from '../types/location-type.ts';
import {CityType} from '../types/city-type.ts';
import {UserType} from '../types/user-type.ts';
import {OfferType} from '../types/offer-type.ts';
import {CommentType} from '../types/comment-type.ts';

export type State = {
  city: CityType;
  location: LocationType;
  offers: OfferPreviewType[];
  sorting: string;
  loading: boolean;
  authorizationStatus: string;
  user?: UserType;
  offer: OfferType | undefined;
  nearOffers: OfferPreviewType[];
  comments: CommentType[];
};

const initialState: State = {
  city: Cities['Paris'],
  location: Cities['Paris'].location,
  offers: [],
  sorting: Sorting.Popular,
  loading: false,
  authorizationStatus: AuthorizationStatus.NonAuthorized,
  offer: undefined,
  nearOffers: [],
  comments: [],
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(storeAction.changeCityAction, (state: State, action: PayloadAction<CityType>) => {
      state.city = action.payload;
    })
    .addCase(storeAction.changeLocationAction, (state: State, action: PayloadAction<LocationType>) => {
      state.location = action.payload;
    })
    .addCase(storeAction.fillOffersAction, (state: State, action: PayloadAction<OfferPreviewType[]>) => {
      state.offers = action.payload;
    })
    .addCase(storeAction.sortOffersAction, (state: State, action: PayloadAction<string>) => {
      state.sorting = action.payload;
    })
    .addCase(storeAction.invokeLoadingAction, (state: State, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    })
    .addCase(storeAction.updateAuthorizationAction, (state: State, action: PayloadAction<string>) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(storeAction.updateUserAction, (state: State, action: PayloadAction<UserType | undefined>) => {
      state.user = action.payload;
    })
    .addCase(storeAction.setupOfferAction, (state: State, action: PayloadAction<OfferType | undefined>) => {
      state.offer = action.payload;
    })
    .addCase(storeAction.setupNearOffersAction, (state: State, action: PayloadAction<OfferPreviewType[]>) => {
      state.nearOffers = action.payload;
    })
    .addCase(storeAction.setupCommentsAction, (state: State, action: PayloadAction<CommentType[]>) => {
      state.comments = action.payload;
    })
    .addCase(storeAction.updateCommentsAction, (state: State, action: PayloadAction<CommentType>) => {
      state.comments.push(action.payload);
    });
});
