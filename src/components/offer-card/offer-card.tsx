import { Dispatch, memo, SetStateAction } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { OfferPreviewType } from '../../types/offer-preview-type.ts';
import { calculateRatingWidth, getOfferCardStyle } from '../../helpers/markup-styles-provider.ts';
import { AppDispatch, RootState } from '../../store';
import { updateFavoriteOffersHandler } from '../../store/action.ts';
import '../../../markup/css/main.css';
import {useNavigate} from 'react-router-dom';
import {AuthorizationStatus} from '../../const.ts';

type OfferCardProps = {
  offer: OfferPreviewType;
  activeOfferCardIdDispatcher: Dispatch<SetStateAction<string>>;
  stylesId: string;
}

function OfferCard({ offer, activeOfferCardIdDispatcher, stylesId }: OfferCardProps) {
  const authorizationStatus = useSelector((state: RootState) => state.users.authorizationStatus);
  const favoriteOffers = useSelector((state: RootState) => state.offers.favoriteOffers);
  const isFavorite = favoriteOffers.some((favoriteOffer) => favoriteOffer.id === offer.id);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const styles = getOfferCardStyle(stylesId);
  const favoriteOfferCard = classNames(
    'place-card__info', {
      'favorites__card-info': styles.block === 'favorites'
    }
  );
  const favoriteOffer = classNames(
    'place-card__bookmark-button button', {
      'place-card__bookmark-button--active': isFavorite
    }
  );

  const handleMouseEnter = () => {
    activeOfferCardIdDispatcher(offer.id);
  };

  const handleMouseLeave = () => {
    activeOfferCardIdDispatcher('');
  };

  const handleBookmarkClick = () => {
    if (authorizationStatus !== AuthorizationStatus.Authorized) {
      navigate('/login');
    } else {
      dispatch(updateFavoriteOffersHandler(offer));
    }
  };

  return (
    <article
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`${styles.block}__card place-card`}
    >
      {offer.isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>}

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
          <button className={favoriteOffer} type="button" onClick={handleBookmarkClick}>
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

const OfferCardMemo = memo(OfferCard);
OfferCardMemo.displayName = 'OfferCardMemo';
export default OfferCardMemo;
