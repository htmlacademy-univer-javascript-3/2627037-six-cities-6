import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../store';
import { Api } from '../const.ts';
import { FavoriteOfferType } from '../types/favorite-offer-type.ts';
import { setupFavoriteOffersHandler, updateFavoriteOffersHandler } from '../store/action.ts';
import { OfferPreviewType } from '../types/offer-preview-type.ts';

export const getFavoritesAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'user/login',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<OfferPreviewType[]>(Api.GetFavorite);
    dispatch(setupFavoriteOffersHandler(data));
  },
);

export const changeFavoriteAction = createAsyncThunk<void, FavoriteOfferType, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({ offerId, status }, { dispatch, extra: api }) => {
    const { data } = await api.post<OfferPreviewType>(
      Api.PostFavorite
        .replace(':offerId', offerId)
        .replace(':status', String(status)),
      { offerId, status }
    );
    dispatch(updateFavoriteOffersHandler(data));
  },
);
