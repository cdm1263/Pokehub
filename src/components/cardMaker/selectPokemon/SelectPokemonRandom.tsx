import { PokemonType } from '@/lib/type';
import { useGetAllPokemon } from '@/query/qeuries';
import { useCallback, useEffect, useState } from 'react';
import SelectPokemonLayout from './SelectPokemonLayout';
import styles from './select.module.scss';

const SelectPokemonRandom = () => {
  const { data } = useGetAllPokemon(1017);
  const [randomPokemonArray, setRandomPokemonArray] = useState<PokemonType[]>(
    [],
  );

  const getRandomPokemon = useCallback(() => {
    if (data && data.length > 0) {
      const tempArray: PokemonType[] = [];
      const maxIndex = data.length;

      for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * maxIndex);
        const randomPokemon = data[randomIndex];
        tempArray.push(randomPokemon);
      }
      setRandomPokemonArray(tempArray);
    }
  }, [data]);

  useEffect(() => {
    getRandomPokemon();
  }, [getRandomPokemon]);

  return (
    <div className={styles.pokemon_select_wrapper}>
      <span className={styles.title}>랜덤 포켓몬</span>
      <div>
        <SelectPokemonLayout pokemonArray={randomPokemonArray} />
        <button className={styles.border_button} onClick={getRandomPokemon}>
          랜덤
        </button>
      </div>
    </div>
  );
};

export default SelectPokemonRandom;
