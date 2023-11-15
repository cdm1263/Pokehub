import { POKEMON_NAME } from '@/lib/pokemonName';
import { PokemonInfoProps } from '@/lib/type';
import styles from './Detail.module.scss';
import { FORM_NAMES } from '@/lib/pokemonFormNames';

const PokemonImg = ({
  pokemon,
  flavorText,
  genus,
  formName,
}: PokemonInfoProps) => {
  const pokemonOfficialImage =
    pokemon?.sprites.other?.['official-artwork'].front_default;

  const getKoreanName = (englishName: string | undefined) => {
    return Object.keys(POKEMON_NAME).find(
      (key) => POKEMON_NAME[key] === englishName,
    );
  };

  const getKoreanFormName = (englishName: string | undefined) => {
    return FORM_NAMES[englishName as string];
  };

  const koreanName =
    formName ||
    getKoreanName(pokemon?.name) ||
    getKoreanFormName(pokemon?.name);

  return (
    <>
      <div className={styles.detail__center}>
        <div
          style={{
            letterSpacing: '10px',
            fontWeight: 'bold',
            fontSize: '34px',
          }}
        >
          {koreanName}
        </div>
        <div style={{ marginTop: '20px' }}>{genus}</div>
        <img
          loading="lazy"
          src={pokemonOfficialImage || undefined}
          alt="Official Artwork"
        />
        <div>{flavorText}</div>
      </div>
    </>
  );
};

export default PokemonImg;
