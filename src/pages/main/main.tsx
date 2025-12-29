import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getOffersAction } from '../../api/offers/offers.ts';
import Header from '../../components/header/header.tsx';
import Loading from '../../components/loading/loading.tsx';
import LocationsPanel from '../../components/locations-panel/locations-panel.tsx';
import Map from '../../components/map/map.tsx';
import OfferList from '../../components/offer-list/offer-list.tsx';
import OffersNotFound from '../../components/offers-not-found/offers-not-found.tsx';
import SortingOptions from '../../components/sorting/sorting.tsx';
import { AppRoute, Sorting } from '../../const.ts';
import { sortOffers } from '../../helpers/sorting-helper.ts';
import { AppDispatch, RootState } from '../../store';
import { selectOffersByCity } from '../../store/selectors/offersSelector.ts';
import { CityType } from '../../types/city-type.ts';

type MainProps = {
  cities: CityType[];
};

export default function Main({ cities }: MainProps) {
  const offers = useSelector(selectOffersByCity);
  const [selectedOfferCardId, setSelectedOfferCardId] = useState('');
  const selectedOffer = offers.find((x) => x.id === selectedOfferCardId);
  const currentCity = useSelector((state: RootState) => state.locations.city);
  const loading = useSelector((state: RootState) => state.offers.loading);
  const [currentSorting, setCurrentSorting] = useState(Sorting.Popular);
  const sortedOffers = sortOffers([...offers], currentSorting);
  const dispatch = useDispatch<AppDispatch>();

  const main = classNames('page__main', 'page__main--index', {
    'page__main--index-empty': offers.length === 0,
  });

  const container = classNames('cities__places-container', 'container', {
    'cities__places-container--empty': offers.length === 0,
  });

  const places = classNames({
    'cities__no-places': offers.length === 0,
    'cities__places places': offers.length !== 0,
  });

  useEffect(() => {
    if (!offers.length) {
      dispatch(getOffersAction());
    }
  }, [dispatch, offers.length]);

  return (
    <html lang="en">
      <head>
        <title>6 cities</title>
      </head>

      <body>
        <div className="page page--gray page--main">
          <Header hasNavigationPanel />

          <main className={main}>
            <h1 className="visually-hidden">Cities</h1>
            <LocationsPanel cities={cities} />
            <div className="cities">
              <div className={container}>
                <section className={places}>
                  {offers.length !== 0 ? (
                    <>
                      <h2 className="visually-hidden">Places</h2>
                      <b className="places__found">
                        {offers.length} places to stay in {currentCity.name}
                      </b>
                      <SortingOptions
                        currentSorting={currentSorting}
                        onSortChange={(option) => setCurrentSorting(option)}
                      />
                      <div className="cities__places-list places__list tabs__content">
                        {loading ? (
                          <Loading />
                        ) : (
                          <OfferList
                            offers={sortedOffers}
                            stylesId={AppRoute.Root}
                            activeOfferCardIdDispatcher={setSelectedOfferCardId}
                          />
                        )}
                      </div>
                    </>
                  ) : (
                    <OffersNotFound city={currentCity} />
                  )}
                </section>
                <div className="cities__right-section">
                  <Map
                    city={currentCity}
                    offers={offers}
                    selectedOffer={selectedOffer}
                    styleBlockName={'cities__map'}
                  />
                </div>
              </div>
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
