import { POKEMON_TYPES } from '@/lib/constants';
import styles from './Detail.module.scss';
import { useEffect, useState } from 'react';
import { Stat, TypesType } from '@/lib/type';

interface StatusBarProp {
  baseStat: Stat;
  pokemonTypes: TypesType[];
}

const StatusBar = ({ baseStat, pokemonTypes }: StatusBarProp) => {
  const [percentages, setPercentages] = useState<Record<string, number>>({});

  const typeColor = pokemonTypes?.map((typeInfo) => {
    return POKEMON_TYPES[typeInfo.type.name];
  });

  useEffect(() => {
    const maxStatValue = 255;
    const targetPercentage = (baseStat.base_stat / maxStatValue) * 100;
    setPercentages((prev) => ({
      ...prev,
      [baseStat.stat.name]: targetPercentage,
    }));
  }, [baseStat]);

  return (
    <div
      className={`${styles.stat__barBg}  ${typeColor && styles[typeColor[0]]}`}
    >
      <div
        className={`${styles.stat__barFilled} ${
          typeColor && styles[typeColor[0]]
        }`}
        style={{
          width: `${percentages[baseStat.stat.name] || 0}%`,
          borderRadius: '4px',
        }}
      >
        <div className={styles.stat__striped}></div>
      </div>
      <span
        className={`${styles.stat__value} ${typeColor && styles[typeColor[0]]}`}
      >
        {baseStat.base_stat}
      </span>
    </div>
  );
};

export default StatusBar;
