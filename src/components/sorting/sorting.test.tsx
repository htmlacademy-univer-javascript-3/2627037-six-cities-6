import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it } from 'vitest';

import SortingOptions from './sorting.tsx';
import { Sorting } from '../../const.ts';

describe('Component: Sorting', () => {
  const sorting = Sorting.Popular;
  const mockOnSortChange = vi.fn();

  it('Render initialized option', () => {
    render(
      <SortingOptions
        currentSorting={sorting}
        onSortChange={mockOnSortChange}
      />,
    );

    expect(screen.getAllByText(sorting).length).toBe(2);
  });

  it('Render dropdown', async () => {
    render(
      <SortingOptions
        currentSorting={sorting}
        onSortChange={mockOnSortChange}
      />,
    );

    await userEvent.click(screen.getAllByText(sorting)[0]);
    expect(screen.getByRole('list')).toHaveClass('places__options--opened');

    await userEvent.click(screen.getAllByText(sorting)[0]);
    expect(screen.getByRole('list')).not.toHaveClass('places__options--opened');
  });

  it('Sorting action invocation success', async () => {
    render(
      <SortingOptions
        currentSorting={sorting}
        onSortChange={mockOnSortChange}
      />,
    );

    const expectedOption = Sorting.TopRatedFirst;

    await userEvent.click(screen.getAllByText(sorting)[0]);
    await userEvent.click(screen.getByText(expectedOption));

    expect(mockOnSortChange).toHaveBeenCalledWith(expectedOption);
  });

  it('Render all available options when dropdown', async () => {
    render(
      <SortingOptions
        currentSorting={sorting}
        onSortChange={mockOnSortChange}
      />,
    );

    await userEvent.click(screen.getAllByText(sorting)[0]);

    expect(screen.getAllByRole('listitem')).toHaveLength(
      Object.values(Sorting).length,
    );
  });
});
