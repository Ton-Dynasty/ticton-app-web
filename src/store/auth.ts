import { create } from "zustand";

export interface AuthStoreParams {
  hash?: string;
  initDataRaw?: string;
}

interface AuthStore extends AuthStoreParams {
  setAuth: (param: AuthStoreParams) => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  setAuth: (state) => {
    set({ ...state });
  },
}));

export default useAuthStore;
