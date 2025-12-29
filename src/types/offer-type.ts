import { CityType } from './city-type.ts';
import { LocationType } from './location-type.ts';
import { UserViewType } from './user-view-type.ts';

export type OfferType = {
  id: string;
  title: string;
  type: string;
  price: number;
  city: CityType;
  location: LocationType;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  description: string;
  bedrooms: number;
  goods: string[];
  host: UserViewType;
  images: string[];
  maxAdults: number;
};
