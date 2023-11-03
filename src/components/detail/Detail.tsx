import { useEffect, useState } from 'react';
import PokemonInfo from './PokemonInfo';
import Status from './Status';
import { fetchData } from '@/lib/api';
import { getPokemonData } from '@/lib/poketApi';
import { AbilityType, PokemonType, TypeType } from '@/lib/type';

export interface Stat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

const Detail = () => {
  const [pokemon, setPokemon] = useState<PokemonType | null>(null);
  const [abilities, setAbilities] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [baseStats, setBaseStats] = useState<Stat[]>([]);

  useEffect(() => {
    const fetchDataAPI = async () => {
      try {
        const pokemonData = await getPokemonData(149);

        const abilitiesData = await Promise.all(
          pokemonData.abilities.map(async ({ ability }: AbilityType) => {
            const abilityData = await fetchData(ability.url, 'get');
            const koreanAbilityData = abilityData.names.find(
              (name: { name: string; language: { name: string } }) =>
                name.language.name === 'ko',
            );
            return koreanAbilityData ? koreanAbilityData.name : ability.name;
          }),
        );

        const typesData = await Promise.all(
          pokemonData.types.map(async (typeData: TypeType) => {
            const typeDetailData = await fetchData(typeData.type.url, 'get');
            const koreanTypeData = typeDetailData.names.find(
              (name: { name: string; language: { name: string } }) =>
                name.language.name === 'ko',
            );
            return koreanTypeData ? koreanTypeData.name : typeData.type.name;
          }),
        );

        setBaseStats(pokemonData.stats);
        setPokemon(pokemonData);
        setAbilities(abilitiesData);
        setTypes(typesData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDataAPI();
  }, []);

  return (
    <>
      <PokemonInfo pokemon={pokemon} abilities={abilities} types={types} />

      <Status pokemon={pokemon} baseStats={baseStats} />
    </>
  );
};

export default Detail;
