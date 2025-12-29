import { memo } from 'react';

import { CommentType } from '../../types/comment-type.ts';
import CommentListItem from '../comment-list-item/comment-list-item.tsx';

type CommentListProps = {
  comments: CommentType[];
};

function CommentList({ comments }: CommentListProps) {
  return (
    <>
      <h2 className="reviews__title">
        Reviews &middot;{' '}
        <span className="reviews__amount">{comments.length}</span>
      </h2>
      <ul className="reviews__list">
        {comments.map((comment) => (
          <CommentListItem key={comment.id} comment={comment} />
        ))}
      </ul>
    </>
  );
}

const CommentListMemo = memo(CommentList);
CommentListMemo.displayName = 'CommentListMemo';
export default CommentListMemo;
