import styles from './cards.module.scss';
import useSelectedPokemonForCard from '@/store/useSelectedPokemonForCard';
import { PokemonType } from '@/lib/type';
import { useState } from 'react';
import { POKEMON_NAME } from '@/lib/pokemonName';
import { reverseObject } from '@/lib/utill/reverseObject';
import { IoChevronForward, IoChevronBack } from 'react-icons/io5';

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
      <ul className={styles.dropdown__container}>
        {currentPagePokemons?.map((pokemon: PokemonType | undefined) => (
          <li
            className={styles.dropdown__list}
            key={pokemon?.id}
            onClick={() => selectPokemon(pokemon ? pokemon : null)}
          >
            <div>
              <img
                src={pokemon?.sprites.other?.['official-artwork'].front_default}
                alt="포켓몬 이미지"
              />
            </div>
            <span>{pokemon && reverseObject(POKEMON_NAME)[pokemon.name]}</span>
          </li>
        ))}
        {!searchResults && <span>포켓몬을 찾지 못했습니다.</span>}
      </ul>
      {totalPages > 1 && (
        <div className={styles.pagination_wrapper}>
          <button
            onClick={onPrevArrow}
            disabled={currentPage === 1}
            className={styles.arrow_button}
          >
            <IoChevronBack />
          </button>
          {renderPaginationNumbers()}
          <button
            onClick={onNextArrow}
            disabled={currentPage === totalPages}
            className={styles.arrow_button}
          >
            <IoChevronForward />
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchDropdown;
