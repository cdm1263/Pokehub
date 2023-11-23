import { ReactNode } from 'react';
import styles from './PokemonList.module.scss';
import { PokemonType } from '@/lib/type';

interface PokemonListElementLayoutProp {
  children: ReactNode;
  data: PokemonType;
  onClick?: () => void;
}

const PokemonListElementLayout = ({
  children,
  data,
  onClick,
}: PokemonListElementLayoutProp) => {
  return (
    <li className={styles.pokemon_list_element} onClick={onClick}>
      <div className={styles.pokemon_number}>
        <span>{`No.${data.id}`}</span>
      </div>
      {children}
    </li>
  );
};

export default PokemonListElementLayout;
