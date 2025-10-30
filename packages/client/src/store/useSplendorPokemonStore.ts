import { create } from "zustand";

export type use_SP_StoreType = {
  stagesType?: string;
  isDebug: boolean;
  setStagesType: (newData: use_SP_StoreType["stagesType"]) => void;
  setIsDebug: (newData: use_SP_StoreType["isDebug"]) => void;
};

export const use_SP_Store = create<use_SP_StoreType>((set) => ({
  stagesType: undefined,
  isDebug: false,
  setStagesType: (newData) => set({ stagesType: newData }),
  setIsDebug: (newData) => set({ isDebug: newData }),
}));
