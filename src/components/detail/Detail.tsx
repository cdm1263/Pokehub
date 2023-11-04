import { useEffect, useState } from 'react';
import PokemonInfo from './PokemonInfo';
import Status from './Status';
import {
  getPokemonAbility,
  getPokemonData,
  getPokemonSpecies,
  getPokemonType,
} from '@/lib/poketApi';
import { AbilitysType, PokemonType, Stat, TypesType } from '@/lib/type';
import PokemonImg from './PokemonImg';

const Detail = () => {
  const [pokemon, setPokemon] = useState<PokemonType | null>(null);
  const [abilities, setAbilities] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [baseStats, setBaseStats] = useState<Stat[]>([]);
  const [flavorText, setFlavorText] = useState('');
  const [genus, setGenus] = useState('');

  useEffect(() => {
    const fetchDataAPI = async () => {
      try {
        const pokemonData = await getPokemonData(485);

        const abilitiesData = await Promise.all(
          pokemonData.abilities.map(async ({ ability }: AbilitysType) => {
            const abilityData = await getPokemonAbility(ability.url);
            const koreanAbilityData = abilityData.names.find(
              (name: { language: { name: string } }) =>
                name.language.name === 'ko',
            );

            return koreanAbilityData ? koreanAbilityData.name : ability.name;
          }),
        );

        const typesData = await Promise.all(
          pokemonData.types.map(async ({ type }: TypesType) => {
            const typeDetailData = await getPokemonType(type.url);
            const koreanTypeData = typeDetailData.names.find(
              (names: { language: { name: string } }) =>
                names.language.name === 'ko',
            );

            return koreanTypeData ? koreanTypeData.name : type.name;
          }),
        );

        const speciesUrl = pokemonData.species.url;
        const speciesDetailData = await getPokemonSpecies(speciesUrl);
        const koreanSpeciesData = speciesDetailData.flavor_text_entries.find(
          (flavor_text_entries: { language: { name: string } }) =>
            flavor_text_entries.language.name === 'ko',
        );
        const koreanGenusData = speciesDetailData.genera.find(
          (genera: { language: { name: string } }) =>
            genera.language.name === 'ko',
        );

        setBaseStats(pokemonData.stats);
        setPokemon(pokemonData);
        setAbilities(abilitiesData);
        setTypes(typesData);
        setFlavorText(koreanSpeciesData.flavor_text);
        setGenus(koreanGenusData.genus);
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
        <PokemonImg pokemon={pokemon} flavorText={flavorText} genus={genus} />
        <Status baseStats={baseStats} />
      </div>
    </>
  );
};

export default Detail;
