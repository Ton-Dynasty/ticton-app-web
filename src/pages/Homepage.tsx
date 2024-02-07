import { useEffect } from "react";
import {
  TonConnectButton,
  TonProofItemReplySuccess,
  useTonConnectUI,
  Account,
} from "@tonconnect/ui-react";
// import { useState } from "react";
// import { register } from "../api/user";

const HomePage = () => {
  const [tonConnectUI] = useTonConnectUI();

  // enable ui loader
  tonConnectUI.setConnectRequestParameters({ state: "loading" });

  const fetchTonProofPayloadFromBackend = () => {
    return JSON.stringify({
      telegram_id: "1234567890",
    });
  };

  const checkProofInYourBackend = (
    proof: TonProofItemReplySuccess,
    account: Account,
  ) => {
    console.log("proof", proof);
    console.log("account", account);
  };

  useEffect(
    () =>
      tonConnectUI.onStatusChange((wallet) => {
        if (!wallet) return;
        if (
          wallet.connectItems?.tonProof &&
          "proof" in wallet.connectItems.tonProof
        ) {
          checkProofInYourBackend(wallet.connectItems.tonProof, wallet.account);
        }
      }),
    [tonConnectUI],
  );

  // fetch you tonProofPayload from the backend
  const tonProofPayload: string | null = fetchTonProofPayloadFromBackend();

  if (!tonProofPayload) {
    // remove loader, connect request will be without any additional parameters
    tonConnectUI.setConnectRequestParameters(null);
  } else {
    // add tonProof to the connect request
    tonConnectUI.setConnectRequestParameters({
      state: "ready",
      value: { tonProof: tonProofPayload },
    });
  }
  return (
    <>
      <TonConnectButton />
    </>
  );
};

export default HomePage;
