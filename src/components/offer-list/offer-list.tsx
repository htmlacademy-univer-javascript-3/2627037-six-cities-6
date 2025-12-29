import { Dispatch, SetStateAction } from 'react';

import { OfferPreviewType } from '../../types/offer-preview-type.ts';
import OfferCard from '../offer-card/offer-card.tsx';

type OfferListProps = {
  offers: OfferPreviewType[];
  stylesId: string;
  activeOfferCardIdDispatcher: Dispatch<SetStateAction<string>>;
};

export default function OfferList({
  offers,
  stylesId,
  activeOfferCardIdDispatcher,
}: OfferListProps) {
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
