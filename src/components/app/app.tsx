import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {AppRoute, CardsData, isAuthorized} from '../../const.ts';
import Main from '../main/main.tsx';
import {Login} from '../login/login.tsx';
import {Favorites} from '../favorites/favorites.tsx';
import {Property} from '../property/property.tsx';
import {NotFound} from '../not-found/not-found.tsx';
import PrivateRoute from '../private-route/private-route.tsx';

export type AppProps = {
  cardsData: CardData[];
}
export type CardData = {
  id: number;
  image: string;
  isPremium: boolean;
  price: number;
  header: string;
  type: string;
  isFavorite: boolean;
  rating: number;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root} element={<Main cardsData={CardsData}/>} />
        <Route path={AppRoute.Login} element={<Login />} />
        <Route path={AppRoute.Favorites} element=
          {
            <PrivateRoute isAuthorized={isAuthorized}>
              <Favorites />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Property} element={<Property />} />
        <Route path={AppRoute.NotFound} element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
