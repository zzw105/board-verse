import { create } from "zustand";

export type use_SP_StoreType = {
  stagesType?: string;
  setStagesType: (newData: use_SP_StoreType["stagesType"]) => void;
};

export const use_SP_Store = create<use_SP_StoreType>((set) => ({
  stagesType: undefined,
  setStagesType: (newData) => set({ stagesType: newData }),
}));
