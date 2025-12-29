import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { getFavoritesAction } from '../../api/favorite/favorite.ts';
import { checkLoginStatusAction } from '../../api/login/login.ts';
import PrivateRoute from '../../components/private-route/private-route.tsx';
import { AppRoute } from '../../const.ts';
import { AppDispatch } from '../../store';
import { CityType } from '../../types/city-type.ts';
import { Favorites } from '../favorites/favorites.tsx';
import { Login } from '../login/login.tsx';
import Main from '../main/main.tsx';
import { NotFound } from '../not-found/not-found.tsx';
import { Offer } from '../offer/offer.tsx';

type AppProps = {
  cities: CityType[];
};

export default function App({ cities }: AppProps) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(checkLoginStatusAction());
    dispatch(getFavoritesAction());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root} element={<Main cities={cities} />} />
        <Route path={AppRoute.Login} element={<Login />} />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute>
              <Favorites />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Property} element={<Offer cities={cities} />} />
        <Route
          path={AppRoute.NotFound}
          element={<NotFound cities={cities} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
