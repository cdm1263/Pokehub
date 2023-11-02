import { getPokemonDatas, getPokemonTypesDatas } from '@/lib/poketApi';
import styles from './Search.module.scss';
import { useCallback, useEffect } from 'react';

const Search = () => {
  // 임시 포켓몬 데이터 추출
  const getData = useCallback(async () => {
    const { results: data } = await getPokemonDatas(0, 100000);
    const enPokemonArray = data.map((v: { [key: string]: string }) => v.name);
    console.log(enPokemonArray);
  }, []);

  // 영문 포켓몬 타입 20개 추출
  const getType = useCallback(async () => {
    const { results: data } = await getPokemonTypesDatas();
    const enPokemonTypeArray = data.map(
      (v: { [key: string]: string }) => v.name,
    );
    console.log(enPokemonTypeArray);
  }, []);

  useEffect(() => {
    getData();
    getType();
  }, [getData, getType]);

  return <input className={styles.search} />;
};

export default Search;
