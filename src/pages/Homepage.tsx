// import { TonConnectButton } from "@tonconnect/ui-react";
import { useState } from "react";
import { register } from "../api/user";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [reason, setReason] = useState("");
  const [link, setLink] = useState("");
  const handleClick = async () => {
    setIsLoading(true);
    await register({ wallet_type: "tonkeeper" })
      .then((res) => {
        console.log(res);
        setLink(res.data.url);
      })
      .catch((err) => {
        setReason(err.message);
        setTimeout(() => {
          setReason("");
        }, 2000);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center gap-10">
      <button
        className=" flex justify-center rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
        onClick={handleClick}
      >
        {isLoading ? "Loading..." : "Register"}
      </button>
      {reason && (
        <div className="absolute bottom-0 bg-red-500 p-2 text-white">
          {reason}
        </div>
      )}
      {link && (
        <a
          href={link}
          className="flex h-10 w-20 items-center justify-center bg-green-500"
        >
          link
        </a>
      )}
    </div>
  );
};

export default HomePage;
