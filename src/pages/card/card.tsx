import CardsRowLike from '@/components/card/CardsRowLike';
import CardsRowRandom from '@/components/card/CardsRowRandom';
import PokemonCard from '@/components/card/PokemonCard';
import useSelectedPokemonForCard from '@/store/useSelectedPokemonForCard';

const Card = () => {
  const { pokemonData } = useSelectedPokemonForCard();
  return (
    <>
      <PokemonCard data={pokemonData} />
      <CardsRowLike />
      <CardsRowRandom />;
    </>
  );
};

export default Card;
