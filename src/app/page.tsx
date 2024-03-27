'use client';
import PokemonDex from '@/components/dex/PokemonDex';
import useUserStore from '@/store/useUsersStore';
import dynamic from 'next/dynamic';

const FilterPlates = dynamic(() => import('@/components/plate/FilterPlates'), {
  ssr: false,
});

const Dex = () => {
  const { user } = useUserStore();

  return (
    <section style={{ marginTop: 0 }}>
      <FilterPlates />
      <PokemonDex />
    </section>
  );
};

export default Dex;
