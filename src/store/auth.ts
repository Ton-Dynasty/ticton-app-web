import { create } from "zustand";
import { User } from "@tma.js/sdk";

interface AuthStoreParams {
  auth_date?: number; // unix timestamp
  query_id?: string;
  user?: User;
  hash?: string;
}

interface AuthStore extends AuthStoreParams {
  setAuth: (param: AuthStoreParams) => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  auth_date: undefined,
  query_id: undefined,
  user: undefined,
  hash: undefined,
  setAuth: (param: AuthStoreParams) => set(() => ({ ...param })),
}));

export default useAuthStore;
