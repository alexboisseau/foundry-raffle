import { useAccount } from "wagmi";

import { Account } from "./components/Account";
import { Connect } from "./components/Connect";
import { NetworkSwitcher } from "./components/NetworkSwitcher";

export function App() {
  const { isConnected } = useAccount();

  return (
    <>
      <h1>wagmi + Vite</h1>

      <Connect />

      {isConnected && (
        <>
          <Account />
          <hr />
          <hr />
          <NetworkSwitcher />
        </>
      )}
    </>
  );
}
