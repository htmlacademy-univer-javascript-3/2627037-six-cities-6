import { Action } from 'redux';

import { logoutAction } from './logout.ts';
import { Api } from '../../const.ts';
import { initializeMockApi } from '../../helpers/api-test-creator.ts';
import * as tokenStorage from '../token-storage.ts';

const { mockStoreCreator, mockAdapter } = initializeMockApi();
let store: ReturnType<typeof mockStoreCreator>;

beforeEach(() => {
  store = mockStoreCreator({});
});

describe('API test: logout', () => {
  it('Dispatch logout: action success with status code 200', async () => {
    mockAdapter.onDelete(Api.Logout).reply(200);

    await store.dispatch(logoutAction());

    expect(
      store.getActions().map((action: Action<string>) => action.type),
    ).toEqual([logoutAction.pending.type, logoutAction.fulfilled.type]);
  });

  it('Dispatch logout: token storage updating success with status code 200', async () => {
    mockAdapter.onDelete(Api.Logout).reply(200);
    const mockRemoveToken = vi.spyOn(tokenStorage, 'removeToken');

    await store.dispatch(logoutAction());

    expect(mockRemoveToken).toHaveBeenCalledTimes(1);
  });
});
