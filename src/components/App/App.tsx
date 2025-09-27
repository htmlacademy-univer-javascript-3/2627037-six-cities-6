import Main from '../Main/Main.tsx';

export type AppProps = {
  cardsData: CardData[];
}
export type CardData = {
  id: number;
  image: string;
  isPremium: boolean;
  price: number;
  header: string;
  type: string;
  isFavorite: boolean;
  rating: number;
}

export default function App({cardsData}: AppProps) {
  return (
    <Main cardsData={cardsData} />
  );
}
