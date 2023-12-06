import { PokemonType } from '@/lib/type';
import styles from './cards.module.scss';
import { POKEMON_NAME } from '@/lib/pokemonName';
import { reverseObject } from '@/lib/utill/reverseObject';
import useSelectedPokemonForCard from '@/store/useSelectedPokemonForCard';

interface CardsRowLayout {
  pokemonArray: PokemonType[];
}

const CardsRowLayout = ({ pokemonArray }: CardsRowLayout) => {
  const { setPokemonData } = useSelectedPokemonForCard();

  return (
    <div className={styles.cards__row_cards}>
      {pokemonArray.map((randomPokemon) => (
        <div
          key={randomPokemon?.id}
          className={styles.cards__row_cards__column}
        >
          <div className={styles.cards__row_cards__card}>
            <img
              src={
                randomPokemon?.sprites?.other?.['official-artwork']
                  ?.front_default
              }
              alt="포켓몬 이미지"
            />
          </div>
          <span>{reverseObject(POKEMON_NAME)[randomPokemon.name]}</span>
          <button
            className={styles.border_button}
            onClick={() => {
              setPokemonData(randomPokemon);
            }}
          >
            포켓몬 사용
          </button>
        </div>
      ))}
    </div>
  );
};

export default CardsRowLayout;
