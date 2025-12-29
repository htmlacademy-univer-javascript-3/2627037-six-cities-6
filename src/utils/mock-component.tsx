import { MockStore, configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import { createMemoryHistory, MemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Action } from 'redux';
import thunk from 'redux-thunk';

import { AppThunkDispatch } from './mocks';
import { createAPI } from '../api/api.ts';
import HistoryRoute from '../components/history-route/history-route.tsx';
import { RootState } from '../store';

export function withHistory(
  component: JSX.Element,
  history: MemoryHistory,
): JSX.Element {
  const mockHistory = history ?? createMemoryHistory();
  return <HistoryRoute history={mockHistory}>{component}</HistoryRoute>;
}

type ComponentWithMockStore = {
  withStoreComponent: JSX.Element;
  mockStore: MockStore;
  mockAxiosAdapter: MockAdapter;
};

export function withStore(
  component: JSX.Element,
  initialState: Partial<RootState> = {},
): ComponentWithMockStore {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<
    RootState,
    Action<string>,
    AppThunkDispatch
  >(middleware);
  const mockStore = mockStoreCreator(initialState);

  return {
    withStoreComponent: <Provider store={mockStore}>{component}</Provider>,
    mockStore,
    mockAxiosAdapter,
  };
}
