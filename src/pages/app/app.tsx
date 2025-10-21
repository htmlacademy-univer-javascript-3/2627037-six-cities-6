import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {AppRoute} from '../../const.ts';
import Main from '../main/main.tsx';
import {Login} from '../login/login.tsx';
import {Favorites} from '../favorites/favorites.tsx';
import {Offer} from '../offer/offer.tsx';
import {NotFound} from '../not-found/not-found.tsx';
import PrivateRoute from '../../components/private-route/private-route.tsx';
import {OfferType} from '../../types/offer-type.ts';
import {ReviewType} from '../../types/review-type.ts';

export type AppProps = {
  offers: OfferType[];
  locations: string[];
  reviews: ReviewType[];
  isAuthorized: boolean;
}

export default function App({offers, locations, reviews, isAuthorized}: AppProps) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root} element={<Main offers={offers} locations={locations} />} />
        <Route path={AppRoute.Login} element={<Login />} />
        <Route path={AppRoute.Favorites} element=
          {
            <PrivateRoute isAuthorized={isAuthorized}>
              <Favorites offers={offers} />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Property} element={<Offer nearPlaces={offers} reviews={reviews} />} />
        <Route path={AppRoute.NotFound} element={<NotFound locations={locations} />} />
      </Routes>
    </BrowserRouter>
  );
}
