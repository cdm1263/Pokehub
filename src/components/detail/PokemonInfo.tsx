import { PokemonInfoProps } from '@/lib/type';
import styles from './Detail.module.scss';
import { POKEMON_TYPES } from '@/lib/constants';
import { ABILITY_NAMES } from '@/lib/abilityNames';
import { FORM_NAMES } from '@/lib/pokemonFormNames';
import { POKEMON_NAME } from '@/lib/pokemonName';

const PokemonInfo = ({ pokemon, onFormChange }: PokemonInfoProps) => {
  let feet;
  let inches;
  let pokemonHeight: string | null = null;
  let weightKg;
  let weightLbs;
  let pokemonWeight: string | null = null;

  if (pokemon) {
    feet = Math.floor((pokemon.height * 10) / 2.54 / 12);
    inches = Math.round(((pokemon.height * 10) / 2.54) % 12);
    pokemonHeight = `${(pokemon.height * 0.1).toFixed(
      1,
    )}m (${feet}"${inches}')`;
    weightKg = (pokemon.weight * 0.1).toFixed(1);
    weightLbs = (pokemon.weight * 0.1 * 2.20462).toFixed(1);
    pokemonWeight = `${weightKg}kg (${weightLbs}lb)`;
  }

  const formsData: string[] = pokemon?.name
    ? [pokemon.name].concat(
        Object.keys(FORM_NAMES).reduce<string[]>((acc, key) => {
          if (key.includes(pokemon.name) && key !== pokemon.name) {
            return acc.concat(key);
          }
          return acc;
        }, []),
      )
    : [];

  const getKoreanFormName = (englishName: string | undefined) => {
    let koreanName: string | undefined = FORM_NAMES[englishName as string];

    if (!koreanName) {
      koreanName = Object.keys(POKEMON_NAME).find(
        (key) => POKEMON_NAME[key] === englishName,
      );
    }

    return koreanName;
  };

  console.log(formsData);

  return (
    <>
      <div className={styles.pokemon__info__Box}>
        <div className={styles.pokemon__info__container}>
          <div className={styles.pokemon__info}>
            <div className={styles.pokemon__info__title}>ID</div>
            <div className={styles.pokemon__info__data}>#{pokemon?.id}</div>
          </div>
          <div className={styles.pokemon__info}>
            <div className={styles.pokemon__info__title}>신장</div>
            <div className={styles.pokemon__info__data}>{pokemonHeight}</div>
          </div>
          <div className={styles.pokemon__info}>
            <div className={styles.pokemon__info__title}>무게</div>
            <div className={styles.pokemon__info__data}>{pokemonWeight}</div>
          </div>
          <div className={styles.pokemon__info}>
            <div className={styles.pokemon__info__title}>특성</div>
            <div className={styles.pokemon__info__data}>
              {pokemon?.abilities.map((abilityInfo, index) => {
                const koreanAbilityName =
                  ABILITY_NAMES[abilityInfo.ability.name];

                return (
                  <div
                    key={index}
                    className={`${styles.detail__plate} ${styles[koreanAbilityName]}`}
                  >
                    {koreanAbilityName}
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.pokemon__info}>
            <div className={styles.pokemon__info__title}>타입</div>
            <div className={styles.pokemon__info__data}>
              {pokemon?.types.map((typeInfo, index) => {
                const koreanPokemonName = POKEMON_TYPES[typeInfo.type.name];

                return (
                  <div
                    key={index}
                    className={`${styles.detail__plate} ${styles[koreanPokemonName]}`}
                  >
                    <img
                      src={`/src/assets/icons/${koreanPokemonName}_on.svg`}
                      alt={`${koreanPokemonName}타입 아이콘`}
                    />
                    {koreanPokemonName}
                  </div>
                );
              })}
            </div>
          </div>
          <div className={styles.pokemon__info}>
            <div className={styles.pokemon__info__title}>폼</div>
            <div className={styles.pokemon__info__data}>
              {formsData.map((form, index) => (
                <div
                  key={index}
                  onClick={() => onFormChange?.(form)}
                  className={styles.pokemon__info__form}
                >
                  {getKoreanFormName(form)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PokemonInfo;
