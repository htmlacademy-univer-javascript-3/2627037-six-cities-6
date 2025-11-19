import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {OfferList} from '../../components/offer-list/offer-list.tsx';
import {AppRoute} from '../../const.ts';
import {NavigationPanel} from '../../components/navigation-panel/navigation-panel.tsx';
import {Logo} from '../../components/logo/logo.tsx';
import {LocationsPanel} from '../../components/locations-panel/locations-panel.tsx';
import {Map} from '../../components/map/map.tsx';
import {selectOffersByCity} from '../../store/selector';
import {State} from '../../store/reducer';
import {CityType} from '../../types/city-type.ts';
import SortingOptions from '../../components/sorting/sorting.tsx';
import {sortOffers} from '../../helpers/sorting-helper.ts';
import Loading from '../../components/loading/loading.tsx';
import {AppDispatch} from '../../store';
import {fetchOffersAction} from '../../api/offers.ts';

export type MainProps = {
  cities: CityType[];
}

export default function Main({cities}: MainProps) {
  const sorting = useSelector((state: State) => state.sorting);
  const offers = sortOffers(useSelector(selectOffersByCity), sorting);
  const [selectedOfferCardId, setSelectedOfferCardId] = useState('');
  const selectedOffer = offers.find((x) => x.id === selectedOfferCardId);
  const currentCity = useSelector((state: State) => state.city);
  const loading = useSelector((state: State) => state.loading);
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
          <header className="header">
            <div className="container">
              <div className="header__wrapper">
                <div className="header__left">
                  <Logo placingType={'header'} width={81} height={41} />
                </div>
                <NavigationPanel />
              </div>
            </div>
          </header>

          <main className="page__main page__main--index">
            <h1 className="visually-hidden">Cities</h1>
            <LocationsPanel cities={cities} />
            <div className="cities">
              <div className="cities__places-container container">
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">{offers.filter((offer) => offer.city.name === currentCity.name).length} places to stay in {currentCity.name}</b>
                  <SortingOptions />
                  <div className="cities__places-list places__list tabs__content">
                    {loading
                      ? <Loading />
                      :
                      <OfferList
                        offers={offers.filter((offer) => offer.city.name === currentCity.name)}
                        stylesId={AppRoute.Root}
                        activeOfferCardIdDispatcher={setSelectedOfferCardId}
                      />}
                  </div>
                </section>
                <div className="cities__right-section">
                  <Map
                    city={currentCity}
                    points={
                      offers
                        .filter((offer) => offer.city.name === currentCity.name)
                        .map((offer) => ({
                          id: offer.id,
                          latitude: offer.location.latitude,
                          longitude: offer.location.longitude,
                        }))
                    }
                    selectedPoint={selectedOffer === undefined ? undefined : {
                      id: selectedOffer.id,
                      latitude: selectedOffer.location.latitude,
                      longitude: selectedOffer.location.longitude
                    }}
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
