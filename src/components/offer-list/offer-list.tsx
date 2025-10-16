import OfferCard from '../offer-card/offer-card.tsx';
import {OfferType} from '../../types/offer-type.ts';
import {useState} from 'react';

export type OfferListProps = {
  offers: OfferType[];
  stylesId: string;
}

export function OfferList({offers, stylesId}: OfferListProps) {
  const [, activeOfferCardIdDispatcher] = useState('');

  return (
    <>
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          activeOfferCardIdDispatcher={activeOfferCardIdDispatcher}
          stylesId={stylesId}
        />
      ))}
    </>
  );
}
