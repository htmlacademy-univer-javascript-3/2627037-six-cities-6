import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';

import OfferCard from './offer-card.tsx';
import { AppRoute, AuthorizationStatus } from '../../const.ts';
import { getOfferPreviewTypeMock } from '../../helpers/mock-generator.ts';
import { withHistory, withStore } from '../../utils/mock-component.tsx';

describe('Component: OfferCard', () => {
  const mockOffer = getOfferPreviewTypeMock();
  let mockHistory = createMemoryHistory();
  const mockActiveOfferCardIdDispatcher = vi.fn();

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('Rendering when all values valid', () => {
    const { withStoreComponent } = withStore(
      withHistory(
        <OfferCard
          offer={mockOffer}
          stylesId="cities"
          activeOfferCardIdDispatcher={mockActiveOfferCardIdDispatcher}
        />,
        mockHistory,
      ),
      { users: { authorizationStatus: AuthorizationStatus.Authorized } },
    );

    render(withStoreComponent);

    expect(screen.getByText(mockOffer.title)).toBeInTheDocument();
    expect(screen.getByText(mockOffer.type)).toBeInTheDocument();
    expect(screen.getAllByRole('link')[0]).toHaveAttribute(
      'href',
      AppRoute.Property.replace(':id', mockOffer.id),
    );
  });

  it('Invoke dispatcher on hover', async () => {
    const { withStoreComponent } = withStore(
      withHistory(
        <OfferCard
          offer={mockOffer}
          stylesId="cities"
          activeOfferCardIdDispatcher={mockActiveOfferCardIdDispatcher}
        />,
        mockHistory,
      ),
      { users: { authorizationStatus: AuthorizationStatus.Authorized } },
    );

    render(withStoreComponent);

    await userEvent.hover(screen.getByRole('article'));
    expect(mockActiveOfferCardIdDispatcher).toHaveBeenCalledWith(mockOffer.id);

    await userEvent.unhover(screen.getByRole('article'));
    expect(mockActiveOfferCardIdDispatcher).toHaveBeenCalledWith('');
  });
});
