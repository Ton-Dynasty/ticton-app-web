import Req from "../request";

export interface RegisterParams {
  walletAddress: string;
  signature: string; // signed(walletAddress, auth_date, query_id, user)
}

export const register = async (params: RegisterParams) => {
  const { data } = await Req.post("/register", params);
  return data;
};
