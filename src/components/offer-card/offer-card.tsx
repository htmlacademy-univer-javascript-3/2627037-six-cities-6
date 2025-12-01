import {Dispatch, SetStateAction} from 'react';
import classNames from 'classnames';
import '../../../markup/css/main.css';
import {OfferPreviewType} from '../../types/offer-preview-type.ts';
import {calculateRatingWidth, getOfferCardStyle} from '../../helpers/markup-styles-provider.ts';

export type OfferCardProps = {
  offer: OfferPreviewType;
  activeOfferCardIdDispatcher: Dispatch<SetStateAction<string>>;
  stylesId: string;
}

export default function OfferCard({offer, activeOfferCardIdDispatcher, stylesId}: OfferCardProps) {
  const styles = getOfferCardStyle(stylesId);
  const favoriteOfferCard = classNames(
    'place-card__info', {
      'favorites__card-info': styles.block === 'favorites'
    }
  );
  const favoriteOffer = classNames(
    'place-card__bookmark-button button', {
      'place-card__bookmark-button--active': offer.isFavorite
    }
  );

  const handleMouseEnter = () => {
    activeOfferCardIdDispatcher(offer.id);
  };

  const handleMouseLeave = () => {
    activeOfferCardIdDispatcher('');
  };

  return (
    <article
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`${styles.block}__card place-card`}
    >
      {
        offer.isPremium && (
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
        )
      }

      <div className={`${styles.block}__image-wrapper place-card__image-wrapper`}>
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
          <button className={favoriteOffer} type="button">
            <svg className="place-card__bookmark-icon" width={18} height={19}>
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${calculateRatingWidth(offer.rating)}%`}}></span>
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
