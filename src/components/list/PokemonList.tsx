import styles from './PokemonList.module.scss';
import { useGetAllPokemon } from '@/query/qeuries';
import { POKEMON_TYPES } from '@/lib/constants';
import { TypesType } from '@/lib/type';
import useSelectedStore from '@/store/useSelectedStore';
import PokemonListElement from './PokemonListElement';
import Inner from '../Inner';
import useSearchInputText from '@/store/useSearchInputText';
import { POKEMON_NAME } from '@/lib/pokemonName';
import { reverseObject } from '@/lib/utill/reverseObject';

const PokemonList = () => {
  const { isLoading, data: pokemonDatas } = useGetAllPokemon(1017);
  const { inputText } = useSearchInputText();
  const { selectedPlate } = useSelectedStore();
  const reversedPokemonNameObject = reverseObject(POKEMON_NAME);
  const filteredData = pokemonDatas?.filter((data) => {
    if (inputText) {
      return reversedPokemonNameObject[data?.name]?.includes(inputText);
    }
    if (!selectedPlate.length) {
      return data;
    }
    const { types } = data;
    return selectedPlate.every((plate) =>
      types.some((type: TypesType) => POKEMON_TYPES[type.type.name] === plate),
    );
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Inner>
      <ul className={styles.pokemon_grid}>
        {filteredData?.length ? (
          filteredData.map((data) => (
            <PokemonListElement data={data} key={data.name} />
          ))
        ) : (
          <span>데이터없음!!!!</span>
        )}
      </ul>
    </Inner>
  );
};

export default PokemonList;
