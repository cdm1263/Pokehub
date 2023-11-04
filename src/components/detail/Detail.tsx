import { useEffect, useState } from 'react';
import PokemonInfo from './PokemonInfo';
import Status from './Status';
import {
  getPokemonAbility,
  getPokemonData,
  getPokemonType,
} from '@/lib/poketApi';
import { AbilitysType, PokemonType, Stat, TypesType } from '@/lib/type';
import PokemonImg from './PokemonImg';

const Detail = () => {
  const [pokemon, setPokemon] = useState<PokemonType | null>(null);
  const [abilities, setAbilities] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [baseStats, setBaseStats] = useState<Stat[]>([]);

  useEffect(() => {
    const fetchDataAPI = async () => {
      try {
        const pokemonData = await getPokemonData(485);

        const abilitiesData = await Promise.all(
          pokemonData.abilities.map(async ({ ability }: AbilitysType) => {
            const abilityData = await getPokemonAbility(ability.url);
            const koreanAbilityData = abilityData.names.find(
              (name: { name: string; language: { name: string } }) =>
                name.language.name === 'ko',
            );
            return koreanAbilityData ? koreanAbilityData.name : ability.name;
          }),
        );

        const typesData = await Promise.all(
          pokemonData.types.map(async (typeData: TypesType) => {
            const typeDetailData = await getPokemonType(typeData.type.url);
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
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <PokemonInfo pokemon={pokemon} abilities={abilities} types={types} />
        <PokemonImg pokemon={pokemon} />
        <Status baseStats={baseStats} />
      </div>
    </>
  );
};

export default Detail;
