import '../../../markup/css/main.css';
import {NavigationPanel} from '../../components/navigation-panel/navigation-panel.tsx';
import {Logo} from '../../components/logo/logo.tsx';

export function FavoritesEmpty() {
  return (
    <html lang="en">
      <head>
        <title>6 cities: favorites empty</title>
      </head>

      <body>
        <div className="page page--favorites-empty">
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

          <main className="page__main page__main--favorites page__main--favorites-empty">
            <div className="page__favorites-container container">
              <section className="favorites favorites--empty">
                <h1 className="visually-hidden">Favorites (empty)</h1>
                <div className="favorites__status-wrapper">
                  <b className="favorites__status">Nothing yet saved.</b>
                  <p className="favorites__status-description">
                    Save properties to narrow down search or plan your future trips.
                  </p>
                </div>
              </section>
            </div>
          </main>
          <footer className="footer">
            <Logo placingType={'footer'} link={'/'} width={64} height={33} />
          </footer>
        </div>
      </body>
    </html>
  );
}
