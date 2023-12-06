import CardsRowLike from '@/components/card/CardsRowLike';
import CardsRowRandom from '@/components/card/CardsRowRandom';
import ProductCard from '@/components/card/ProductCard';

const Card = () => {
  return (
    <>
      <ProductCard />
      <CardsRowLike />
      <CardsRowRandom />;
    </>
  );
};

export default Card;
