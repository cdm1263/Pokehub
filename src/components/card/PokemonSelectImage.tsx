import styles from './cards.module.scss';

interface PokemonSelectImageProp {
  pokemonImage: string | undefined;
}

const PokemonSelectImage = ({ pokemonImage }: PokemonSelectImageProp) => {
  return (
    <div className={styles.cards__row_cards__card}>
      <img src={pokemonImage} alt="포켓몬 이미지" />
    </div>
  );
};

export default PokemonSelectImage;
