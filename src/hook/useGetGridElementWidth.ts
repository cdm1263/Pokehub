import { useState, useEffect } from 'react';

const useGetGridElementWidth = (gridWidth: number) => {
  const [itemWidth, setItemWidth] = useState(0);

  useEffect(() => {
    const minItemWidth = 200;
    const gap = 20;

    const maxItems = Math.floor((gridWidth + gap) / (minItemWidth + gap));

    const totalGapWidth = (maxItems - 1) * gap;
    const remainingWidth = gridWidth - totalGapWidth;
    const itemWidth = remainingWidth / maxItems;

    setItemWidth(itemWidth);
  }, [gridWidth]);

  return itemWidth;
};

export default useGetGridElementWidth;
