import {FormEvent} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store';
import {logoutAction} from '../../api/logout.ts';
import {AuthorizationStatus} from '../../const.ts';

export function NavigationPanel() {
  const dispatch = useDispatch<AppDispatch>();
  const authorizationStatus = useSelector((state: RootState) => state.authorizationStatus);
  const user = useSelector((state: RootState) => state.user);

  const handleSignOut = (event: FormEvent) => {
    event.preventDefault();
    dispatch(logoutAction());
  };

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        {authorizationStatus === AuthorizationStatus.Authorized && user !== undefined
          ?
          <>
            <li className="header__nav-item user">
              <Link className="header__nav-link header__nav-link--profile" to="/favorites">
                <div className="header__avatar-wrapper user__avatar-wrapper">
                  <img src={user.avatarUrl} alt='User avatar'></img>
                </div>
                <span className="header__user-name user__name">{user.email}</span>
                <span className="header__favorite-count">3</span>
              </Link>
            </li>
            <li className="header__nav-item">
              <Link className="header__nav-link" to="/">
                <span className="header__signout" onClick={handleSignOut}>Sign out</span>
              </Link>
            </li>
          </>
          :
          <li className="header__nav-item user">
            <Link className="header__nav-link header__nav-link--profile" to="/login">
              <span className="header__login">Sign in</span>
            </Link>
          </li>}
      </ul>
    </nav>
  );
}
