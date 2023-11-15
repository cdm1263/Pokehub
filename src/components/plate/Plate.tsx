import styles from './Plate.module.scss';

interface PlateProp {
  pokemonTypeProp: string;
}

const Plate = ({ pokemonTypeProp }: PlateProp) => {
  const renderTypes = (koreanType: string) => (
    <div
      className={`${styles.type_plate} ${styles[koreanType]}`}
      key={koreanType}
      data-type={koreanType}
    >
      <img
        loading="lazy"
        src={`/src/assets/icons/${koreanType}_on.svg`}
        alt={`${koreanType}타입 아이콘`}
      />
      <span>{koreanType}</span>
    </div>
  );

  return <div className={styles.wrapper}>{renderTypes(pokemonTypeProp)}</div>;
};

export default Plate;
