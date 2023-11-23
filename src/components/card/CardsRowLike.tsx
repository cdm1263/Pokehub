import { useGetAllPokemon } from '@/query/qeuries';
import CardsRowLayout from './CardsRowLayout';
import styles from './cards.module.scss';
import { PokemonType } from '@/lib/type';
import { IoChevronForward, IoChevronBack } from 'react-icons/io5';

const CardsRowLike = () => {
  // 임시 데이터
  // 찜 기능 추가되면 수정할 예정
  const { data, isFetched } = useGetAllPokemon(1017);
  const likePokemonArray: PokemonType[] = [];
  const num = [1, 2, 3];
  if (isFetched) {
    num.forEach((i) => {
      likePokemonArray.push(data?.[i]);
    });
  }

  return (
    <div className={styles.pokemon_select_wrapper}>
      <span className={styles.title}>내가 찜한 포켓몬</span>
      <div>
        <button className={styles.page_button}>
          <IoChevronBack />
        </button>
        <CardsRowLayout pokemonArray={likePokemonArray} />
        <button className={styles.page_button}>
          <IoChevronForward />
        </button>
      </div>
    </div>
  );
};

export default CardsRowLike;
