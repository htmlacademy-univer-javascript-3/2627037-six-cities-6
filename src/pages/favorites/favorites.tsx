import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import FavoritesNotFound from '../../components/favorites-not-found/favorites-not-found.tsx';
import Header from '../../components/header/header.tsx';
import Logo from '../../components/logo/logo.tsx';
import OfferList from '../../components/offer-list/offer-list.tsx';
import { AppRoute } from '../../const.ts';
import { RootState } from '../../store';
import '../../../markup/css/main.css';

export function Favorites() {
  const offers = useSelector((state: RootState) => state.offers.favoriteOffers);

  const page = classNames('page', {
    'page--favorites-empty': offers.length === 0,
  });

  const main = classNames('page__main page__main--favorites', {
    'page__main--favorites-empty': offers.length === 0,
  });

  const favorites = classNames('favorites', {
    'favorites--empty': offers.length === 0,
  });

  const footer = classNames('footer', {
    container: offers.length !== 0,
  });

  return (
    <html lang="en">
      <head>
        <title>6 cities: favorites</title>
      </head>

      <body>
        <div className={page}>
          <Header redirectHomeEnable hasNavigationPanel />

          <main className={main}>
            <div className="page__favorites-container container">
              <section className={favorites}>
                {offers.length !== 0 ? (
                  <>
                    <h1 className="favorites__title">Saved listing</h1>
                    <ul className="favorites__list">
                      {[...new Set(offers.map((offer) => offer.city.name))].map(
                        (cityName) => (
                          <li
                            key={cityName}
                            className="favorites__locations-items"
                          >
                            <div className="favorites__locations locations locations--current">
                              <div className="locations__item">
                                <Link className="locations__item-link" to="/">
                                  <span>{cityName}</span>
                                </Link>
                              </div>
                            </div>
                            <div className="favorites__places">
                              <OfferList
                                offers={offers.filter(
                                  (offer) => offer.city.name === cityName,
                                )}
                                stylesId={AppRoute.Favorites}
                                activeOfferCardIdDispatcher={() => {}}
                              />
                            </div>
                          </li>
                        ),
                      )}
                    </ul>
                  </>
                ) : (
                  <FavoritesNotFound />
                )}
              </section>
            </div>
          </main>
          <footer className={footer}>
            <Logo placingType={'footer'} link={'/'} width={64} height={33} />
          </footer>
        </div>
      </body>
    </html>
  );
}
