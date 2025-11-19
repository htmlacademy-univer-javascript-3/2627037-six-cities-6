import {Dispatch, SetStateAction} from 'react';
import OfferCard from '../offer-card/offer-card.tsx';
import {OfferType} from '../../types/offer-type.ts';

export type OfferListProps = {
  offers: OfferType[];
  stylesId: string;
  activeOfferCardIdDispatcher: Dispatch<SetStateAction<string>>;
}

export function OfferList({offers, stylesId, activeOfferCardIdDispatcher}: OfferListProps) {
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
