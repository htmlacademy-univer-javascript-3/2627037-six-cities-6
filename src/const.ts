import {CityType} from './types/city-type.ts';

export enum AppRoute {
  Root = '/',
  Login = '/login',
  Favorites = '/favorites',
  Property = '/offer/:id',
  NotFound = '*'
}

export const IsAuthorized = true;

export const Cities: {[key: string]: CityType} = {
  Paris: {
    name: 'Paris',
    location: {
      latitude: 52.3709553943508,
      longitude: 4.89309666406198,
      zoom: 1,
    }
  },
  Cologne: {
    name: 'Cologne',
    location: {
      latitude: 52.3709553943508,
      longitude: 4.89309666406198,
      zoom: 1,
    }
  },
  Brussels: {
    name: 'Brussels',
    location: {
      latitude: 52.3709553943508,
      longitude: 4.89309666406198,
      zoom: 1,
    }
  },
  Amsterdam: {
    name: 'Amsterdam',
    location: {
      latitude: 52.3709553943508,
      longitude: 4.89309666406198,
      zoom: 1,
    }
  },
  Hamburg: {
    name: 'Hamburg',
    location: {
      latitude: 52.3709553943508,
      longitude: 4.89309666406198,
      zoom: 1,
    }
  },
  Dusseldorf: {
    name: 'Dusseldorf',
    location: {
      latitude: 52.3709553943508,
      longitude: 4.89309666406198,
      zoom: 1,
    }
  }
};

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
