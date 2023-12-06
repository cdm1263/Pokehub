import { PokemonType, TypesType } from '@/lib/type';
import styles from './pokemonCard.module.scss';
import Plate from '../plate/Plate';
import { POKEMON_TYPES } from '@/lib/constants';
import { POKEMON_NAME } from '@/lib/pokemonName';
import { reverseObject } from '@/lib/utill/reverseObject';
import StatusBar from '../detail/StatusBar';

interface PokemonCardProp {
  data: PokemonType | null;
}

const PokemonCard = ({ data }: PokemonCardProp) => {
  const firstType = data?.types[0].type.name;
  const setClassName = (mainClassName: string) => {
    return firstType
      ? `${styles[mainClassName]} ${styles[POKEMON_TYPES[firstType]]}`
      : styles[mainClassName];
  };

  return (
    <div className={setClassName('wrapper')}>
      <div className={setClassName('pokemon_number')}>{`No.${data?.id}`}</div>
      <div className={styles.white_block}>
        <div className={setClassName('container')}>
          <div className={styles.container__top}>
            <div className={styles.type_containter}>
              {data?.types.map((pokemonType: TypesType) => (
                <Plate
                  key={pokemonType.type.name}
                  pokemonTypeProp={POKEMON_TYPES[pokemonType.type.name]}
                />
              ))}
            </div>
            <img
              className={styles.pokemon_image}
              src={data?.sprites?.other?.['official-artwork']?.front_default}
              alt="포켓몬 이미지"
            />
            <div className={styles.pokemon_intro}>
              <div className={styles.pokemon_name}>
                <span className={styles.text__small}>전설의</span>
                <span className={styles.text__small}>화가난</span>
              </div>
              <span className={styles.text__large}>
                {data && reverseObject(POKEMON_NAME)[data.name]}
              </span>
            </div>
          </div>
          <div className={styles.container__bottom}>
            <div className={styles.status}>
              <span>체력</span>
              {data ? (
                <StatusBar
                  baseStat={data?.stats[0]}
                  pokemonTypes={data?.types}
                />
              ) : null}
            </div>
            <div className={styles.status}>
              <span>특수공격</span>
              {data ? (
                <StatusBar
                  baseStat={data?.stats[3]}
                  pokemonTypes={data?.types}
                />
              ) : null}
            </div>
            <div className={styles.status}>
              <span>공격</span>
              {data ? (
                <StatusBar
                  baseStat={data?.stats[1]}
                  pokemonTypes={data?.types}
                />
              ) : null}
            </div>
            <div className={styles.status}>
              <span>특수방어</span>
              {data ? (
                <StatusBar
                  baseStat={data?.stats[4]}
                  pokemonTypes={data?.types}
                />
              ) : null}
            </div>
            <div className={styles.status}>
              <span>방어</span>
              {data ? (
                <StatusBar
                  baseStat={data?.stats[2]}
                  pokemonTypes={data?.types}
                />
              ) : null}
            </div>
            <div className={styles.status}>
              <span>스피드</span>
              {data ? (
                <StatusBar
                  baseStat={data?.stats[5]}
                  pokemonTypes={data?.types}
                />
              ) : null}
            </div>
            <img
              className={styles.logo}
              src="/src/assets/logo-pokehub.png"
              alt="PoketHub"
            />
            <div className={styles.total_stat}>
              <span className={styles.text__small}>Total</span>
              <span className={styles.text__large}>
                {data?.stats.reduce(
                  (acc, baseStat) => acc + baseStat.base_stat,
                  0,
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
