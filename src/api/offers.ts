import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {fillOffersAction, invokeLoadingAction} from '../store/action.ts';
import {OfferType} from '../types/offer-type.ts';
import {Api} from '../const.ts';
import {AppDispatch, RootState} from '../store';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: RootState;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(invokeLoadingAction(true));
    const { data } = await api.get<OfferType[]>(Api.Offers);
    dispatch(fillOffersAction(data));
    dispatch(invokeLoadingAction(false));
  },
);
