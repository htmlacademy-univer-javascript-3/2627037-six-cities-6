import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';

import CommentList from './comment-list.tsx';
import { getCommentTypeMock } from '../../helpers/mock-generator.ts';

describe('Component: CommentList', () => {
  it('Render all reviews with valid counter', () => {
    const mockComments = [
      getCommentTypeMock(),
      getCommentTypeMock(),
      getCommentTypeMock(),
    ];

    render(<CommentList comments={mockComments} />);

    expect(screen.getByText(mockComments.length)).toBeInTheDocument();
    expect(screen.getByText(mockComments.length)).toHaveClass(
      'reviews__amount',
    );
    expect(screen.getAllByRole('listitem').length).toBe(mockComments.length);
  });
});
