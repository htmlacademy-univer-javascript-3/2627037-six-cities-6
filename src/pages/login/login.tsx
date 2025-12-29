import { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';

import { loginAction } from '../../api/login/login.ts';
import Header from '../../components/header/header.tsx';
import { AppDispatch, RootState } from '../../store';
import '../../../markup/css/main.css';

export function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector((state: RootState) => state.users.user);

  if (user !== undefined) {
    return <Navigate to="/" />;
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    dispatch(loginAction({ email, password }));
  };

  return (
    <html lang="en">
      <head>
        <title>6 cities: authorization</title>
      </head>

      <body>
        <div className="page page--gray page--login">
          <Header redirectHomeEnable />

          <main className="page__main page__main--login">
            <div className="page__login-container container">
              <section className="login">
                <h1 className="login__title">Sign in</h1>
                <form className="login__form form" onSubmit={handleSubmit}>
                  <div className="login__input-wrapper form__input-wrapper">
                    <label className="visually-hidden">E-mail</label>
                    <input
                      className="login__input form__input"
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    >
                    </input>
                  </div>
                  <div className="login__input-wrapper form__input-wrapper">
                    <label className="visually-hidden">Password</label>
                    <input
                      className="login__input form__input"
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    >
                    </input>
                  </div>
                  <button
                    className="login__submit form__submit button"
                    type="submit"
                  >
                    Sign in
                  </button>
                </form>
              </section>
              <section className="locations locations--login locations--current">
                <div className="locations__item">
                  <Link to="/">
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
