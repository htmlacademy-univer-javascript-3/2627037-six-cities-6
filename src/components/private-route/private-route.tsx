import {PropsWithChildren} from 'react';
import {Navigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {AppRoute, AuthorizationStatus} from '../../const.ts';
import {RootState} from '../../store';

type Props = PropsWithChildren;

export default function PrivateRoute(props: Props) {
  const authorizationStatus = useSelector((state: RootState) => state.authorizationStatus);

  if (authorizationStatus === AuthorizationStatus.Authorized) {
    return <div>{props.children}</div>;
  }
  return <Navigate to={AppRoute.Login} />;
}
