import { CityType } from './types/city-type.ts';

export const AppRoute = {
  Root: '/',
  Login: '/login',
  Favorites: '/favorites',
  Property: '/offer/:id',
  NotFound: '*',
};

export const AuthorizationStatus = {
  Authorized: 'Authorized',
  NonAuthorized: 'NonAuthorized',
  Undefined: 'Undefined',
};

export const Api = {
  Offers: '/six-cities/offers',
  Offer: '/six-cities/offers/:offerId',
  NearOffers: '/six-cities/offers/:offerId/nearby',
  Comments: '/six-cities/comments/:offerId',
  Login: '/six-cities/login',
  Logout: '/six-cities/logout',
  GetFavorite: '/six-cities/favorite',
  PostFavorite: '/six-cities/favorite/:offerId/:status',
};

export const Sorting = {
  Popular: 'Popular',
  PriceLowToHigh: 'Price: low to high',
  PriceHighToLow: 'Price: high to low',
  TopRatedFirst: 'Top rated first',
};

export const Cities: { [key: string]: CityType } = {
  Paris: {
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13,
    },
  },
  Cologne: {
    name: 'Cologne',
    location: {
      latitude: 50.938361,
      longitude: 6.959974,
      zoom: 13,
    },
  },
  Brussels: {
    name: 'Brussels',
    location: {
      latitude: 50.846557,
      longitude: 4.351697,
      zoom: 13,
    },
  },
  Amsterdam: {
    name: 'Amsterdam',
    location: {
      latitude: 52.37454,
      longitude: 4.897976,
      zoom: 13,
    },
  },
  Hamburg: {
    name: 'Hamburg',
    location: {
      latitude: 53.550341,
      longitude: 10.000654,
      zoom: 13,
    },
  },
  Dusseldorf: {
    name: 'Dusseldorf',
    location: {
      latitude: 51.225402,
      longitude: 6.776314,
      zoom: 13,
    },
  },
};

export const MainStyles = {
  block: 'cities',
  imageWidth: '260',
  imageHeight: '200',
};
export const FavoritesStyles = {
  block: 'favorites',
  imageWidth: '150',
  imageHeight: '100',
};
export const NearPlacesStyles = {
  block: 'near-places',
  imageWidth: '260',
  imageHeight: '200',
};
export const DefaultStyles = {
  block: 'default',
  imageWidth: '200',
  imageHeight: '200',
};
export const PlaceCardBookmarkStyles = {
  block: 'place-card',
  width: 18,
  height: 19,
};
export const OfferBookmarkStyles = {
  block: 'offer',
  width: 31,
  height: 33,
};

export const URL_MARKER_DEFAULT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';

export const URL_MARKER_CURRENT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';
