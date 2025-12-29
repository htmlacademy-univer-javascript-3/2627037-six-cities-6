import { memo } from 'react';

import { getFormatedDate } from '../../helpers/datetime-helper.ts';
import { calculateRatingWidth } from '../../helpers/markup-styles-provider.ts';
import { CommentType } from '../../types/comment-type.ts';

type CommentListItemProps = {
  comment: CommentType;
};

function CommentListItem({ comment }: CommentListItemProps) {
  const date = new Date(comment.date);

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={comment.user.avatarUrl}
            width="54"
            height="54"
            alt="Reviews avatar"
          >
          </img>
        </div>
        <span className="reviews__user-name">{comment.user.name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span
              style={{ width: `${calculateRatingWidth(comment.rating)}%` }}
            >
            </span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{comment.comment}</p>
        <time className="reviews__time" dateTime={getFormatedDate(date)}>
          {date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </time>
      </div>
    </li>
  );
}

const CommentListItemMemo = memo(CommentListItem);
CommentListItemMemo.displayName = 'CommentListItemMemo';
export default CommentListItemMemo;
