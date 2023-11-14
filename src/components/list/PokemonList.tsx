import styles from './PokemonList.module.scss';
import { useGetAllPokemon } from '@/query/qeuries';
import { reverseObject } from '@/lib/utill/reverseObject';
import { POKEMON_NAME } from '@/lib/pokemonName';
import { POKEMON_TYPES } from '@/lib/constants';
import { TypesType } from '@/lib/type';
import Plate from '../plate/Plate';
import { useNavigate } from 'react-router-dom';

const PokemonList = () => {
  const { isLoading, data: pokemonDatas } = useGetAllPokemon(1017);
  const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.pokemon_grid}>
      {pokemonDatas?.map((data) => (
        <div
          key={data.name}
          onClick={() => {
            navigate(`/pokemon/${data.id}`);
          }}
        >
          <div className={styles.pokemon_number}>
            <span>{`No.${data.id}`}</span>
          </div>
          <img
            className={styles.pokemon_image}
            src={data.sprites.other['official-artwork'].front_default}
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
        </div>
      ))}
    </div>
  );
};

export default PokemonList;
