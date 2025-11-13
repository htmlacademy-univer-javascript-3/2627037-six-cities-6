import {OfferType} from '../types/offer-type.ts';
import {Cities} from '../const.ts';

export const Offers : OfferType[] = [
  {
    id: '1',
    title: 'Beautiful & luxurious apartment at great location',
    type: 'Apartment',
    price: 120,
    city: Cities['Amsterdam'],
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 13
    },
    isFavorite: true,
    isPremium: true,
    rating: 1,
    image: 'apartment-01.jpg',
  },
  {
    id: '2',
    title: 'Wood and stone place',
    type: 'Room',
    price: 80,
    city: Cities['Amsterdam'],
    location: {
      latitude: 52.3609553943508,
      longitude: 4.85309666406198,
      zoom: 13
    },
    isFavorite: false,
    isPremium: false,
    rating: 2,
    image: 'room.jpg',
  },
  {
    id: '3',
    title: 'Canal View Prinsengracht',
    type: 'Apartment',
    price: 132,
    city: Cities['Cologne'],
    location: {
      latitude: 52.3909553943508,
      longitude: 4.929309666406198,
      zoom: 13
    },
    isFavorite: true,
    isPremium: false,
    rating: 3,
    image: 'apartment-02.jpg',
  },
  {
    id: '4',
    title: 'Charming room in a shared house',
    type: 'Apartment',
    price: 180,
    city: Cities['Brussels'],
    location: {
      latitude: 52.3809553943508,
      longitude: 4.939309666406198,
      zoom: 13
    },
    isFavorite: false,
    isPremium: true,
    rating: 5,
    image: 'apartment-03.jpg',
  }];
