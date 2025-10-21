import {ReviewType} from '../../types/review-type.ts';
import {ReviewListItem} from '../review-list-item/review-list-item.tsx';

export type ReviewListProps = {
  reviews: ReviewType[];
}

export function ReviewList({ reviews }: ReviewListProps) {
  return (
    <>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {
          reviews.map((review) =>
            <ReviewListItem key={review.id} review={review} />
          )
        }
      </ul>
    </>
  );
}
