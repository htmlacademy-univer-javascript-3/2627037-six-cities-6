import '../../../markup/css/main.css';
import {OfferType} from '../../types/offer-type.ts';
import {Dispatch, SetStateAction} from 'react';
import {getOfferCardStyle} from '../../markup-styles-provider.ts';

export type OfferCardProps = {
  offer: OfferType;
  activeOfferCardIdDispatcher: Dispatch<SetStateAction<string>>;
  stylesId: string;
}

export default function OfferCard({offer, activeOfferCardIdDispatcher, stylesId}: OfferCardProps) {
  const styles = getOfferCardStyle(stylesId);

  const handleMouseEnter = () => {
    activeOfferCardIdDispatcher(offer.id);
  };

  const handleMouseLeave = () => {
    activeOfferCardIdDispatcher('');
  };

  return (
    <article onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={`${styles.block}__card place-card`}>
      {
        offer.isPremium && (
          <div className="place-card__mark">
            <span>Premium</span>
          </div>
        )
      }

      <div className={`${styles.block}__image-wrapper place-card__image-wrapper`}>
        <a href={`/offer/${offer.id}`}>
          <img className="place-card__image" src={`../../markup/img/${offer.image}`} width={styles.imageWidth} height={styles.imageHeight} alt="Place image"></img>
        </a>
      </div>
      <div className={`${styles.block === 'favorites' ? 'favorites__card-info ' : ''}place-card__info`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`${offer.isFavorite ? 'place-card__bookmark-button--active ' : ''}place-card__bookmark-button button`} type="button">
            <svg className="place-card__bookmark-icon" style={{width: 18, height: 19}}>
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${20 * offer.rating}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href={`/offer/${offer.id}`}>{offer.header}</a>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}
