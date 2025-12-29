import { FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { logoutAction } from '../../api/logout/logout.ts';
import { AppRoute, AuthorizationStatus } from '../../const.ts';
import { AppDispatch, RootState } from '../../store';

export default function NavigationPanel() {
  const dispatch = useDispatch<AppDispatch>();
  const authorizationStatus = useSelector(
    (state: RootState) => state.users.authorizationStatus,
  );
  const user = useSelector((state: RootState) => state.users.user);
  const favorites = useSelector(
    (state: RootState) => state.offers.favoriteOffers,
  );

  const handleSignOut = (event: FormEvent) => {
    event.preventDefault();
    dispatch(logoutAction());
  };

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        {authorizationStatus === AuthorizationStatus.Authorized &&
        user !== undefined ? (
          <>
            <li className="header__nav-item user">
              <Link
                className="header__nav-link header__nav-link--profile"
                to={AppRoute.Favorites}
              >
                <div className="header__avatar-wrapper user__avatar-wrapper">
                  <img
                    className="header__avatar user__avatar"
                    src={user.avatarUrl}
                    alt="User avatar"
                  />
                </div>
                <span className="header__user-name user__name">
                  {user.email}
                </span>
                <span className="header__favorite-count">
                  {favorites.length}
                </span>
              </Link>
            </li>
            <li className="header__nav-item">
              <Link className="header__nav-link" to="/">
                <span className="header__signout" onClick={handleSignOut}>
                  Sign out
                </span>
              </Link>
            </li>
          </>
        ) : (
          <li className="header__nav-item user">
            <Link
              className="header__nav-link header__nav-link--profile"
              to="/login"
            >
              <span className="header__login">Sign in</span>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
