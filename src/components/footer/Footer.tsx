import { db } from '@/firebase';
import { getPokemonData } from '@/lib/poketApi';
import useLikedStore from '@/store/useLikedStore';
import useUserStore from '@/store/useUsersStore';
import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect } from 'react';

const Footer = () => {
  const { user } = useUserStore();
  const { setPokemonData } = useLikedStore();

  useEffect(() => {
    if (user?.uid) {
      const unsubscribe = onSnapshot(
        doc(db, 'likes', user.uid),
        async (doc) => {
          const likedPokemons = doc.data()?.pokemons || [];
          const data = await Promise.all(likedPokemons.map(getPokemonData));
          setPokemonData(data);
        },
      );

      return () => unsubscribe();
    }
  }, [user?.uid, setPokemonData]);

  return <div>Footer</div>;
};

export default Footer;
