import { useEffect, useState } from 'react';
import styles from './Detail.module.scss';

import { STAT_NAME } from '@/lib/constants';
import { StatusProps } from '@/lib/type';

const Status = ({ baseStats }: StatusProps) => {
  const [percentages, setPercentages] = useState<Record<string, number>>({});

  useEffect(() => {
    const maxStatValue = 255;
    const newPercentages: Record<string, number> = {};

    baseStats.forEach((baseStat) => {
      let currentPercentage = 0;
      const targetPercentage = (baseStat.base_stat / maxStatValue) * 100;

      const interval = setInterval(
        () => {
          if (currentPercentage < targetPercentage) {
            currentPercentage++;
            newPercentages[baseStat.stat.name] =
              currentPercentage > 100 ? 100 : currentPercentage;
            setPercentages((prev) => ({ ...prev, ...newPercentages }));
          } else {
            clearInterval(interval);
          }
        },
        (255 / targetPercentage) * 10,
      );
    });

    return () => {
      baseStats.forEach((baseStat) => {
        clearInterval(newPercentages[baseStat.stat.name]);
      });
    };
  }, [baseStats]);

  return (
    <div className={styles.stats__container}>
      <div className={styles.stats}>
        {baseStats.map((baseStat) => (
          <div key={baseStat.stat.name} className={styles.stat}>
            <label className={styles.stat__label}>
              {STAT_NAME[baseStat.stat.name]}
            </label>
            <div className={styles.stat__barBg}>
              <div
                className={styles.stat__barFilled}
                style={{ width: `${percentages[baseStat.stat.name] || 0}%` }}
              >
                <div className={styles.stat__striped}></div>
              </div>
              <span className={styles.stat__value}>{baseStat.base_stat}</span>
            </div>
          </div>
        ))}
        <div className={styles.stats__total}>
          Total:{' '}
          {baseStats.reduce((acc, baseStat) => acc + baseStat.base_stat, 0)}
        </div>
      </div>
    </div>
  );
};

export default Status;
