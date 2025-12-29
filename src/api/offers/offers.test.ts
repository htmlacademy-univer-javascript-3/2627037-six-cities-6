import { Action } from 'redux';

import { getOfferAction, getOffersAction } from './offers.ts';
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

describe('API test: getOffers', () => {
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
    it(`Dispatch getOffers: ${testCase.name} with status code ${testCase.status}`, async () => {
      const mockOffers = [
        getOfferPreviewTypeMock(),
        getOfferPreviewTypeMock(),
        getOfferPreviewTypeMock(),
      ];
      switch (testCase.status) {
        case 200:
          mockAdapter.onGet(Api.Offers).reply(200, mockOffers);
          break;
        case 400:
          mockAdapter.onGet(Api.Offers).reply(400);
          break;
      }

      await store.dispatch(getOffersAction());
      const getOffersFulfilled = store.getActions().at(1) as ReturnType<
        typeof getOffersAction.fulfilled
      >;

      expect(
        store.getActions().map((action: Action<string>) => action.type),
      ).toEqual([getOffersAction.pending.type, getOffersAction.fulfilled.type]);

      expect(getOffersFulfilled.payload).toEqual(
        testCase.status === 200 ? mockOffers : [],
      );
    });
  });
});

describe('API test: getOffer', () => {
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
    it(`Dispatch getOffers: ${testCase.name} with status code ${testCase.status}`, async () => {
      const mockOffer = getOfferTypeMock();
      switch (testCase.status) {
        case 200:
          mockAdapter
            .onGet(Api.Offer.replace(':offerId', mockOffer.id))
            .reply(200, mockOffer);
          break;
        case 400:
          mockAdapter.onGet(Api.Offer.replace(':offerId', mockOffer.id)).reply(400);
          break;
      }

      await store.dispatch(getOfferAction(mockOffer.id));
      const getOfferFulfilled = store.getActions().at(1) as ReturnType<
        typeof getOfferAction.fulfilled
      >;

      expect(
        store.getActions().map((action: Action<string>) => action.type),
      ).toEqual([getOfferAction.pending.type, getOfferAction.fulfilled.type]);

      expect(getOfferFulfilled.payload).toEqual(
        testCase.status === 200 ? mockOffer : undefined,
      );
    });
  });
});
