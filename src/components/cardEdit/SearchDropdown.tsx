import styles from './cards.module.scss';
import useSelectedPokemonForCard from '@/store/useSelectedPokemonForCard';
import { PokemonType } from '@/lib/type';
import { useState } from 'react';

interface SearchDropdownProp {
  searchResults: (PokemonType | undefined)[] | null;
  setIsOpen: (arg: boolean) => void;
}

const SearchDropdown = ({ searchResults, setIsOpen }: SearchDropdownProp) => {
  const { setPokemonData } = useSelectedPokemonForCard();
  const [currentPage, setCurrentPage] = useState(1);
  let totalPages = 0;
  let currentPagePokemons = null;

  const selectPokemon = (pokemon: PokemonType | null) => {
    setPokemonData(pokemon);
    setIsOpen(false);
  };

  if (searchResults) {
    totalPages = Math.ceil(searchResults?.length / 12);
  }

  const renderPaginationNumbers = () => {
    const pages = [];
    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages, startPage + 2);

    for (let i = startPage; i <= endPage; i += 1) {
      pages.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`${styles.pagination_button} ${
            currentPage === i ? styles.button__action : ''
          }`}
        >
          {i}
        </button>,
      );
    }

    return pages;
  };

  const onPrevArrow = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const onNextArrow = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  if (searchResults) {
    currentPagePokemons =
      searchResults?.length > 12
        ? searchResults?.slice((currentPage - 1) * 12, currentPage * 12)
        : searchResults;
  }

  return (
    <div className={styles.dropdown_wrapper}>
      <ul className={styles.dropdown__list}>
        {currentPagePokemons?.map((pokemon: PokemonType | undefined) => (
          <li
            key={pokemon?.id}
            onClick={() => selectPokemon(pokemon ? pokemon : null)}
          >
            {pokemon?.name}
          </li>
        ))}
        {!searchResults && <span>포켓몬을 찾지 못했습니다.</span>}
      </ul>
      {totalPages > 1 && (
        <div className={styles.pagination_wrapper}>
          <button onClick={onPrevArrow} disabled={currentPage === 1}>
            {'<'}
          </button>
          {renderPaginationNumbers()}
          <button onClick={onNextArrow} disabled={currentPage === totalPages}>
            {'>'}
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchDropdown;
