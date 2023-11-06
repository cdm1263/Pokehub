import { useEffect, useState } from 'react';
import PokemonInfo from './PokemonInfo';
import Status from './Status';
import { getPokemonData, getPokemonSpecies } from '@/lib/poketApi';
import { PokemonType, Stat } from '@/lib/type';
import PokemonImg from './PokemonImg';
import { useParams } from 'react-router-dom';

const Detail = () => {
  const [pokemon, setPokemon] = useState<PokemonType | null>(null);
  const [baseStats, setBaseStats] = useState<Stat[]>([]);
  const [flavorText, setFlavorText] = useState('');
  const [genus, setGenus] = useState('');

  const params = useParams();

  console.log(params.id);

  useEffect(() => {
    const fetchDataAPI = async () => {
      try {
        const pokemonData = await getPokemonData(6);

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
        <PokemonInfo pokemon={pokemon} />
        <PokemonImg pokemon={pokemon} flavorText={flavorText} genus={genus} />
        <Status baseStats={baseStats} />
      </div>
    </>
  );
};

export default Detail;
