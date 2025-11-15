import {State} from './reducer';

export const selectOffersByCity = (state: State) =>
  state.offers.filter((offer) => offer.city === state.city);
