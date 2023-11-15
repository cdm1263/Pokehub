import styles from './PokemonList.module.scss';
import { useGetAllPokemon } from '@/query/qeuries';
import { POKEMON_TYPES } from '@/lib/constants';
import { TypesType } from '@/lib/type';
import useSelectedStore from '@/store/useSelectedStore';
import PokemonListElement from './PokemonListElement';

const PokemonList = () => {
  const { isLoading, data: pokemonDatas } = useGetAllPokemon(1017);
  const { selectedPlate } = useSelectedStore();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ul className={styles.pokemon_grid}>
      {pokemonDatas
        ?.filter((data) => {
          if (!selectedPlate.length) {
            return data;
          }
          const { types } = data;
          return types.some((type: TypesType) =>
            selectedPlate.includes(POKEMON_TYPES[type.type.name]),
          );
        })
        .map((data) => <PokemonListElement data={data} key={data.name} />)}
    </ul>
  );
};

export default PokemonList;
