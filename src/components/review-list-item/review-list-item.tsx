import {ReviewType} from '../../types/review-type.ts';
import {calculateRatingWidth} from '../../helpers/markup-styles-provider.ts';

export type ReviewListItemProps = {
  review: ReviewType;
}

export function ReviewListItem({ review }: ReviewListItemProps) {
  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={`../../../markup/img/${review.authorAvatar}`} width="54" height="54" alt="Reviews avatar"></img>
        </div>
        <span className="reviews__user-name">{review.authorName}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${calculateRatingWidth(review.rating)}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {review.text}
        </p>
        <time
          className="reviews__time"
          dateTime={`${review.date.getFullYear()}-${review.date.getMonth() + 1}-${review.date.getDate()}`}
        >
          {review.date.toLocaleString('en', { month: 'long' })} {review.date.getFullYear()}
        </time>
      </div>
    </li>
  );
}
