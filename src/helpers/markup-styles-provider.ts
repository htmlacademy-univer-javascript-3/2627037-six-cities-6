import {
  AppRoute,
  DefaultStyles,
  FavoritesStyles,
  MainStyles,
  NearPlacesStyles,
  PlaceCardBookmarkStyles,
  OfferBookmarkStyles,
} from '../const.ts';
import { BookmarkStylesType } from '../types/bookmark-styles-type.ts';
import { PageStyles } from '../types/page-styles-type.ts';

export function getOfferCardStyle(component: string): PageStyles {
  const nearPlacesStyleName = 'near-places';

  switch (component) {
    case AppRoute.Root:
      return MainStyles;
    case AppRoute.Favorites:
      return FavoritesStyles;
    case nearPlacesStyleName:
      return NearPlacesStyles;
    default:
      return DefaultStyles;
  }
}

export function getBookmarkStyle(component: string): BookmarkStylesType {
  const offerCardStyleName = 'place-card';
  const offerPageStyleName = 'offer';

  switch (component) {
    case offerCardStyleName:
      return PlaceCardBookmarkStyles;
    case offerPageStyleName:
      return OfferBookmarkStyles;
    default:
      return OfferBookmarkStyles;
  }
}

export function calculateRatingWidth(rating: number) {
  return 20 * rating;
}
