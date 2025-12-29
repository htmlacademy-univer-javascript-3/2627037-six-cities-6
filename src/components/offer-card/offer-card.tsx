import classNames from 'classnames';
import { Dispatch, SetStateAction } from 'react';
import { useDispatch } from 'react-redux';

import { changeFavoriteAction } from '../../api/favorite/favorite.ts';
import {
  calculateRatingWidth,
  getOfferCardStyle,
} from '../../helpers/markup-styles-provider.ts';
import { AppDispatch } from '../../store';
import { OfferPreviewType } from '../../types/offer-preview-type.ts';
import '../../../markup/css/main.css';
import Bookmark from '../bookmark/bookmark.tsx';

type OfferCardProps = {
  offer: OfferPreviewType;
  activeOfferCardIdDispatcher: Dispatch<SetStateAction<string>>;
  stylesId: string;
};

export default function OfferCard({
  offer,
  activeOfferCardIdDispatcher,
  stylesId,
}: OfferCardProps) {
  const dispatch = useDispatch<AppDispatch>();

  const styles = getOfferCardStyle(stylesId);
  const favoriteOfferCard = classNames('place-card__info', {
    'favorites__card-info': styles.block === 'favorites',
  });

  const handleMouseEnter = () => {
    activeOfferCardIdDispatcher(offer.id);
  };

  const handleMouseLeave = () => {
    activeOfferCardIdDispatcher('');
  };

  const handleBookmarkClick = (remove: boolean) => {
    dispatch(
      changeFavoriteAction({
        offerId: offer.id,
        status: remove ? 0 : 1,
      }),
    );
  };

  return (
    <article
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`${styles.block}__card place-card`}
    >
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}

      <div
        className={`${styles.block}__image-wrapper place-card__image-wrapper`}
      >
        <a href={`/offer/${offer.id}`}>
          <img
            className="place-card__image"
            src={offer.previewImage}
            width={styles.imageWidth}
            height={styles.imageHeight}
            alt="Place image"
          >
          </img>
        </a>
      </div>
      <div className={favoriteOfferCard}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <Bookmark
            inBookmarks={offer.isFavorite}
            onBookmarkChange={handleBookmarkClick}
            styleId={'place-card'}
          />
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span
              style={{ width: `${calculateRatingWidth(offer.rating)}%` }}
            >
            </span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href={`/offer/${offer.id}`}>{offer.title}</a>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}
