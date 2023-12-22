import { useState, useEffect } from 'react';
import styles from './PokemonList.module.scss';
import { useGetAllPokemon } from '@/query/qeuries';
import { POKEMON_TYPES } from '@/lib/constants';
import { PokemonType, TypesType } from '@/lib/type';
import useSelectedStore from '@/store/useSelectedStore';
import PokemonListElement from './PokemonListElement';
import Inner from '../Inner';
import useSearchInputText from '@/store/useSearchInputText';
import { POKEMON_NAME } from '@/lib/pokemonName';
import { reverseObject } from '@/lib/utill/reverseObject';

const PokemonList = () => {
  const { data: allPokemonData } = useGetAllPokemon(1017);
  const { inputText } = useSearchInputText();
  const { selectedPlate } = useSelectedStore();
  const reversedPokemonNameObject = reverseObject(POKEMON_NAME);
  const [visibleData, setVisibleData] = useState<PokemonType[]>([]);
  const [pageNum, setPageNum] = useState(1);

  useEffect(() => {
    if (allPokemonData) {
      const filteredData = allPokemonData?.filter((data) => {
        if (inputText) {
          return reversedPokemonNameObject[data?.name]?.includes(inputText);
        }
        if (!selectedPlate.length) {
          return data;
        }
        const { types } = data;
        return selectedPlate.every((plate) =>
          types.some(
            (type: TypesType) => POKEMON_TYPES[type.type.name] === plate,
          ),
        );
      });

      setVisibleData(filteredData ? filteredData.slice(0, pageNum * 20) : []);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allPokemonData, pageNum, selectedPlate]);

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 20) {
      setPageNum((prevPageNum) => prevPageNum + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Inner>
      <ul className={styles.pokemon_grid}>
        {visibleData.length
          ? visibleData.map((data) => (
              <PokemonListElement data={data} key={data.name} />
            ))
          : null}
      </ul>
    </Inner>
  );
};

export default PokemonList;
