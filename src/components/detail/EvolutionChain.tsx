import { PokemonInfoProps, PokemonType } from '@/lib/type';
import PokemonListElementLayout from '../list/PokemonListElementLayout';
import styles from './Detail.module.scss';
import { POKEMON_NAME } from '@/lib/pokemonName';
import { reverseObject } from '@/lib/utill/reverseObject';
import { useEffect, useState } from 'react';
import { getPokemonData } from '@/lib/poketApi';
import { useNavigate } from 'react-router-dom';

const EvolutionChain = ({ pokemonState }: PokemonInfoProps) => {
  const { evolvesChain } = pokemonState;

  const [evovlutionPokemonData, setEvolutionPokemonData] = useState<
    PokemonType[]
  >([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!evolvesChain || evolvesChain.length === 0) return;
    const fetchData = async () => {
      const evolvesChainFlat =
        evolvesChain.length > 1
          ? [...new Set(evolvesChain.flat())]
          : evolvesChain.flat();

      const evolutionChainData = evolvesChainFlat?.map((partialName) => {
        const englishName = Object.values(POKEMON_NAME).find((name) =>
          name.includes(partialName),
        );
        return englishName && getPokemonData(englishName);
      });

      try {
        const data = await Promise.all(evolutionChainData);

        setEvolutionPokemonData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [evolvesChain]);

  if (!evolvesChain || evolvesChain[0]?.length < 2) {
    return;
  }

  const preEvolutionPokemon = evovlutionPokemonData[0];

  // 나머지 최종 진화 포켓몬들
  const finalEvolutionPokemons = evovlutionPokemonData.slice(1);

  return (
    <>
      <div className={styles.evolves}>
        <div className={styles.evolves__container}>
          <div className={styles.evolves__title}>
            <div className={styles.evolves__title__box}>
              <div className={styles.evolves__title__text}>진화</div>
            </div>
          </div>
          <div className={styles.evolves__img__box}>
            {evolvesChain.length > 1 ? (
              <>
                <div className={styles.evolves}>
                  {preEvolutionPokemon && (
                    <>
                      <div className={styles.evolves__pre__evolution}>
                        <PokemonListElementLayout
                          data={preEvolutionPokemon}
                          className={styles.evolves__list}
                          onClick={() =>
                            navigate(`/pokemon/${preEvolutionPokemon.id}`)
                          }
                        >
                          <img
                            src={
                              preEvolutionPokemon.sprites?.other?.[
                                'official-artwork'
                              ].front_default
                            }
                            alt={`${preEvolutionPokemon.name} 포켓몬 이미지`}
                          />
                        </PokemonListElementLayout>
                        <div className={styles.evolves__pre__evolution__name}>
                          {
                            reverseObject(POKEMON_NAME)[
                              preEvolutionPokemon.name
                            ]
                          }
                        </div>
                        <img
                          className={styles.evolves__pre__evolution__arrow}
                          src="/src/assets/arrow.svg"
                          alt="우측 화살표"
                          width={24}
                          height={38}
                        />
                      </div>
                    </>
                  )}
                  <div className={styles.evolves__final__evolution}>
                    {finalEvolutionPokemons.map((pokemonData, index) => (
                      <div
                        className={styles.evolves__final__evolution__box}
                        key={index}
                      >
                        <PokemonListElementLayout
                          data={pokemonData}
                          className={styles.evolves__list}
                          onClick={() => navigate(`/pokemon/${pokemonData.id}`)}
                        >
                          <img
                            src={
                              pokemonData.sprites?.other?.['official-artwork']
                                .front_default
                            }
                            alt={`${pokemonData.name} 포켓몬 이미지`}
                          />
                        </PokemonListElementLayout>
                        <div className={styles.evolves__final__evolution__name}>
                          {reverseObject(POKEMON_NAME)[pokemonData.name]}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                {evovlutionPokemonData?.map((pokemonData, index) => {
                  return (
                    <>
                      <div
                        key={index}
                        className={styles.evolves__pre__evolution}
                      >
                        <PokemonListElementLayout
                          data={pokemonData}
                          className={styles.evolves__list}
                          onClick={() => navigate(`/pokemon/${pokemonData.id}`)}
                        >
                          <img
                            src={
                              pokemonData.sprites?.other?.['official-artwork']
                                .front_default
                            }
                            alt={`${pokemonData.name} 포켓몬 이미지`}
                          />
                        </PokemonListElementLayout>
                        <div className={styles.evolves__pre__evolution__name}>
                          {reverseObject(POKEMON_NAME)[pokemonData.name]}
                        </div>
                      </div>
                      {index < evovlutionPokemonData.length - 1 && (
                        <img src="/src/assets/arrow.svg" alt="우측 화살표" />
                      )}
                    </>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EvolutionChain;
