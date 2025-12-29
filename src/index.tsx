import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { Cities } from './const.ts';
import App from './pages/app/app.tsx';
import { store } from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App cities={Object.keys(Cities).map((name) => Cities[name])} />
    </Provider>
  </React.StrictMode>,
);
