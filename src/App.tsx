import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Homepage";
import {
  useInitData,
  useInitDataRaw,
  useMainButton,
  useMiniApp,
} from "@tma.js/sdk-react";
import { useEffect } from "react";
import { HapticFeedback, postEvent } from "@tma.js/sdk";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import useAuthStore from "./store/auth";

function App() {
  const miniApp = useMiniApp();
  const mb = useMainButton();
  const { setAuth } = useAuthStore();
  const initData = useInitData();
  const initDataRaw = useInitDataRaw();

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
    if (initDataRaw && initData?.hash) {
      setAuth({ initDataRaw: initDataRaw, hash: initData?.hash });
    }
  }, [initData, initDataRaw, setAuth]);

  return (
    <TonConnectUIProvider
      manifestUrl={import.meta.env.VITE_TONCONNET_MANIFEST_URL}
    >
      <div className="h-screen w-screen px-4">
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
