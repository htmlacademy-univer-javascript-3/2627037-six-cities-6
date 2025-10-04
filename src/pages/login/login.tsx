import '../../../markup/css/main.css';
import {Link} from 'react-router-dom';
import {Logo} from '../../components/logo/logo.tsx';

export function Login() {
  return (
    <html lang="en">
      <head>
        <title>6 cities: authorization</title>
      </head>

      <body>
        <div className="page page--gray page--login">
          <header className="header">
            <div className="container">
              <div className="header__wrapper">
                <div className="header__left">
                  <Logo placingType={'header'} link={'/'} width={81} height={41} />
                </div>
              </div>
            </div>
          </header>

          <main className="page__main page__main--login">
            <div className="page__login-container container">
              <section className="login">
                <h1 className="login__title">Sign in</h1>
                <form className="login__form form" action="#" method="post">
                  <div className="login__input-wrapper form__input-wrapper">
                    <label className="visually-hidden">E-mail</label>
                    <input className="login__input form__input" type="email" name="email" placeholder="Email" required></input>
                  </div>
                  <div className="login__input-wrapper form__input-wrapper">
                    <label className="visually-hidden">Password</label>
                    <input className="login__input form__input" type="password" name="password" placeholder="Password" required></input>
                  </div>
                  <button className="login__submit form__submit button" type="submit">Sign in</button>
                </form>
              </section>
              <section className="locations locations--login locations--current">
                <div className="locations__item">
                  <Link to='/'>
                    <a className="locations__item-link" href="/">
                      <span>Amsterdam</span>
                    </a>
                  </Link>
                </div>
              </section>
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
