import { POKEMON_TYPES } from '@/lib/constants';
import styles from './Plate.module.scss';

const Plate = () => {
  const koreanTypes = Object.values(POKEMON_TYPES);

  return koreanTypes.map((koreanType) => (
    <div
      className={`${styles.plate} ${styles[koreanType]}`}
      key={koreanType}
      data-type={koreanType}
    >
      <img src="" alt={`${koreanType}타입 아이콘`} />
      <span>{koreanType}</span>
    </div>
  ));
};

export default Plate;
