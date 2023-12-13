import { PokemonType } from '@/lib/type';
import { create } from 'zustand';

interface useSelectedPokemonForCard {
  pokemonData: PokemonType | null;
  setPokemonData: (data: PokemonType | null) => void;
  pokemonNickName1: string | null;
  setPokemonNickName1: (nickName: string) => void;
  pokemonNickName2: string | null;
  setPokemonNickName2: (nickName: string) => void;
}

const useSelectedPokemonForCard = create<useSelectedPokemonForCard>((set) => ({
  pokemonData: null,
  setPokemonData: (data) => set({ pokemonData: data }),
  pokemonNickName1: null,
  setPokemonNickName1: (nickName) => set({ pokemonNickName1: nickName }),
  pokemonNickName2: null,
  setPokemonNickName2: (nickName) => set({ pokemonNickName2: nickName }),
}));
export default useSelectedPokemonForCard;
