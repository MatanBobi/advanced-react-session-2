import { createContext, useEffect, useState } from "react";
interface NetworkContext {
  isOnline: boolean;
  setIsOnline: (isOnline: boolean) => void;
}

export const NetworkContext = createContext<NetworkContext | null>(null);
interface NetworkStatusProviderProps {}

export function NetworkStatusProvider(props: NetworkStatusProviderProps) {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const setOnline = () => {
      setIsOnline(true);
    };
    const setOffline = () => {
      setIsOnline(false);
    };
    window.addEventListener("online", setOnline);
    window.addEventListener("offline", setOffline);
    return () => {
      window.removeEventListener("online", setOnline);
      window.removeEventListener("offline", setOffline);
    };
  }, []);

  const value = { isOnline, setIsOnline };

  return <NetworkContext value={value} {...props} />;
}
