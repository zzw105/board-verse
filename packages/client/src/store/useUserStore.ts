import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserEnumName } from "../enum/user";

export type UserInfoType = {
  name: string;
  credentials?: string;
};

export type UserStoreType = UserInfoType & {
  setName: (newName: string) => void;
  setCredentials: (credentials?: string) => void;
};

export const useUserStore = create<UserStoreType>()(
  persist(
    (set) => ({
      name: UserEnumName.Visitor,
      setName: (newName: string) => set({ name: newName }),
      setCredentials: (credentials?: string) => set({ credentials }),
    }),
    {
      name: "user-storage", // 存储的 key，可以自定义
    }
  )
);
