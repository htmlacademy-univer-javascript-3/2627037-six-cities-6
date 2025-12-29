import { createSelector } from '@reduxjs/toolkit';

import { OfferPreviewType } from '../../types/offer-preview-type.ts';
import { RootState } from '../index.ts';

export const selectOffersByCity = createSelector(
  [
    (state: RootState) => state.offers.offers,
    (state: RootState) => state.locations.city,
  ],
  (offers, city) =>
    offers.filter((offer: OfferPreviewType) => offer.city.name === city.name),
);
