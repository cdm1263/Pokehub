import { arrayRemove, doc, updateDoc } from 'firebase/firestore';
import styles from './Mypage.module.scss';
import { db } from '@/firebase';
import useUserStore from '@/store/useUsersStore';
import { useNavigate } from 'react-router-dom';
import useLikedStore from '@/store/useLikedStore';
import RenderPokemon from './RenderPokemon';

const MyLikedPokemon = () => {
  const { user } = useUserStore();
  const { pokemonData } = useLikedStore();

  const navigate = useNavigate();

  const onCancelLiked = async (pokemonId: string | number) => {
    if (user?.uid) {
      const myLikedPokemonRef = doc(db, 'likes', user.uid);

      await updateDoc(myLikedPokemonRef, {
        pokemons: arrayRemove(pokemonId),
      });
    }
  };

  const onMoveToPokemonDetail = (pokemonId: string | number) => {
    navigate(`/pokemon/${pokemonId}`);
  };

  console.log(pokemonData);

  return (
    <>
      <div className={styles.myactive__right__container}>
        <div className={styles.myactive__liked__title}>
          <span>찜한 포켓몬</span>
        </div>
        <div className={styles.myactive__liked__box}>
          {pokemonData.map((pokemon) => (
            <RenderPokemon
              key={pokemon.id}
              pokemon={pokemon}
              onCancelLiked={onCancelLiked}
              onMoveToPokemonDetail={onMoveToPokemonDetail}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default MyLikedPokemon;
