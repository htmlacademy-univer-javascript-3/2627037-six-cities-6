import { AppRoute } from '../../const.ts';
import { OfferPreviewType } from '../../types/offer-preview-type.ts';
import Logo from '../../components/logo/logo.tsx';
import Header from '../../components/header/header.tsx';
import OfferList from '../../components/offer-list/offer-list.tsx';
import '../../../markup/css/main.css';

export function Favorites() {
  const offers: OfferPreviewType[] = []; // GET /six-cities/favorite

  return (
    <html lang="en">
      <head>
        <title>6 cities: favorites</title>
      </head>

      <body>
        <div className="page">
          <Header redirectHomeEnable hasNavigationPanel />

          <main className="page__main page__main--favorites">
            <div className="page__favorites-container container">
              <section className="favorites">
                <h1 className="favorites__title">Saved listing</h1>
                <ul className="favorites__list">
                  {[...new Set(offers.map((offer) => offer.city))]
                    .map((city) => (
                      <li key={city.name} className="favorites__locations-items">
                        <div className="favorites__locations locations locations--current">
                          <div className="locations__item">
                            <a className="locations__item-link" href="#">
                              <span>{city.name}</span>
                            </a>
                          </div>
                        </div>
                        <div className="favorites__places">
                          <OfferList
                            offers={offers.filter((offer) => offer.city.name === city.name)}
                            stylesId={AppRoute.Favorites}
                            activeOfferCardIdDispatcher={() => {}}
                          />
                        </div>
                      </li>
                    ))}
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
