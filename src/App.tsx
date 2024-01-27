import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/Homepage";
import { useMainButton, useMiniApp } from "@tma.js/sdk-react";
import { useEffect } from "react";
import { HapticFeedback, postEvent } from "@tma.js/sdk";
import { TonConnectUIProvider } from "@tonconnect/ui-react";

function App() {
  const miniApp = useMiniApp();
  const mb = useMainButton();

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

  return (
    <TonConnectUIProvider manifestUrl="https://raw.githubusercontent.com/Ton-Dynasty/ticton-app-web/main/tonconnect-manifest.json">
      <div className="h-screen w-screen px-4">
        <div className="text-white">dfsdsffsdfsd</div>
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
