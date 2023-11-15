import { useNavigate } from 'react-router-dom';
import styles from './PokemonList.module.scss';
import { reverseObject } from '@/lib/utill/reverseObject';
import { POKEMON_NAME } from '@/lib/pokemonName';
import { POKEMON_TYPES } from '@/lib/constants';
import Plate from '../plate/Plate';
import { PokemonType, TypesType } from '@/lib/type';

interface PokemonListElementProp {
  data: PokemonType;
}

const PokemonListElement = ({ data }: PokemonListElementProp) => {
  const navigate = useNavigate();
  return (
    <li
      className={styles.pokemon_list_element}
      onClick={() => {
        navigate(`/pokemon/${data.id}`);
      }}
    >
      <div className={styles.pokemon_number}>
        <span>{`No.${data.id}`}</span>
      </div>
      <img
        className={styles.pokemon_image}
        src={data.sprites?.other?.['official-artwork']?.front_default}
        alt=""
      />
      <span className={styles.pokemon_name}>
        {reverseObject(POKEMON_NAME)[data.name]}
      </span>
      <div className={styles.pokemon_type}>
        {data.types.map((typeData: TypesType) => (
          <Plate
            key={typeData.type.name}
            pokemonTypeProp={POKEMON_TYPES[typeData.type.name]}
          />
        ))}
      </div>
    </li>
  );
};

export default PokemonListElement;
