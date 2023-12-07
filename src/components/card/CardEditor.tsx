import {
  POKEMON_NICKNAME1,
  POKEMON_NICKNAME2,
  POKEMON_TYPES,
} from '@/lib/constants';
import styles from './cards.module.scss';
import useSelectedPokemonForCard from '@/store/useSelectedPokemonForCard';
import StatusBar from '../detail/StatusBar';
import Plate from '../plate/Plate';
import { TypesType } from '@/lib/type';

const CardEditor = () => {
  const {
    pokemonData,
    pokemonNickName1,
    pokemonNickName2,
    setPokemonNickName1,
    setPokemonNickName2,
  } = useSelectedPokemonForCard();

  const getRandomNickName = (NickNames: string[], index: number) => {
    const randomIndex = Math.floor(Math.random() * NickNames.length);
    const randomNickName = NickNames[randomIndex];
    index === 1
      ? setPokemonNickName1(randomNickName)
      : setPokemonNickName2(randomNickName);
  };

  return (
    <div className={styles.editor_wrapper}>
      <div className={styles.editor_wrapper__top}>
        <span className={styles.title}>몬스터 이름</span>
        <ul className={styles.pokemon_name_editor}>
          <li>
            <span className={styles.list_name}>별칭 1</span>
            <div>
              <span>{pokemonNickName1}</span>
              <button
                className={styles.border_button}
                onClick={() => {
                  getRandomNickName(POKEMON_NICKNAME1, 1);
                }}
              >
                랜덤
              </button>
            </div>
          </li>
          <li>
            <span className={styles.list_name}>별칭 2</span>
            <div>
              <span>{pokemonNickName2}</span>
              <button
                className={styles.border_button}
                onClick={() => {
                  getRandomNickName(POKEMON_NICKNAME2, 2);
                }}
              >
                랜덤
              </button>
            </div>
          </li>
          <li>
            <span className={styles.list_name}> 이름</span>
            <div></div>
          </li>
        </ul>
      </div>
      <div className={styles.editor_wrapper__bottom}>
        <div className={styles.status_title}>
          <span className={styles.title}>스테이터스</span>
          <div>
            {pokemonData?.types.map((pokemonType: TypesType) => (
              <Plate
                key={pokemonType.type.name}
                pokemonTypeProp={POKEMON_TYPES[pokemonType.type.name]}
              />
            ))}
          </div>
        </div>
        <ul className={styles.status_bar_container}>
          <li>
            <span>체력</span>
            {pokemonData ? (
              <StatusBar
                baseStat={pokemonData?.stats[0]}
                pokemonTypes={pokemonData?.types}
              />
            ) : null}
          </li>
          <li>
            <span>공격</span>
            {pokemonData ? (
              <StatusBar
                baseStat={pokemonData?.stats[1]}
                pokemonTypes={pokemonData?.types}
              />
            ) : null}
          </li>
          <li>
            <span>방어</span>
            {pokemonData ? (
              <StatusBar
                baseStat={pokemonData?.stats[2]}
                pokemonTypes={pokemonData?.types}
              />
            ) : null}
          </li>
          <li>
            <span>특수공격</span>
            {pokemonData ? (
              <StatusBar
                baseStat={pokemonData?.stats[3]}
                pokemonTypes={pokemonData?.types}
              />
            ) : null}
          </li>
          <li>
            <span>특수방어</span>
            {pokemonData ? (
              <StatusBar
                baseStat={pokemonData?.stats[4]}
                pokemonTypes={pokemonData?.types}
              />
            ) : null}
          </li>
          <li>
            <span>스피드</span>
            {pokemonData ? (
              <StatusBar
                baseStat={pokemonData?.stats[5]}
                pokemonTypes={pokemonData?.types}
              />
            ) : null}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CardEditor;
