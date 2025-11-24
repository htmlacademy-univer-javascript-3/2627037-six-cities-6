import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {AppRoute} from '../../const.ts';
import Main from '../main/main.tsx';
import {Login} from '../login/login.tsx';
import {Favorites} from '../favorites/favorites.tsx';
import {Offer} from '../offer/offer.tsx';
import {NotFound} from '../not-found/not-found.tsx';
import PrivateRoute from '../../components/private-route/private-route.tsx';
import {ReviewType} from '../../types/review-type.ts';
import {CityType} from '../../types/city-type.ts';

export type AppProps = {
  cities: CityType[];
  reviews: ReviewType[];
  isAuthorized: boolean;
}

export default function App({cities, reviews, isAuthorized}: AppProps) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root} element={<Main cities={cities} />} />
        <Route path={AppRoute.Login} element={<Login />} />
        <Route path={AppRoute.Favorites} element=
          {
            <PrivateRoute isAuthorized={isAuthorized}>
              <Favorites offers={[]} />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Property} element={<Offer nearPlaces={[]} reviews={reviews} />} />
        <Route path={AppRoute.NotFound} element={<NotFound cities={cities} />} />
      </Routes>
    </BrowserRouter>
  );
}
