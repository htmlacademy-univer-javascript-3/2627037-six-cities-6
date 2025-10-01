import {PropsWithChildren} from 'react';
import {Navigate} from 'react-router-dom';
import {AppRoute} from '../../const.ts';

type Props = PropsWithChildren<{
  isAuthorized: boolean;
}>;

export default function PrivateRoute(props: Props) {
  if (props.isAuthorized) {
    return <div>{props.children}</div>;
  }
  return <Navigate to={AppRoute.Login} />;
}
