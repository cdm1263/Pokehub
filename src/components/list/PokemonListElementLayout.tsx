import { ReactNode } from 'react';
import styles from './PokemonList.module.scss';
import { PokemonType } from '@/lib/type';
import { motion } from 'framer-motion';

interface PokemonListElementLayoutProp {
  children: ReactNode;
  data: PokemonType;
  onClick?: () => void;
  className?: string;
}

const PokemonListElementLayout = ({
  children,
  data,
  onClick,
  className,
}: PokemonListElementLayoutProp) => {
  return (
    <motion.li
      whileHover={{
        scale: 1.02,
        boxShadow: `rgba(0, 0, 0, 0.24) 0px 3px 8px`,
      }}
      transition={{ duration: 0.3 }}
      className={`${styles.pokemon_list_element} ${className || ''}`}
      onClick={onClick}
    >
      <div className={styles.pokemon_number}>
        <span>{`No.${data.id}`}</span>
      </div>
      {children}
    </motion.li>
  );
};

export default PokemonListElementLayout;
