import useSelectedPokemonForCard from '@/store/useSelectedPokemonForCard';
import styles from './cards.module.scss';
import PokemonCard from './PokemonCard';
import CardEditor from './CardEditor';

const ProductCard = () => {
  const { pokemonData } = useSelectedPokemonForCard();
  return (
    <>
      <div className={styles.product_card_container_decoration__top}></div>
      <div className={styles.product_card_container}>
        <PokemonCard data={pokemonData} />
        <CardEditor />
      </div>
      <div className={styles.product_card_container_decoration__bottom}></div>
    </>
  );
};

export default ProductCard;
