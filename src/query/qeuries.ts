import { getAllPokemonDatas } from '@/lib/poketApi';
import { useQuery } from 'react-query';

interface QueryOptions {
  [key: string]: unknown;
}

export const useGetAllPokemon = (options?: QueryOptions) => {
  return useQuery('allPokemon', () => getAllPokemonDatas(100000), {
    ...options,
  });
};
