import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppRoute } from '../../const.ts';
import { selectOffersByCity } from '../../store/selectors/offersSelector.ts';
import { CityType } from '../../types/city-type.ts';
import { sortOffers } from '../../helpers/sorting-helper.ts';
import { AppDispatch, RootState } from '../../store';
import { fetchOffersAction } from '../../api/offers.ts';
import Header from '../../components/header/header.tsx';
import SortingOptions from '../../components/sorting/sorting.tsx';
import Loading from '../../components/loading/loading.tsx';
import Map from '../../components/map/map.tsx';
import LocationsPanel from '../../components/locations-panel/locations-panel.tsx';
import OfferList from '../../components/offer-list/offer-list.tsx';

type MainProps = {
  cities: CityType[];
}

export default function Main({ cities }: MainProps) {
  const sorting = useSelector((state: RootState) => state.offers.sorting);
  const offers = useSelector(selectOffersByCity);
  const sortedOffers = useMemo(() => sortOffers([...offers], sorting), [offers, sorting]);
  const [selectedOfferCardId, setSelectedOfferCardId] = useState('');
  const selectedOffer = offers.find((x) => x.id === selectedOfferCardId);
  const currentCity = useSelector((state: RootState) => state.locations.city);
  const loading = useSelector((state: RootState) => state.offers.loading);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!offers.length) {
      dispatch(fetchOffersAction());
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

          <main className="page__main page__main--index">
            <h1 className="visually-hidden">Cities</h1>
            <LocationsPanel cities={cities} />
            <div className="cities">
              <div className="cities__places-container container">
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">
                    {offers.length} places to stay in {currentCity.name}
                  </b>
                  <SortingOptions />
                  <div className="cities__places-list places__list tabs__content">
                    {loading
                      ? <Loading />
                      :
                      <OfferList
                        offers={sortedOffers}
                        stylesId={AppRoute.Root}
                        activeOfferCardIdDispatcher={setSelectedOfferCardId}
                      />}
                  </div>
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
