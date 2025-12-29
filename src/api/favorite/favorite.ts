import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { Api } from '../../const.ts';
import { AppDispatch, RootState } from '../../store';
import { FavoriteOfferType } from '../../types/favorite-offer-type.ts';
import { OfferPreviewType } from '../../types/offer-preview-type.ts';

export const getFavoritesAction = createAsyncThunk<
  OfferPreviewType[],
  undefined,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
>('favorite/getFavorites', async (_arg, { extra: api }) => {
  try {
    const { data } = await api.get<OfferPreviewType[]>(Api.GetFavorite);
    return data;
  } catch {
    return [];
  }
});

export const changeFavoriteAction = createAsyncThunk<
  OfferPreviewType | undefined,
  FavoriteOfferType,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
>('favorite/postFavorite', async ({ offerId, status }, { extra: api }) => {
  try {
    const { data } = await api.post<OfferPreviewType>(
      Api.PostFavorite.replace(':offerId', offerId).replace(
        ':status',
        String(status),
      ),
      { offerId, status },
    );
    return data;
  } catch {
    return undefined;
  }
});
