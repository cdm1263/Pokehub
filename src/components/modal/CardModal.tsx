import PokemonCard from '../card/PokemonCard';
import { Card } from '../mypage/Mycard';
import styles from './CardModal.module.scss';
import { MouseEvent } from 'react';
import { LuPlus } from 'react-icons/lu';

interface CardModalProps {
  onModalToggle: (e: MouseEvent<HTMLDivElement>) => void;
  cardData: Card | null | undefined;
  isOpen?: boolean;
}

const CardModal = ({ onModalToggle, cardData, isOpen }: CardModalProps) => {
  const card = cardData?.data;
  const pokemonNickName = {
    pokemonNickName1: card?.pokemonCardData[1],
    pokemonNickName2: card?.pokemonCardData[2],
  };

  const handleContentClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <div className={styles.modal__container}>
      <div className={styles.modal__overlay} onClick={onModalToggle}>
        <div className={styles.modal__contents} onClick={handleContentClick}>
          <div className={styles.modal__contents__close}>
            <div onClick={onModalToggle}>
              <LuPlus size={20} className={styles.rotate} />
            </div>
          </div>
          <PokemonCard
            isOpen={isOpen}
            pokemonCardData={card?.pokemonCardData[0]}
            pokemonNickName={pokemonNickName}
          />
        </div>
      </div>
    </div>
  );
};

export default CardModal;
