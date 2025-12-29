import { memo } from 'react';

import { CityType } from '../../types/city-type.ts';

type OffersNotFoundProps = {
  city: CityType;
};

function OffersNotFound({ city }: OffersNotFoundProps) {
  return (
    <div className="cities__status-wrapper tabs__content">
      <b className="cities__status">No places to stay available</b>
      <p className="cities__status-description">
        We could not find any property available at the moment in {city.name}
      </p>
    </div>
  );
}

const OffersNotFoundMemo = memo(OffersNotFound);
OffersNotFoundMemo.displayName = 'OffersNotFoundMemo';
export default OffersNotFoundMemo;
