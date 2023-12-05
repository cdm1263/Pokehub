import { PokemonType } from '@/lib/type';
import { create } from 'zustand';

interface useSelectedPokemonForCard {
  pokemonData: PokemonType | null;
  setPokemonData: (data: PokemonType) => void;
}

const useSelectedPokemonForCard = create<useSelectedPokemonForCard>((set) => ({
  pokemonData: null,
  setPokemonData: (data) => set({ pokemonData: data }),
}));
export default useSelectedPokemonForCard;
