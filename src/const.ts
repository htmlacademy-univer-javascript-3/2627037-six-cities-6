import {CardData} from './components/App/App.tsx';

export const CardsData : CardData[] = [
  {
    id: 1,
    image: 'apartment-01.jpg',
    isPremium: true,
    price: 120,
    header: 'Beautiful & luxurious apartment at great location',
    type: 'Apartment',
    isFavorite: true,
    rating: 1,
  },
  {
    id: 2,
    image: 'room.jpg',
    isPremium: false,
    price: 80,
    header: 'Wood and stone place',
    type: 'Room',
    isFavorite: false,
    rating: 2,
  },
  {
    id: 3,
    image: 'apartment-02.jpg',
    isPremium: false,
    price: 132,
    header: 'Canal View Prinsengracht',
    type: 'Apartment',
    isFavorite: true,
    rating: 3,
  },
  {
    id: 4,
    image: 'apartment-03.jpg',
    isPremium: true,
    price: 180,
    header: 'Charming room in a shared house',
    type: 'Apartment',
    isFavorite: false,
    rating: 5,
  }];
