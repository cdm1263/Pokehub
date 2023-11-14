import styles from './PokemonList.module.scss';
import { useGetAllPokemon } from '@/query/qeuries';
import { reverseObject } from '@/lib/utill/reverseObject';
import { POKEMON_NAME } from '@/lib/pokemonName';
import { POKEMON_TYPES } from '@/lib/constants';
import { TypesType } from '@/lib/type';

const PokemonList = () => {
  const { isLoading, data: pokemonData } = useGetAllPokemon(1017);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.pokemon_grid}>
      {pokemonData?.map((data) => (
        <div
          key={data.name}
          onClick={() => {
            console.log(data.name, reverseObject(POKEMON_NAME)[data.name]);
          }}
        >
          <span>{data.id}</span>
          <img src={data.sprites.front_default} alt="" />
          <div>
            {data.types.map((typeData: TypesType) => (
              <div key={typeData.type.name}>
                {POKEMON_TYPES[typeData.type.name]}
              </div>
            ))}
          </div>
          <span>{reverseObject(POKEMON_NAME)[data.name]}</span>
        </div>
      ))}
    </div>
  );
};

export default PokemonList;
