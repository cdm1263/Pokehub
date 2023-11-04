import { POKEMON_TYPES } from '@/lib/constants';
import styles from './Plate.module.scss';
import useSelectedStore from '@/store/useSelectedStore';

const Plate = () => {
  const koreanTypes = Object.values(POKEMON_TYPES);
  const { selectedPlate, setSelectedPlate } = useSelectedStore();

  console.log(selectedPlate);

  const renderTypes = (types: string[]) =>
    types.map((koreanType) => {
      const isPlateSelected = selectedPlate.includes(koreanType);
      const plateClassName = isPlateSelected
        ? styles.click_plate
        : styles.unclick_plate;

      return (
        <div
          onClick={() => {
            setSelectedPlate(koreanType);
          }}
          className={`${plateClassName} ${styles[koreanType]}`}
          key={koreanType}
          data-type={koreanType}
        >
          <img
            src={`/src/assets/icons/${koreanType}_${
              isPlateSelected ? 'on' : 'off'
            }.svg`}
            alt={`${koreanType}타입 아이콘`}
          />
          {isPlateSelected ? null : <span>{koreanType}</span>}
        </div>
      );
    });

  return <div className={styles.wrapper}>{renderTypes(koreanTypes)}</div>;
};

export default Plate;
