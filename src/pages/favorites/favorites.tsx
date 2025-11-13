import '../../../markup/css/main.css';
import {OfferType} from '../../types/offer-type.ts';
import {OfferList} from '../../components/offer-list/offer-list.tsx';
import {AppRoute} from '../../const.ts';
import {NavigationPanel} from '../../components/navigation-panel/navigation-panel.tsx';
import {Logo} from '../../components/logo/logo.tsx';

export type FavoritesProps = {
  offers: OfferType[];
}

export function Favorites({offers}: FavoritesProps) {
  return (
    <html lang="en">
      <head>
        <title>6 cities: favorites</title>
      </head>

      <body>
        <div className="page">
          <header className="header">
            <div className="container">
              <div className="header__wrapper">
                <div className="header__left">
                  <Logo placingType={'header'} link={'/'} width={81} height={41} />
                </div>
                <NavigationPanel />
              </div>
            </div>
          </header>

          <main className="page__main page__main--favorites">
            <div className="page__favorites-container container">
              <section className="favorites">
                <h1 className="favorites__title">Saved listing</h1>
                <ul className="favorites__list">
                  <li className="favorites__locations-items">
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <a className="locations__item-link" href="#">
                          <span>Amsterdam</span>
                        </a>
                      </div>
                    </div>
                    <div className="favorites__places">
                      <OfferList offers={offers.filter((offer) => offer.city.name === 'Amsterdam')} stylesId={AppRoute.Favorites} />
                    </div>
                  </li>

                  <li className="favorites__locations-items">
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <a className="locations__item-link" href="#">
                          <span>Cologne</span>
                        </a>
                      </div>
                    </div>
                    <div className="favorites__places">
                      <OfferList offers={offers.filter((offer) => offer.city.name === 'Cologne')} stylesId={AppRoute.Favorites} />
                    </div>
                  </li>
                </ul>
              </section>
            </div>
          </main>
          <footer className="footer container">
            <Logo placingType={'footer'} link={'/'} width={64} height={33} />
          </footer>
        </div>
      </body>
    </html>
  );
}
