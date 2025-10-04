import {Link} from 'react-router-dom';
import '../../../markup/css/main.css';
import {NavigationPanel} from '../../components/navigation-panel/navigation-panel.tsx';
import {Logo} from '../../components/logo/logo.tsx';
import {LocationsPanel} from '../../components/locations-panel/locations-panel.tsx';

export type NotFoundProps = {
  locations: string[];
}

export function NotFound({locations}: NotFoundProps) {
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

          <main className="page__main page__main--index page__main--index-empty">
            <h1 className="visually-hidden">Cities</h1>
            <LocationsPanel locations={locations} />
            <div className="cities">
              <div className="cities__places-container cities__places-container--empty container">
                <section className="cities__no-places">
                  <div className="cities__status-wrapper tabs__content">
                    <b className="cities__status">404</b>
                    <p className="cities__status-description">
                      Page Not Found
                    </p>
                    <Link to='/'>
                      <button className="button__homepage button">
                        Homepage
                      </button>
                    </Link>
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
