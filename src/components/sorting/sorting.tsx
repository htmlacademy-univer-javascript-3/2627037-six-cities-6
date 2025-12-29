import classNames from 'classnames';
import { useState } from 'react';

import { Sorting } from '../../const.ts';

type SortingOptionsProps = {
  currentSorting: string;
  onSortChange: (sorting: string) => void;
};

export default function SortingOptions({
  currentSorting,
  onSortChange,
}: SortingOptionsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSortingOptionsMenu = () => {
    setIsOpen((menuOpened) => !menuOpened);
  };

  const handleSortingChange = (option: string) => {
    onSortChange(option);
  };

  const placesOptions = classNames('places__options places__options--custom', {
    'places__options--opened': isOpen,
  });

  const placeOption = (option: string) =>
    classNames('places__option', {
      'places__option--active': option === currentSorting,
    });

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={toggleSortingOptionsMenu}
      >
        {currentSorting}
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
        ))}
      </ul>
    </form>
  );
}
