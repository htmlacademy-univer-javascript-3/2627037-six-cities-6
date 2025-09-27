import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {AppRoute, CardsData, isAuthorized} from '../../const.ts';
import Main from '../Main/Main.tsx';
import {Login} from '../Login/Login.tsx';
import {Favorites} from '../Favorites/Favorites.tsx';
import {Property} from '../Property/Property.tsx';
import {NotFound} from '../NotFound/NotFound.tsx';
import PrivateRoute from '../PrivateRoute/PrivateRoute.tsx';

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
