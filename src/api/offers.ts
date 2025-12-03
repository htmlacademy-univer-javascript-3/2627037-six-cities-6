import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {fillOffersAction, invokeLoadingAction, setupNearOffersAction, setupOfferAction} from '../store/action.ts';
import {OfferPreviewType} from '../types/offer-preview-type.ts';
import {Api} from '../const.ts';
import {AppDispatch, RootState} from '../store';
import {OfferType} from '../types/offer-type.ts';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(invokeLoadingAction(true));
    const { data } = await api.get<OfferPreviewType[]>(Api.Offers);
    dispatch(fillOffersAction(data));
    dispatch(invokeLoadingAction(false));
  },
);

export const getOfferAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'data/getOffer',
  async (offerId, { dispatch, extra: api }) => {
    const { data } = await api.get<OfferType>(Api.Offer.replace(':offerId', offerId));
    dispatch(setupOfferAction(data));
  },
);

export const getNearOffersAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'data/getNearOffers',
  async (offerId, { dispatch, extra: api }) => {
    const { data } = await api.get<OfferPreviewType[]>(Api.NearOffers.replace(':offerId', offerId));
    dispatch(setupNearOffersAction(data));
  },
);
