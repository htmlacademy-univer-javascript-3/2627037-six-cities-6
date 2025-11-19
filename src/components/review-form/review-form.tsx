import {SetStateAction, useState} from 'react';
import '../../../markup/css/main.css';

export default function ReviewForm() {
  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');

  const handleRatingChange = (event: { target: { value: SetStateAction<string> } }) => {
    setRating(event.target.value);
  };

  const handleReviewChange = (event: { target: { value: SetStateAction<string> } }) => {
    setReview(event.target.value);
  };

  const handleSubmit = () => { };

  const isSubmitAvailable = rating && review.length >= 50;

  const starTitles = {
    1: 'terribly',
    2: 'badly',
    3: 'not bad',
    4: 'good',
    5: 'perfect',
  };

  return (
    <form className="reviews__form form" onSubmit={handleSubmit} action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {[5, 4, 3, 2, 1].map((value) => (
          <label
            key={value}
            htmlFor={`${value}-stars`}
            className="reviews__rating-label form__rating-label"
            title={starTitles[value as keyof typeof starTitles]}
          >
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star"></use>
            </svg>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={value}
              id={`${value}-stars`}
              type="radio"
              checked={Number(rating) >= value}
              onChange={handleRatingChange}
            />
          </label>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={review}
        onChange={handleReviewChange}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isSubmitAvailable}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
