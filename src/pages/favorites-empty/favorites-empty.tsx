import '../../../markup/css/main.css';
import {Logo} from '../../components/logo/logo.tsx';
import {Header} from '../../components/header/header.tsx';

export function FavoritesEmpty() {
  return (
    <html lang="en">
      <head>
        <title>6 cities: favorites empty</title>
      </head>

      <body>
        <div className="page page--favorites-empty">
          <Header redirectHomeEnable />

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
