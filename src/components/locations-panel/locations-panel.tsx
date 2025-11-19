import classNames from 'classnames';
import {useDispatch, useSelector} from 'react-redux';
import {State} from '../../store/reducer.ts';
import {changeCityAction, changeLocationAction} from '../../store/action.ts';
import {CityType} from '../../types/city-type.ts';

export type LocationsPanelProps = {
  cities: CityType[];
}

export function LocationsPanel({ cities }: LocationsPanelProps) {
  const dispatch = useDispatch();
  const currentCity = useSelector((state: State) => state.city);

  const handleLocationClick = (city: CityType) => {
    dispatch(changeCityAction(city));
    dispatch(changeLocationAction(city.location));
  };

  const locationTabs = (city: CityType) => classNames(
    'locations__item-link tabs__item', {
      'tabs__item--active': city.name === currentCity.name
    });

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities.map((city) => (
            <li key={city.name} className="locations__item">
              <a className={locationTabs(city)}
                href={city.name === currentCity.name ? undefined : '#'}
                onClick={(e) => {
                  e.preventDefault();
                  handleLocationClick(city);
                }}
              >
                <span>{city.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
