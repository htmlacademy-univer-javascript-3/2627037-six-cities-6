import { AppRoute, DefaultStyles, FavoritesStyles, MainStyles, NearPlacesStyles } from '../const.ts';
import { PageStyles } from '../types/page-styles-type.ts';

export function getOfferCardStyle(component: string) : PageStyles {
  switch(component) {
    case AppRoute.Root:
      return MainStyles;
    case AppRoute.Favorites:
      return FavoritesStyles;
    case 'near-places':
      return NearPlacesStyles;
    default:
      return DefaultStyles;
  }
}

export function calculateRatingWidth(rating: number) {
  return 20 * rating;
}
