import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  fillOffersHandler,
  invokeLoadingHandler,
  setupNearOffersHandler,
  setupOfferHandler,
  sortOffersHandler
} from '../action.ts';
import { OfferPreviewType } from '../../types/offer-preview-type.ts';
import { Sorting } from '../../const.ts';
import { OfferType } from '../../types/offer-type.ts';

interface OffersState {
  offers: OfferPreviewType[];
  sorting: string;
  loading: boolean;
  offer?: OfferType;
  nearOffers: OfferPreviewType[];
}

const initialState: OffersState = {
  offers: [],
  sorting: Sorting.Popular,
  loading: false,
  nearOffers: [],
};

const offersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fillOffersHandler, (state: OffersState, action: PayloadAction<OfferPreviewType[]>) => {
        state.offers = action.payload;
      })
      .addCase(sortOffersHandler, (state: OffersState, action: PayloadAction<string>) => {
        state.sorting = action.payload;
      })
      .addCase(invokeLoadingHandler, (state: OffersState, action: PayloadAction<boolean>) => {
        state.loading = action.payload;
      })
      .addCase(setupOfferHandler, (state: OffersState, action: PayloadAction<OfferType | undefined>) => {
        state.offer = action.payload;
      })
      .addCase(setupNearOffersHandler, (state: OffersState, action: PayloadAction<OfferPreviewType[]>) => {
        state.nearOffers = action.payload;
      });
  },
});

export default offersSlice.reducer;
