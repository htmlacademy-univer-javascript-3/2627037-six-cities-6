import {CityType} from './city-type.ts';
import {LocationType} from './location-type.ts';

export type OfferPreviewType = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: CityType;
  location: LocationType;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
}
