import { CityType } from '../../types/city-type.ts';
import Header from '../../components/header/header.tsx';
import LocationsPanel from '../../components/locations-panel/locations-panel.tsx';
import '../../../markup/css/main.css';

type MainEmptyProps = {
  cities: CityType[];
}

export function MainEmpty({ cities }: MainEmptyProps) {
  return (
    <html lang="en">
      <head>
        <title>6 cities</title>
      </head>

      <body>
        <div className="page page--gray page--main">
          <Header hasNavigationPanel />

          <main className="page__main page__main--index page__main--index-empty">
            <h1 className="visually-hidden">Cities</h1>
            <LocationsPanel cities={cities} />
            <div className="cities">
              <div className="cities__places-container cities__places-container--empty container">
                <section className="cities__no-places">
                  <div className="cities__status-wrapper tabs__content">
                    <b className="cities__status">No places to stay available</b>
                    <p className="cities__status-description">
                      We could not find any property available at the moment in Dusseldorf
                    </p>
                  </div>
                </section>
                <div className="cities__right-section"></div>
              </div>
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
