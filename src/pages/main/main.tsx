import {OfferType} from '../../types/offer-type.ts';
import {OfferList} from '../../components/offer-list/offer-list.tsx';
import {AppRoute} from '../../const.ts';
import {NavigationPanel} from '../../components/navigation-panel/navigation-panel.tsx';
import {Logo} from '../../components/logo/logo.tsx';
import {LocationsPanel} from '../../components/locations-panel/locations-panel.tsx';
import {Map} from '../../components/map/map.tsx';

export type MainProps = {
  offers: OfferType[];
  locations: string[];
}

export default function Main({offers, locations}: MainProps) {
  return (
    <html lang="en">
      <head>
        <title>6 cities</title>
      </head>

      <body>
        <div className="page page--gray page--main">
          <header className="header">
            <div className="container">
              <div className="header__wrapper">
                <div className="header__left">
                  <Logo placingType={'header'} width={81} height={41} />
                </div>
                <NavigationPanel />
              </div>
            </div>
          </header>

          <main className="page__main page__main--index">
            <h1 className="visually-hidden">Cities</h1>
            <LocationsPanel locations={locations} />
            <div className="cities">
              <div className="cities__places-container container">
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{offers.filter((offer) => offer.location === 'Amsterdam').length} places to stay in Amsterdam</b>
                  <form className="places__sorting" action="#" method="get">
                    <span className="places__sorting-caption">Sort by</span>
                    <span className="places__sorting-type" tabIndex={0}>
                      Popular
                      <svg className="places__sorting-arrow" width="7" height="4">
                        <use xlinkHref="#icon-arrow-select"></use>
                      </svg>
                    </span>
                    <ul className="places__options places__options--custom places__options--opened">
                      <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                      <li className="places__option" tabIndex={0}>Price: low to high</li>
                      <li className="places__option" tabIndex={0}>Price: high to low</li>
                      <li className="places__option" tabIndex={0}>Top rated first</li>
                    </ul>
                  </form>
                  <div className="cities__places-list places__list tabs__content">
                    <OfferList offers={offers.filter((offer) => offer.location === 'Amsterdam')} stylesId={AppRoute.Root} />
                  </div>
                </section>
                <div className="cities__right-section">
                  <Map
                    offer={
                      offers.filter((offer) =>
                        offer.location === 'Amsterdam')[0]
                    }
                    points={
                      offers
                        .filter((offer) => offer.location === 'Amsterdam')
                        .map((offer) => ({
                          title: offer.header,
                          latitude: offer.latitude,
                          longitude: offer.longitude
                        }))
                    }
                    selectedPoint={undefined}
                    styleBlockName={'cities__map'}
                  />
                </div>
              </div>
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
