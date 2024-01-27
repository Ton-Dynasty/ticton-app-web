import axios from "axios";
import useAuthStore from "../store/auth";

const Req = axios.create({
  baseURL: import.meta.env.VITE_WEBHOOK_BASE,
});

Req.interceptors.request.use((config) => {
  const { auth_date, query_id, user, hash } = useAuthStore.getState();
  if (auth_date && query_id && user) {
    config.headers.set("X-Auth-Date", auth_date);
    config.headers.set("X-Query-ID", query_id);
    config.headers.set("X-User", JSON.stringify(user));
    config.headers.set("X-Hash", hash);
  }
  return config;
});

export default Req;
