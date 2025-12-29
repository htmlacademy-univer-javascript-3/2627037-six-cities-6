import { configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import { Action } from 'redux';
import thunk from 'redux-thunk';

import { createAPI } from '../api/api.ts';
import { RootState } from '../store';
import { AppThunkDispatch } from '../utils/mocks.ts';

export function initializeMockApi() {
  const api = createAPI();
  const mockAdapter = new MockAdapter(api);
  const middleware = [thunk.withExtraArgument(api)];
  const mockStoreCreator = configureMockStore<
    RootState,
    Action<string>,
    AppThunkDispatch
  >(middleware);

  return { mockAdapter, mockStoreCreator };
}
