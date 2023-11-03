import { PokemonType } from '@/lib/type';
import styles from './Detail.module.scss';

interface PokemonInfoProps {
  pokemon: PokemonType | null;
  abilities: string[];
  ㅁ;
  types: string[];
}

const PokemonInfo = ({ pokemon, abilities, types }: PokemonInfoProps) => {
  let feet = 0;
  let inches = 0;
  let pokemonHeight: string | null = null;
  let pokemonWeight: string | null = null;

  if (pokemon) {
    feet = Math.floor((pokemon.height * 10) / 2.54 / 12);
    inches = Math.round(((pokemon.height * 10) / 2.54) % 12);
    pokemonHeight = `${pokemon.height * 0.1}m (${feet}".${inches}')`;
    pokemonWeight = `${pokemon.weight * 0.1}kg (${feet}".${inches}')`;
  }

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
              {abilities?.join(', ')}
            </div>
          </div>
          <div className={styles.pokemon__info}>
            <div className={styles.pokemon__info__title}>타입</div>
            <div className={styles.pokemon__info__data}>{types.join(', ')}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PokemonInfo;
