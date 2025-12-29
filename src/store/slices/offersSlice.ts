import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  changeFavoriteAction,
  getFavoritesAction,
} from '../../api/favorite/favorite.ts';
import {
  getNearOffersAction,
  getOfferAction,
  getOffersAction,
} from '../../api/offers/offers.ts';
import { Sorting } from '../../const.ts';
import { OfferPreviewType } from '../../types/offer-preview-type.ts';
import { OfferType } from '../../types/offer-type.ts';
import { sortOffersHandler } from '../action.ts';

interface OffersState {
  offers: OfferPreviewType[];
  sorting: string;
  loading: boolean;
  offer?: OfferType;
  nearOffers: OfferPreviewType[];
  favoriteOffers: OfferPreviewType[];
}

const initialState: OffersState = {
  offers: [],
  sorting: Sorting.Popular,
  loading: false,
  nearOffers: [],
  favoriteOffers: [],
};

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        sortOffersHandler,
        (state: OffersState, action: PayloadAction<string>) => {
          state.sorting = action.payload;
        },
      )
      .addCase(getOffersAction.pending, (state: OffersState) => {
        state.loading = true;
      })
      .addCase(
        getOffersAction.fulfilled,
        (state: OffersState, action: PayloadAction<OfferPreviewType[]>) => {
          state.loading = false;
          state.offers = action.payload;
        },
      )
      .addCase(getOfferAction.pending, (state: OffersState) => {
        state.loading = true;
      })
      .addCase(
        getOfferAction.fulfilled,
        (state: OffersState, action: PayloadAction<OfferType | undefined>) => {
          state.loading = false;
          state.offer = action.payload;
        },
      )
      .addCase(
        getNearOffersAction.fulfilled,
        (state: OffersState, action: PayloadAction<OfferPreviewType[]>) => {
          state.nearOffers = action.payload;
        },
      )
      .addCase(
        getFavoritesAction.fulfilled,
        (state: OffersState, action: PayloadAction<OfferPreviewType[]>) => {
          state.favoriteOffers = action.payload;
        },
      )
      .addCase(
        changeFavoriteAction.fulfilled,
        (
          state: OffersState,
          action: PayloadAction<OfferPreviewType | undefined>,
        ) => {
          if (action.payload === undefined) {
            return;
          }
          const offerPresented = state.favoriteOffers.find(
            (x) => x.id === action.payload!.id,
          );
          if (offerPresented) {
            state.favoriteOffers = state.favoriteOffers.filter(
              (x) => x.id !== action.payload!.id,
            );
          } else {
            state.favoriteOffers.push(action.payload);
          }
        },
      );
  },
});

export default offersSlice.reducer;
