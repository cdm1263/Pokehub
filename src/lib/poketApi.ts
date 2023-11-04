import { fetchData } from './api';

export const getAllPokemonDatas = async (offset: number, limit: number) => {
  return fetchData(`pokemon?offset=${offset}&limit=${limit}`, 'get');
};

export const getPokemonData = async (pokemon: number | string) => {
  return fetchData(`pokemon/${pokemon}/`, 'get');
};

export const getPokemonSpeciesDatas = async (pokemon: number | string) => {
  return fetchData(`pokemon-species/${pokemon}/`, 'get');
};

export const getPokemonTypesDatas = async (type: number | string) => {
  return fetchData(`type/${type}/`, 'get');
};
