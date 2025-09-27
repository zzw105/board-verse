import { create } from "zustand";

export type Debug = {
  debugNum1: number;
  debugNum2: number;
  debugNum3: number;
  debugNum4: number;
  debugNum5: number;
  setDebugNum1: (debugNum1: number) => void;
  setDebugNum2: (debugNum2: number) => void;
  setDebugNum3: (debugNum3: number) => void;
  setDebugNum4: (debugNum4: number) => void;
  setDebugNum5: (debugNum5: number) => void;
};

export const useDebugStore = create<Debug>((set) => ({
  debugNum1: 0,
  debugNum2: 0,
  debugNum3: 0,
  debugNum4: 0,
  debugNum5: 0,
  setDebugNum1: (debugNum1) => set({ debugNum1 }),
  setDebugNum2: (debugNum2) => set({ debugNum2 }),
  setDebugNum3: (debugNum3) => set({ debugNum3 }),
  setDebugNum4: (debugNum4) => set({ debugNum4 }),
  setDebugNum5: (debugNum5) => set({ debugNum5 }),
}));
/*   
const {
  debugNum1,
  debugNum2,
  debugNum3,
  debugNum4,
  debugNum5,
} = useDebugStore(); 
*/
