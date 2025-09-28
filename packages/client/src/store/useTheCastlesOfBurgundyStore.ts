import { type DicePointsEnum, StateEnum } from "@game/shared";
import { create } from "zustand";

export type useTheCastlesOfBurgundyStoreType = {
  choiceDice: {
    id: string;
    playerId: number;
    dicePoint: DicePointsEnum | StateEnum.EMPTY;
  };
  setChoiceDice: (newData: useTheCastlesOfBurgundyStoreType["choiceDice"]) => void;
};

export const useTheCastlesOfBurgundyStore = create<useTheCastlesOfBurgundyStoreType>((set) => ({
  choiceDice: {
    id: "",
    playerId: -1,
    dicePoint: StateEnum.EMPTY,
  },
  setChoiceDice: (newData) => set({ choiceDice: newData }),
}));
