export enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  Property = '/offer/:id',
  NotFound = '*'
}

export const IsAuthorized = true;

export const Locations = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
];

export const MainStyles = {
  block: 'cities',
  imageWidth: '260',
  imageHeight: '200'
};
export const FavoritesStyles = {
  block: 'favorites',
  imageWidth: '150',
  imageHeight: '100'
};
export const NearPlacesStyles = {
  block: 'near-places',
  imageWidth: '260',
  imageHeight: '200'
};
export const DefaultStyles = {
  block: 'default',
  imageWidth: '200',
  imageHeight: '200'
};

export const URL_MARKER_DEFAULT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';

export const URL_MARKER_CURRENT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';
