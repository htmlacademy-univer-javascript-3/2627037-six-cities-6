import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';

import { getCommentsAction } from '../../api/comments/comments.ts';
import { changeFavoriteAction } from '../../api/favorite/favorite.ts';
import {
  getNearOffersAction,
  getOfferAction,
} from '../../api/offers/offers.ts';
import Bookmark from '../../components/bookmark/bookmark.tsx';
import CommentList from '../../components/comment-list/comment-list.tsx';
import Header from '../../components/header/header.tsx';
import Loading from '../../components/loading/loading.tsx';
import Map from '../../components/map/map.tsx';
import OfferList from '../../components/offer-list/offer-list.tsx';
import ReviewForm from '../../components/review-form/review-form.tsx';
import { AppRoute, AuthorizationStatus } from '../../const.ts';
import { calculateRatingWidth } from '../../helpers/markup-styles-provider.ts';
import { AppDispatch, RootState } from '../../store';
import { CityType } from '../../types/city-type.ts';
import { NotFound } from '../not-found/not-found.tsx';
import '../../../markup/css/main.css';

type OfferProps = {
  cities: CityType[];
};

export function Offer({ cities }: OfferProps) {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const offer = useSelector((state: RootState) => state.offers.offer);
  const nearOffers = useSelector((state: RootState) => state.offers.nearOffers);
  const comments = useSelector((state: RootState) => state.comments.comments);
  const authorizationStatus = useSelector(
    (state: RootState) => state.users.authorizationStatus,
  );
  const loading = useSelector((state: RootState) => state.offers.loading);

  useEffect(() => {
    if (id) {
      dispatch(getOfferAction(id));
      dispatch(getNearOffersAction(id));
      dispatch(getCommentsAction(id));
    }
  }, [dispatch, id]);

  if (!id) {
    return <Navigate to={AppRoute.NotFound} replace />;
  }

  if (!offer) {
    return <NotFound cities={cities} />;
  }

  const handleBookmarkClick = () => {
    dispatch(
      changeFavoriteAction({
        offerId: offer.id,
        status: offer.isFavorite ? 0 : 1,
      }),
    );
  };

  return (
    <body>
      <div className="page">
        <Header redirectHomeEnable hasNavigationPanel />

        <main className="page__main page__main--property">
          {loading ? (
            <Loading />
          ) : (
            <>
              <section className="property">
                <div className="property__gallery-container container">
                  <div className="property__gallery">
                    {offer.images.map((image) => (
                      <div key={image} className="property__image-wrapper">
                        <img
                          className="property__image"
                          src={image}
                          alt="Offer photo"
                        >
                        </img>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="property__container container">
                  <div className="property__wrapper">
                    {offer.isPremium && (
                      <div className="property__mark">
                        <span>Premium</span>
                      </div>
                    )}
                    <div className="property__name-wrapper">
                      <h1 className="property__name">{offer.title}</h1>
                      <Bookmark
                        inBookmarks={offer.isFavorite}
                        onBookmarkChange={handleBookmarkClick}
                        styleId={'offer'}
                      />
                    </div>
                    <div className="property__rating rating">
                      <div className="property__stars rating__stars">
                        <span
                          style={{
                            width: `${calculateRatingWidth(offer.rating)}%`,
                          }}
                        >
                        </span>
                        <span className="visually-hidden">Rating</span>
                      </div>
                      <span className="property__rating-value rating__value">
                        {offer.rating}
                      </span>
                    </div>
                    <ul className="property__features">
                      <li className="property__feature property__feature--entire">
                        {offer.type}
                      </li>
                      <li className="property__feature property__feature--bedrooms">
                        {offer.bedrooms} Bedrooms
                      </li>
                      <li className="property__feature property__feature--adults">
                        Max {offer.maxAdults} adults
                      </li>
                    </ul>
                    <div className="property__price">
                      <b className="property__price-value">
                        &euro;{offer.price}
                      </b>
                      <span className="property__price-text">&nbsp;night</span>
                    </div>
                    <div className="property__inside">
                      <h2 className="property__inside-title">
                        What&apos;s inside
                      </h2>
                      <ul className="property__inside-list">
                        {offer.goods.map((item) => (
                          <li key={item} className="property__inside-item">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="property__host">
                      <h2 className="property__host-title">Meet the host</h2>
                      <div className="property__host-user user">
                        <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                          <img
                            className="property__avatar user__avatar"
                            src={offer.host.avatarUrl}
                            width="74"
                            height="74"
                            alt="Host avatar"
                          >
                          </img>
                        </div>
                        <span className="property__user-name">
                          {offer.host.name}
                        </span>
                        {offer.host.isPro && (
                          <span className="property__user-status">Pro</span>
                        )}
                      </div>
                      <div className="property__description">
                        <p className="property__text">{offer.description}</p>
                      </div>
                    </div>
                    <section className="property__reviews reviews">
                      <CommentList comments={comments} />
                      {authorizationStatus ===
                        AuthorizationStatus.Authorized && <ReviewForm />}
                    </section>
                  </div>
                </div>
                <Map
                  city={offer.city}
                  offers={nearOffers}
                  styleBlockName={'offer__map'}
                />
              </section>
              <div className="container">
                <section className="near-places places">
                  <h2 className="near-places__title">
                    Other places in the neighbourhood
                  </h2>
                  <div className="near-places__list places__list">
                    <OfferList
                      offers={nearOffers}
                      stylesId={'near-places'}
                      activeOfferCardIdDispatcher={() => {}}
                    />
                  </div>
                </section>
              </div>
            </>
          )}
        </main>
      </div>
    </body>
  );
}
