import faker from 'faker';

import { CityType } from '../types/city-type.ts';
import { CommentType } from '../types/comment-type.ts';
import { LocationType } from '../types/location-type.ts';
import { OfferPreviewType } from '../types/offer-preview-type.ts';
import { OfferType } from '../types/offer-type.ts';
import { UserAuthType } from '../types/user-auth-type.ts';
import { UserType } from '../types/user-type.ts';
import { UserViewType } from '../types/user-view-type.ts';

export function getLocationTypeMock(): LocationType {
  return {
    latitude: faker.datatype.number(),
    longitude: faker.datatype.number(),
    zoom: faker.datatype.number(),
  };
}

export function getUserAuthTypeMock(): UserAuthType {
  return {
    email: faker.internet.email(),
    password: faker.datatype.string() + faker.datatype.number(),
  };
}

export function getUserViewTypeMock(): UserViewType {
  return {
    name: faker.name.findName(),
    avatarUrl: faker.internet.url(),
    isPro: faker.datatype.boolean(),
  };
}

export function getUserTypeMock(): UserType {
  const userViewMock = getUserViewTypeMock();

  return {
    ...userViewMock,
    email: faker.internet.email(),
    token: faker.datatype.string(),
  };
}

export function getCommentTypeMock(): CommentType {
  return {
    id: faker.datatype.uuid(),
    date: faker.date.past(),
    user: getUserViewTypeMock(),
    comment: faker.datatype.string(),
    rating: faker.datatype.number({ min: 1, max: 5 }),
  };
}

export function getCityTypeMock(): CityType {
  return {
    name: faker.datatype.string(),
    location: getLocationTypeMock(),
  };
}

export function getOfferPreviewTypeMock(): OfferPreviewType {
  return {
    id: faker.datatype.uuid(),
    title: faker.datatype.string(),
    type: faker.datatype.string(),
    price: faker.datatype.number(),
    city: getCityTypeMock(),
    location: getLocationTypeMock(),
    isFavorite: faker.datatype.boolean(),
    isPremium: faker.datatype.boolean(),
    rating: faker.datatype.number({ min: 1, max: 5 }),
    previewImage: faker.internet.url(),
  };
}

export function getOfferTypeMock(): OfferType {
  const offerPreviewMock = getOfferPreviewTypeMock();

  const goodsCount = faker.datatype.number({ min: 3, max: 8 });
  const goods = Array.from({ length: goodsCount }, () =>
    faker.datatype.string(),
  );

  const imagesCount = faker.datatype.number({ min: 6, max: 10 });
  const images = Array.from({ length: imagesCount }, () =>
    faker.image.imageUrl(),
  );

  return {
    ...offerPreviewMock,
    description: faker.datatype.string(),
    bedrooms: faker.datatype.number(),
    goods: goods,
    host: getUserViewTypeMock(),
    images: images,
    maxAdults: faker.datatype.number(),
  };
}
