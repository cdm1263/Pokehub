import { useEffect, useState } from 'react';
import styles from './PokemonList.module.scss';
import { useGetAllPokemon } from '@/query/qeuries';
import { fetchData } from '@/lib/api';

const PokemonList = () => {
  const { isLoading, data } = useGetAllPokemon();
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);

  interface Pokemon {
    name: string;
    url: string;
  }

  useEffect(() => {
    if (!isLoading) {
      const getAllPokemonDatas = async () => {
        const pokemonDetailDatas = await Promise.all(
          data.results.map((item: Pokemon) => fetchData(item.url, 'get')),
        );
        setPokemonData(pokemonDetailDatas);
      };
      getAllPokemonDatas();
    }
  }, [isLoading, data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log(pokemonData);
  return <div className={styles.pokemon_grid}></div>;
};

export default PokemonList;
