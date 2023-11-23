import { PokemonType } from '@/lib/type';
import { useGetAllPokemon } from '@/query/qeuries';
import { useCallback, useEffect, useState } from 'react';
import CardsRowLayout from './CardsRowLayout';
import styles from './cards.module.scss';

const CardsRowRandom = () => {
  const { data } = useGetAllPokemon(1017);
  const [randomPokemonArray, setRandomPokemonArray] = useState<PokemonType[]>(
    [],
  );

  const getRandomPokemon = useCallback(() => {
    const tempArray: PokemonType[] = [];

    for (let i = 0; i < 3; ) {
      const randomIndex = Math.floor(Math.random() * 1016);
      const randomPokemon = data?.[randomIndex];
      if (randomPokemon) {
        tempArray.push(randomPokemon);
        i++;
      }
    }
    setRandomPokemonArray(tempArray);
  }, [data]);

  useEffect(() => {
    if (data && data.length > 0) {
      getRandomPokemon();
    }
  }, [data, getRandomPokemon]);

  return (
    <div className={styles.pokemon_select_wrapper}>
      <span className={styles.title}>랜덤 포켓몬</span>
      <div>
        <CardsRowLayout pokemonArray={randomPokemonArray} />
        <button className={styles.border_button} onClick={getRandomPokemon}>
          랜덤
        </button>
      </div>
    </div>
  );
};

export default CardsRowRandom;
