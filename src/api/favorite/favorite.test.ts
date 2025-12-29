import { Action } from 'redux';

import { changeFavoriteAction, getFavoritesAction } from './favorite.ts';
import { Api } from '../../const.ts';
import { initializeMockApi } from '../../helpers/api-test-creator.ts';
import {
  getOfferPreviewTypeMock,
  getOfferTypeMock,
} from '../../helpers/mock-generator.ts';

const { mockStoreCreator, mockAdapter } = initializeMockApi();
let store: ReturnType<typeof mockStoreCreator>;

beforeEach(() => {
  store = mockStoreCreator({});
});

describe('API test: getFavorites', () => {
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
    it(`Dispatch getFavorites: ${testCase.name} with status code ${testCase.status}`, async () => {
      const mockOffers = [
        getOfferPreviewTypeMock(),
        getOfferPreviewTypeMock(),
        getOfferPreviewTypeMock(),
      ];
      switch (testCase.status) {
        case 200:
          mockAdapter.onGet(Api.GetFavorite).reply(200, mockOffers);
          break;
        case 400:
          mockAdapter.onGet(Api.GetFavorite).reply(400);
          break;
      }

      await store.dispatch(getFavoritesAction());
      const getFavoritesFulfilled = store.getActions().at(1) as ReturnType<
        typeof getFavoritesAction.fulfilled
      >;

      expect(
        store.getActions().map((action: Action<string>) => action.type),
      ).toEqual([
        getFavoritesAction.pending.type,
        getFavoritesAction.fulfilled.type,
      ]);

      expect(getFavoritesFulfilled.payload).toEqual(
        testCase.status === 200 ? mockOffers : [],
      );
    });
  });
});

describe('API test: changeFavorite', () => {
  [
    {
      name: 'data save response success',
      status: 200,
      save: true,
    },
    {
      name: 'empty response',
      status: 400,
      save: true,
    },
    {
      name: 'data remove response success',
      status: 200,
      save: false,
    },
    {
      name: 'empty response',
      status: 400,
      save: false,
    },
  ].map((testCase) => {
    it(`Dispatch changeFavorite: [${testCase.save ? 'save' : 'remove'}] ${testCase.name} with status code ${testCase.status}`, async () => {
      const mockOffer = getOfferTypeMock();

      switch (testCase.status) {
        case 200:
          mockAdapter
            .onPost(
              Api.PostFavorite.replace(':offerId', mockOffer.id).replace(
                ':status',
                testCase.save ? '1' : '0',
              ),
            )
            .reply(200, mockOffer);
          break;
        case 400:
          mockAdapter
            .onPost(
              Api.PostFavorite.replace(':offerId', mockOffer.id).replace(
                ':status',
                testCase.save ? '1' : '0',
              ),
            )
            .reply(400);
          break;
      }

      await store.dispatch(
        changeFavoriteAction({
          offerId: mockOffer.id,
          status: testCase.save ? 1 : 0,
        }),
      );
      const changeFavoriteFulfilled = store.getActions().at(1) as ReturnType<
        typeof changeFavoriteAction.fulfilled
      >;

      expect(
        store.getActions().map((action: Action<string>) => action.type),
      ).toEqual([
        changeFavoriteAction.pending.type,
        changeFavoriteAction.fulfilled.type,
      ]);

      expect(changeFavoriteFulfilled.payload).toEqual(
        testCase.status === 200 ? mockOffer : undefined,
      );
    });
  });
});
