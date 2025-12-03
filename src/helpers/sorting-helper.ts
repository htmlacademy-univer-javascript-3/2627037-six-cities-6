import {OfferPreviewType} from '../types/offer-preview-type.ts';
import {Sorting} from '../const.ts';

export function sortOffers(offers: OfferPreviewType[], sorting: string) {
  switch (sorting) {
    case Sorting.PriceLowToHigh:
      return offers.sort((x, y) => x.price - y.price);
    case Sorting.PriceHighToLow:
      return offers.sort((x, y) => y.price - x.price);
    case Sorting.TopRatedFirst:
      return offers.sort((x, y) => y.rating - x.rating);
    default:
      return offers;
  }
}
