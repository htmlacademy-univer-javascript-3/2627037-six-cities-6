import { Action } from 'redux';

import { checkLoginStatusAction, loginAction } from './login.ts';
import { Api } from '../../const.ts';
import { initializeMockApi } from '../../helpers/api-test-creator.ts';
import {
  getUserAuthTypeMock,
  getUserTypeMock,
} from '../../helpers/mock-generator.ts';
import * as tokenStorage from '../token-storage.ts';

const { mockStoreCreator, mockAdapter } = initializeMockApi();
let store: ReturnType<typeof mockStoreCreator>;

beforeEach(() => {
  store = mockStoreCreator({});
});

describe('API test: login', () => {
  [
    {
      name: 'data fetch success',
      status: 200,
    },
    {
      name: 'empty response',
      status: 400,
    },
  ].map((testCase) => {
    it(`Dispatch login: ${testCase.name} with status code ${testCase.status}`, async () => {
      const mockUser = getUserTypeMock();
      const mockUserAuthData = getUserAuthTypeMock();
      switch (testCase.status) {
        case 200:
          mockAdapter.onPost(Api.Login).reply(200, mockUser);
          break;
        case 400:
          mockAdapter.onPost(Api.Login).reply(400);
          break;
      }

      await store.dispatch(loginAction(mockUserAuthData));
      const loginFulfilled = store.getActions().at(1) as ReturnType<
        typeof loginAction.fulfilled
      >;

      expect(
        store.getActions().map((action: Action<string>) => action.type),
      ).toEqual([loginAction.pending.type, loginAction.fulfilled.type]);

      expect(loginFulfilled.payload).toEqual(
        testCase.status === 200 ? mockUser : undefined,
      );
    });
  });

  it('Dispatch login: token storage updating success with status code 200', async () => {
    const mockUser = getUserTypeMock();
    const mockUserAuthData = getUserAuthTypeMock();
    mockAdapter.onPost(Api.Login).reply(200, mockUser);
    const mockStoreToken = vi.spyOn(tokenStorage, 'storeToken');

    await store.dispatch(loginAction(mockUserAuthData));

    expect(mockStoreToken).toHaveBeenCalledTimes(1);
    expect(mockStoreToken).toHaveBeenCalledWith(mockUser.token);
  });
});

describe('API test: checkLoginStatus', () => {
  [
    {
      name: 'data fetch success',
      status: 200,
    },
    {
      name: 'empty response',
      status: 400,
    },
  ].map((testCase) => {
    it(`Dispatch checkLoginStatus: ${testCase.name} with status code ${testCase.status}`, async () => {
      const mockUser = getUserTypeMock();
      switch (testCase.status) {
        case 200:
          mockAdapter.onGet(Api.Login).reply(200, mockUser);
          break;
        case 400:
          mockAdapter.onGet(Api.Login).reply(400);
          break;
      }

      await store.dispatch(checkLoginStatusAction());
      const checkLoginStatusFulfilled = store.getActions().at(1) as ReturnType<
        typeof checkLoginStatusAction.fulfilled
      >;

      expect(
        store.getActions().map((action: Action<string>) => action.type),
      ).toEqual([
        checkLoginStatusAction.pending.type,
        checkLoginStatusAction.fulfilled.type,
      ]);

      expect(checkLoginStatusFulfilled.payload).toEqual(
        testCase.status === 200 ? mockUser : undefined,
      );
    });
  });
});
