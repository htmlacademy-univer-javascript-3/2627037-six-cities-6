import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { lorem } from 'faker';
import { Action } from 'redux';

import ReviewForm from './review-form.tsx';
import { postCommentAction } from '../../api/comments/comments.ts';
import { Api, Sorting } from '../../const';
import {
  getCommentTypeMock,
  getOfferTypeMock,
} from '../../helpers/mock-generator.ts';
import { withStore } from '../../utils/mock-component.tsx';

describe('Component: ReviewForm', () => {
  it('Render disabled when no condition for submitting', async () => {
    const { withStoreComponent } = withStore(<ReviewForm />, {
      offers: {
        offer: getOfferTypeMock(),
        offers: [],
        sorting: Sorting.Popular,
        loading: false,
        nearOffers: [],
        favoriteOffers: [],
      },
    });

    render(withStoreComponent);

    await act(async () => {
      await userEvent.click(screen.getAllByRole('radio')[3]);
      await userEvent.type(screen.getByRole('textbox'), 'Short');
    });

    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('Invoke API request when submitting valid form', async () => {
    const mockOffer = getOfferTypeMock();
    const { withStoreComponent, mockStore, mockAxiosAdapter } = withStore(
      <ReviewForm />,
      {
        offers: {
          offers: [],
          sorting: Sorting.Popular,
          loading: false,
          offer: mockOffer,
          nearOffers: [],
          favoriteOffers: [],
        },
      },
    );
    mockAxiosAdapter
      .onPost(Api.Comments.replace(':offerId', mockOffer.id))
      .reply(200, getCommentTypeMock());
    render(withStoreComponent);

    await act(async () => {
      await userEvent.click(screen.getAllByRole('radio')[3]);
      await userEvent.type(screen.getByRole('textbox'), lorem.paragraphs(3));
      await userEvent.click(screen.getByRole('button'));
    });

    expect(
      mockStore.getActions().map((action: Action<string>) => action.type),
    ).toEqual([
      postCommentAction.pending.type,
      postCommentAction.fulfilled.type,
    ]);
  }, 15000);
});
