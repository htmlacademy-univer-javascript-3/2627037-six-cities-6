import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { Api } from '../../const.ts';
import { AppDispatch, RootState } from '../../store';
import { OfferPreviewType } from '../../types/offer-preview-type.ts';
import { OfferType } from '../../types/offer-type.ts';

export const getOffersAction = createAsyncThunk<
  OfferPreviewType[],
  undefined,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
>('offers/getOffers', async (_arg, { extra: api }) => {
  try {
    const { data } = await api.get<OfferPreviewType[]>(Api.Offers);
    return data;
  } catch {
    return [];
  }
});

export const getOfferAction = createAsyncThunk<
  OfferType | undefined,
  string,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
>('offers/getOffer', async (offerId, { extra: api }) => {
  try {
    const { data } = await api.get<OfferType>(
      Api.Offer.replace(':offerId', offerId),
    );
    return data;
  } catch {
    return undefined;
  }
});

export const getNearOffersAction = createAsyncThunk<
  OfferPreviewType[],
  string,
  {
    dispatch: AppDispatch;
    state: RootState;
    extra: AxiosInstance;
  }
>('offers/getNearOffers', async (offerId, { extra: api }) => {
  const { data } = await api.get<OfferPreviewType[]>(
    Api.NearOffers.replace(':offerId', offerId),
  );
  return data;
});
