import { Action } from 'redux';

import { getCommentsAction, postCommentAction } from './comments.ts';
import { Api } from '../../const.ts';
import { initializeMockApi } from '../../helpers/api-test-creator.ts';
import {
  getCommentTypeMock,
  getOfferTypeMock,
} from '../../helpers/mock-generator.ts';

const { mockStoreCreator, mockAdapter } = initializeMockApi();
let store: ReturnType<typeof mockStoreCreator>;

beforeEach(() => {
  store = mockStoreCreator({});
});

describe('API test: getComments', () => {
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
    it(`Dispatch getComments: ${testCase.name} with status code ${testCase.status}`, async () => {
      const mockOffer = getOfferTypeMock();
      const mockComments = [
        getCommentTypeMock(),
        getCommentTypeMock(),
        getCommentTypeMock(),
      ];
      switch (testCase.status) {
        case 200:
          mockAdapter
            .onGet(Api.Comments.replace(':offerId', mockOffer.id))
            .reply(200, mockComments);
          break;
        case 400:
          mockAdapter
            .onGet(Api.Comments.replace(':offerId', mockOffer.id))
            .reply(400);
          break;
      }

      await store.dispatch(getCommentsAction(mockOffer.id));
      const getCommentsFulfilled = store.getActions().at(1) as ReturnType<
        typeof getCommentsAction.fulfilled
      >;

      expect(
        store.getActions().map((action: Action<string>) => action.type),
      ).toEqual([
        getCommentsAction.pending.type,
        getCommentsAction.fulfilled.type,
      ]);

      if (testCase.status === 200) {
        for (const actualComment of getCommentsFulfilled.payload) {
          expect({
            ...actualComment,
            date: new Date(actualComment.date),
          }).toEqual(
            mockComments.find((comment) => comment.id === actualComment.id),
          );
        }
      } else {
        expect(getCommentsFulfilled.payload).toEqual([]);
      }
    });
  });
});

describe('API test: postComment', () => {
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
    it(`Dispatch postComment: ${testCase.name} with status code ${testCase.status}`, async () => {
      const mockOffer = getOfferTypeMock();
      const mockComment = getCommentTypeMock();
      switch (testCase.status) {
        case 200:
          mockAdapter
            .onPost(Api.Comments.replace(':offerId', mockOffer.id))
            .reply(200, mockComment);
          break;
        case 400:
          mockAdapter
            .onPost(Api.Comments.replace(':offerId', mockOffer.id))
            .reply(400);
          break;
      }

      await store.dispatch(
        postCommentAction({
          ...mockComment,
          offerId: mockOffer.id,
        }),
      );
      const postCommentFulfilled = store.getActions().at(1) as ReturnType<
        typeof postCommentAction.fulfilled
      >;

      expect(
        store.getActions().map((action: Action<string>) => action.type),
      ).toEqual([
        postCommentAction.pending.type,
        postCommentAction.fulfilled.type,
      ]);

      if (testCase.status === 200) {
        expect({
          ...postCommentFulfilled.payload,
          date: new Date(postCommentFulfilled.payload!.date),
        }).toEqual(mockComment);
      } else {
        expect(postCommentFulfilled.payload).toEqual(undefined);
      }
    });
  });
});
