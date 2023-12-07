import useSelectedPokemonForCard from '@/store/useSelectedPokemonForCard';
import CardsRowLike from '@/components/card/CardsRowLike';
import CardsRowRandom from '@/components/card/CardsRowRandom';
import styles from './cards.module.scss';
import PokemonCard from './PokemonCard';
import CardEditor from './CardEditor';
import Inner from '../Inner';

const CardPage = () => {
  const { pokemonData } = useSelectedPokemonForCard();

  return (
    <Inner>
      <div className={styles.card_page_wrapper}>
        <div className={styles.product_card_wrapper}>
          <div className={styles.product_card_container_decoration__top}></div>
          <div className={styles.product_card_container}>
            <PokemonCard data={pokemonData} />
            <CardEditor />
          </div>
          <div
            className={styles.product_card_container_decoration__bottom}
          ></div>
        </div>
        <div className={styles.select_wrapper}>
          <CardsRowLike />
          <CardsRowRandom />
        </div>
      </div>
    </Inner>
  );
};

export default CardPage;
