import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserEnumName } from "../enum/user";

export type UserInfoType = {
  name: string;
  credentials?: string;
  isCurrent: boolean;
  stagesType?: string;
};

export type UserStoreType = UserInfoType & {
  setName: (newName: string) => void;
  setIsCurrent: (isCurrent: boolean) => void;
  setCredentials: (credentials?: string) => void;
  setStagesType: (stagesType?: string) => void;
};

export const useUserStore = create<UserStoreType>()(
  persist(
    (set) => ({
      name: UserEnumName.Visitor,
      isCurrent: false,
      setName: (newName: string) => set({ name: newName }),
      setCredentials: (credentials?: string) => set({ credentials }),
      setIsCurrent: (isCurrent: boolean) => set({ isCurrent }),
      setStagesType: (stagesType?: string) => set({ stagesType }),
    }),
    {
      name: "user-storage", // 存储的 key，可以自定义
    }
  )
);
