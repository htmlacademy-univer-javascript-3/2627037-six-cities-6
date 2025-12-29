import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory, MemoryHistory } from 'history';

import Bookmark from './bookmark.tsx';
import { AppRoute, AuthorizationStatus } from '../../const.ts';
import { withHistory, withStore } from '../../utils/mock-component.tsx';

describe('Component: Bookmark', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('Render when is active', () => {
    const componentWithHistory = withHistory(
      <Bookmark styleId="offer" inBookmarks />,
      mockHistory,
    );
    const { withStoreComponent } = withStore(componentWithHistory, {
      users: { authorizationStatus: AuthorizationStatus.NonAuthorized },
    });

    render(withStoreComponent);

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveClass(
      'offer__bookmark-button--active',
    );
    expect(screen.getByRole('button')).toHaveClass('offer__bookmark-button');
    expect(screen.getByRole('button')).toHaveClass('button');

    expect(screen.getByText('In bookmarks')).toBeInTheDocument();
  });

  it('Render when is not active', () => {
    const componentWithHistory = withHistory(
      <Bookmark inBookmarks={false} styleId="offer" />,
      mockHistory,
    );
    const { withStoreComponent } = withStore(componentWithHistory, {
      users: { authorizationStatus: AuthorizationStatus.NonAuthorized },
    });

    render(withStoreComponent);

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).not.toHaveClass(
      'offer__bookmark-button--active',
    );
    expect(screen.getByRole('button')).toHaveClass('offer__bookmark-button');
    expect(screen.getByRole('button')).toHaveClass('button');

    expect(screen.getByText('To bookmarks')).toBeInTheDocument();
  });

  it('Render when invoking activation', async () => {
    const componentWithHistory = withHistory(
      <Bookmark styleId="offer" inBookmarks />,
      mockHistory,
    );
    const { withStoreComponent } = withStore(componentWithHistory, {
      users: { authorizationStatus: AuthorizationStatus.Authorized },
    });

    render(withStoreComponent);
    await userEvent.click(screen.getByRole('button'));

    expect(screen.queryByText('In bookmarks')).not.toBeInTheDocument();
    expect(screen.getByText('To bookmarks')).toBeInTheDocument();
  });

  it('Invoke redirection after activation when NonAuthorized', async () => {
    const mockCallback = vi.fn();
    const componentWithHistory = withHistory(
      <Bookmark styleId="offer" inBookmarks onBookmarkChange={mockCallback} />,
      mockHistory,
    );
    const { withStoreComponent } = withStore(componentWithHistory, {
      users: { authorizationStatus: AuthorizationStatus.NonAuthorized },
    });

    render(withStoreComponent);
    await userEvent.click(screen.getByRole('button'));

    expect(mockHistory.location.pathname).toEqual(AppRoute.Login);
  });

  it('Invoke callback after activation', async () => {
    const mockCallback = vi.fn();
    const componentWithHistory = withHistory(
      <Bookmark styleId="offer" inBookmarks onBookmarkChange={mockCallback} />,
      mockHistory,
    );
    const { withStoreComponent } = withStore(componentWithHistory, {
      users: { authorizationStatus: AuthorizationStatus.Authorized },
    });

    render(withStoreComponent);
    await userEvent.click(screen.getByRole('button'));

    expect(mockCallback).toHaveBeenCalled();
    expect(mockCallback).toHaveBeenNthCalledWith(1, true);
  });
});
