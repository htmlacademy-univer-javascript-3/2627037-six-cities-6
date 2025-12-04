import { memo, PropsWithChildren } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppRoute, AuthorizationStatus } from '../../const.ts';
import { RootState } from '../../store';

type Props = PropsWithChildren;

function PrivateRoute(props: Props) {
  const authorizationStatus = useSelector((state: RootState) => state.users.authorizationStatus);

  if (authorizationStatus === AuthorizationStatus.Authorized) {
    return <div>{props.children}</div>;
  }
  return <Navigate to={AppRoute.Login} />;
}

const PrivateRouteMemo = memo(PrivateRoute);
PrivateRouteMemo.displayName = 'PrivateRouteMemo';
export default PrivateRouteMemo;
