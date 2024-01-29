import Req from "../request";

export interface RegisterParams {
  wallet_type: "telegram-wallet" | "tonkeeper" | "mytonwallet" | "tonhub";
}

export const register = async (params: RegisterParams) => {
  return Req.post("/user/register", {
    wallet_type: params.wallet_type,
  });
};
