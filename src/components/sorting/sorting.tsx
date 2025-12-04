import { memo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { sortOffersHandler } from '../../store/action';
import { Sorting } from '../../const.ts';
import { RootState } from '../../store';

function SortingOptions() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const activeOption = useSelector((state: RootState) => state.offers.sorting);

  const toggleSortingOptionsMenu = () => {
    setIsOpen((menuOpened) => !menuOpened);
  };

  const handleSortingChange = (option: string) => {
    dispatch(sortOffersHandler(option));
  };

  const placesOptions = classNames(
    'places__options places__options--custom', {
      'places__options--opened': isOpen,
    });

  const placeOption = (option: string) => classNames(
    'places__option', {
      'places__option--active': option === activeOption,
    });

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={toggleSortingOptionsMenu}
      >
        {activeOption}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={placesOptions}>
        {Object.values(Sorting).map((option) => (
          <li
            key={option}
            className={placeOption(option)}
            tabIndex={0}
            onClick={(e) => {
              e.preventDefault();
              handleSortingChange(option);
            }}
          >
            {option}
          </li>
        )
        )}
      </ul>
    </form>
  );
}

const SortingOptionsMemo = memo(SortingOptions);
SortingOptionsMemo.displayName = 'SortingOptionsMemo';
export default SortingOptionsMemo;
