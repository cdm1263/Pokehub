import styles from './cards.module.scss';
import useSelectedPokemonForCard from '@/store/useSelectedPokemonForCard';
import { PokemonType } from '@/lib/type';

interface SearchDropdownProp {
  searchResults: (PokemonType | undefined)[] | null | undefined;
  setIsOpen: (arg: boolean) => void;
}

const SearchDropdown = ({ searchResults, setIsOpen }: SearchDropdownProp) => {
  const { setPokemonData } = useSelectedPokemonForCard();

  const selectPokemon = (pokemon: PokemonType | null) => {
    setPokemonData(pokemon);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdown}>
      <ul className={styles.dropdown__list}>
        {searchResults ? (
          searchResults.map((pokemon: PokemonType | undefined) => (
            <li
              key={pokemon?.id}
              onClick={() => selectPokemon(pokemon ? pokemon : null)}
            >
              {pokemon?.name}
            </li>
          ))
        ) : (
          <span>포켓몬을 찾지 못했습니다.</span>
        )}
      </ul>
    </div>
  );
};

export default SearchDropdown;
