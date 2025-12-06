import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../index.ts';
import { OfferPreviewType } from '../../types/offer-preview-type.ts';

export const selectOffersByCity = createSelector(
  [(state: RootState) => state.offers.offers, (state: RootState) => state.locations.city],
  (offers, city) =>
    offers.filter((offer: OfferPreviewType) => offer.city.name === city.name)
);
