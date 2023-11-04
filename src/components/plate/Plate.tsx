import { POKEMON_TYPES } from '@/lib/constants';
import styles from './Plate.module.scss';
import useSelectedStore from '@/store/useSelectedStore';

const Plate = () => {
  const koreanTypes = Object.values(POKEMON_TYPES);
  const { selectedPlate, setSelectedPlate } = useSelectedStore();

  console.log(selectedPlate);

  const renderTypes = (types: string[]) =>
    types.map((koreanType) => {
      if (selectedPlate.includes(koreanType)) {
        return (
          <div
            onClick={() => {
              setSelectedPlate(koreanType);
            }}
            className={`${styles.click_plate} ${styles[koreanType]}`}
            key={koreanType}
            data-type={koreanType}
          >
            <img
              src={`/src/assets/${koreanType}.svg`}
              alt={`${koreanType}타입 아이콘`}
            />
          </div>
        );
      }
      return (
        <div
          onClick={() => {
            setSelectedPlate(koreanType);
          }}
          className={`${styles.unclick_plate} ${styles[koreanType]}`}
          key={koreanType}
          data-type={koreanType}
        >
          <img
            src={`/src/assets/${koreanType}.svg`}
            alt={`${koreanType}타입 아이콘`}
          />
          <span>{koreanType}</span>
        </div>
      );
    });

  return <div className={styles.wrapper}>{renderTypes(koreanTypes)}</div>;
};

export default Plate;
