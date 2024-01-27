import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Homepage";
import { useInitData, useMainButton, useMiniApp } from "@tma.js/sdk-react";
import { useEffect } from "react";
import { HapticFeedback, postEvent } from "@tma.js/sdk";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import useAuthStore from "./store/auth";

function App() {
  const miniApp = useMiniApp();
  const mb = useMainButton();
  const initData = useInitData();
  const { user, setAuth } = useAuthStore();

  const haptic = new HapticFeedback("6.3", postEvent);

  useEffect(() => {
    miniApp.ready();
  }, [miniApp]);

  useEffect(() => {
    mb.on("click", () => {
      haptic.impactOccurred("medium");
    });
  });

  useEffect(() => {
    mb.enable().show();
  });

  useEffect(() => {
    if (initData) {
      setAuth({
        auth_date: initData.authDate.getTime(),
        query_id: initData.queryId,
        user: initData.user,
        hash: initData.hash,
      });
    }
  }, [initData, setAuth]);

  return (
    <TonConnectUIProvider
      manifestUrl={import.meta.env.VITE_TONCONNET_MANIFEST_URL}
    >
      <div className="h-screen w-screen px-4">
        <div className="text-white">{JSON.stringify(user)}</div>
        <BrowserRouter>
          <Routes>
            <Route path="/" index element={<HomePage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </TonConnectUIProvider>
  );
}

export default App;
