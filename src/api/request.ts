import axios from "axios";
import useAuthStore from "../store/auth";

const Req = axios.create({
  baseURL: import.meta.env.VITE_WEBHOOK_BASE,
});

Req.interceptors.request.use((config) => {
  const { initDataRaw, hash } = useAuthStore.getState();
  if (initDataRaw) {
    config.headers.set("Authorization", `tma ${initDataRaw}`);
    config.headers.set("X-Hash", hash);
  }
  return config;
});

export default Req;
