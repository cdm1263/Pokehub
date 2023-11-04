import { create } from 'zustand';

interface useSelectedStore {
  selectedPlate: string[];
  setSelectedPlate: (plate: string) => void;
}

const useSelectedStore = create<useSelectedStore>((set) => ({
  selectedPlate: [],
  setSelectedPlate: (plate) =>
    set((state) => {
      if (state.selectedPlate.includes(plate)) {
        return {
          selectedPlate: state.selectedPlate.filter((item) => item !== plate),
        };
      } else {
        return { selectedPlate: [...state.selectedPlate, plate] };
      }
    }),
}));

export default useSelectedStore;
