import { useEffect, useState } from 'react';
import PokemonInfo from './PokemonInfo';
import Status from './Status';
import {
  getPokemonData,
  getPokemonSpecies,
  getEvolvesDatas,
} from '@/lib/poketApi';
import { PokemonState } from '@/lib/type';
import PokemonImg from './PokemonImg';
import { useParams } from 'react-router-dom';
import { FORM_NAMES } from '@/lib/pokemonFormNames';
import Comments from '@/components/comment/Comments';
import styles from './Detail.module.scss';
import EvolutionChain from './EvolutionChain';
import useSearchInputText from '@/store/useSearchInputText';

interface EvolutionData {
  evolves_to: EvolutionData[];
  species: { name: string };
}

const Detail = () => {
  const [pokemonState, setPokemonState] = useState<PokemonState>({
    pokemon: null,
    baseStats: [],
    flavorText: '',
    genus: '',
    selectedFormName: '',
    selectedFormId: null,
    evolvesChain: [],
  });
  const { inputText } = useSearchInputText();

  const params = useParams();

  useEffect(() => {
    const evolutionChains = (
      evolutionData: EvolutionData,
      chain: string[][] = [],
      basicStage: string[] = [],
    ): string[][] => {
      if (!evolutionData) return chain;
      const newPath = [...basicStage, evolutionData.species.name];
      if (evolutionData.evolves_to.length === 0) {
        chain.push(newPath);
      } else {
        evolutionData.evolves_to.forEach((evolution) => {
          evolutionChains(evolution, chain, newPath);
        });
      }
      return chain;
    };

    const fetchDataAPI = async () => {
      try {
        const pokemonDataPromise = getPokemonData(params.id ?? '');
        const speciesDetailPromise = pokemonDataPromise.then((data) =>
          getPokemonSpecies(data.species.url),
        );
        const evolvesChainPromise = speciesDetailPromise.then((data) =>
          getEvolvesDatas(data.evolution_chain.url),
        );

        const [pokemonData, speciesDetailData, evolvesChainData] =
          await Promise.all([
            pokemonDataPromise,
            speciesDetailPromise,
            evolvesChainPromise,
          ]);

        const chain = evolutionChains(evolvesChainData.chain);

        const koreanSpeciesData = speciesDetailData.flavor_text_entries.find(
          (flavor_text_entries: { language: { name: string } }) =>
            flavor_text_entries.language.name === 'ko',
        );

        const koreanGenusData = speciesDetailData.genera.find(
          (genera: { language: { name: string } }) =>
            genera.language.name === 'ko',
        );

        setPokemonState((prev) => ({
          ...prev,
          baseStats: pokemonData.stats,
        }));
        setPokemonState((prev) => ({ ...prev, pokemon: pokemonData }));
        setPokemonState((prev) => ({
          ...prev,
          flavorText: koreanSpeciesData?.flavor_text,
        }));
        setPokemonState((prev) => ({ ...prev, genus: koreanGenusData?.genus }));
        setPokemonState((prev) => ({ ...prev, evolvesChain: chain }));
      } catch (error) {
        console.error(error);
      }
    };

    fetchDataAPI();
  }, [inputText, params.id]);

  const onFormChange = async (formName: string) => {
    try {
      const FormChangeData = await getPokemonData(formName);

      const koreanFormName = FORM_NAMES[formName];

      setPokemonState((prev) => ({
        ...prev,
        selectedFormName: koreanFormName,
      }));
      setPokemonState((prev) => ({
        ...prev,
        pokemon: {
          ...FormChangeData,
          id: prev.pokemon?.id ?? FormChangeData.id,
          name: prev.pokemon?.name ?? FormChangeData.name,
        },
      }));
      setPokemonState((prev) => ({ ...prev, baseStats: FormChangeData.stats }));
      setPokemonState((prev) => ({
        ...prev,
        selectedFormId: FormChangeData.id,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={styles.detail__main}>
        <PokemonInfo pokemonState={pokemonState} onFormChange={onFormChange} />
        <PokemonImg pokemonState={pokemonState} />
        <Status pokemonState={pokemonState} />
      </div>
      <EvolutionChain pokemonState={pokemonState} />
      <div className={styles.detail__comments}>
        <Comments pokemonState={pokemonState} />
      </div>
    </>
  );
};

export default Detail;
