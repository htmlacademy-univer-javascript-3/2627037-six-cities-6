import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';

import CommentListItem from './comment-list-item.tsx';
import { getFormatedDate } from '../../helpers/datetime-helper.ts';
import { getCommentTypeMock } from '../../helpers/mock-generator.ts';

describe('Component: CommentListItem', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('Rendering when all values valid', () => {
    const mockComment = getCommentTypeMock();
    const expectedDateText = new Date(mockComment.date).toLocaleDateString(
      'en-US',
      {
        month: 'long',
        year: 'numeric',
      },
    );
    const expectedFormatedDate = getFormatedDate(mockComment.date);

    const { container } = render(<CommentListItem comment={mockComment} />);

    expect(screen.getByText(mockComment.user.name)).toBeInTheDocument();
    expect(container.querySelector('img')).toHaveAttribute(
      'src',
      mockComment.user.avatarUrl,
    );
    expect(screen.getByText(mockComment.comment)).toBeInTheDocument();
    const ratingSpan = screen.getByText('Rating').previousSibling;
    expect(ratingSpan).toHaveStyle(`width: ${mockComment.rating * 20}%`);
    expect(screen.getByText(expectedDateText)).toBeInTheDocument();
    expect(screen.getByText(expectedDateText)).toHaveAttribute(
      'dateTime',
      expectedFormatedDate,
    );
  });
});
