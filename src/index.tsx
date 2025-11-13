import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/app/app.tsx';
import {Offers} from './mocks/offers.ts';
import {IsAuthorized, Cities} from './const.ts';
import {Reviews} from './mocks/reviews.ts';
import {Provider} from 'react-redux';
import {store} from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        offers={Offers}
        cities={Object.keys(Cities).map((name) => Cities[name])}
        reviews={Reviews}
        isAuthorized={IsAuthorized}
      />
    </Provider>
  </React.StrictMode>
);
