import { type BuildingsType, type DicePointsEnum, StateEnum } from "@game/shared";
import { create } from "zustand";

export type useTheCastlesOfBurgundyStoreType = {
  choiceDice: {
    id: string;
    playerId: number;
    dicePoint: DicePointsEnum | StateEnum.EMPTY;
  };
  choiceBuilding: BuildingsType | StateEnum.EMPTY;
  setChoiceDice: (newData: useTheCastlesOfBurgundyStoreType["choiceDice"]) => void;
  cleanChoiceDice: () => void;
  setChoiceBuilding: (newData: useTheCastlesOfBurgundyStoreType["choiceBuilding"]) => void;
  cleanChoiceBuilding: () => void;
};

export const useTheCastlesOfBurgundyStore = create<useTheCastlesOfBurgundyStoreType>((set) => ({
  choiceDice: {
    id: "",
    playerId: -1,
    dicePoint: StateEnum.EMPTY,
  },
  choiceBuilding: StateEnum.EMPTY,
  setChoiceDice: (newData) => set({ choiceDice: newData }),
  cleanChoiceDice: () => set({ choiceDice: { id: "", playerId: -1, dicePoint: StateEnum.EMPTY } }),
  setChoiceBuilding: (newData) => set({ choiceBuilding: newData }),
  cleanChoiceBuilding: () => set({ choiceBuilding: StateEnum.EMPTY }),
}));
