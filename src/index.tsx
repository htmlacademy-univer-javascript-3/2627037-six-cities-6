import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/app/app.tsx';
import {Offers} from './mocks/offers.ts';
import {IsAuthorized, Locations} from './const.ts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App offers={Offers} locations={Locations} isAuthorized={IsAuthorized} />
  </React.StrictMode>
);
