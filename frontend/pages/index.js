import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useSwitchNetwork } from "wagmi";
import { addNewContractRecord, getContractRecord } from "../firebase/methods";
import Hero from "../components/hero";

export default function Home() {
  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork();

  const changeNetwork = (chainId) => {
    switchNetwork(chainId);
  };

  return (
    <div>
      <ConnectButton />
      <div>
        <ConnectButton.Custom>
          {({
            account,
            chain,
            openAccountModal,
            openChainModal,
            openConnectModal,
            authenticationStatus,
            mounted,
          }) => {
            // Note: If your app doesn't use authentication, you
            // can remove all 'authenticationStatus' checks
            const ready = mounted && authenticationStatus !== "loading";
            const connected =
              ready &&
              account &&
              chain &&
              (!authenticationStatus ||
                authenticationStatus === "authenticated");

            return (
              <div
                {...(!ready && {
                  "aria-hidden": true,
                  style: {
                    opacity: 0,
                    pointerEvents: "none",
                    userSelect: "none",
                  },
                })}
              >
                {(() => {
                  if (!connected) {
                    return (
                      <button onClick={openConnectModal} type="button">
                        Connect Wallet
                      </button>
                    );
                  }

                  if (chain.unsupported) {
                    return (
                      <button onClick={openChainModal} type="button">
                        Wrong network
                      </button>
                    );
                  }

                  return (
                    <div style={{ display: "flex", gap: 12 }}>
                      <button
                        onClick={openChainModal}
                        style={{ display: "flex", alignItems: "center" }}
                        type="button"
                      >
                        {chain.hasIcon && (
                          <div
                            style={{
                              background: chain.iconBackground,
                              width: 12,
                              height: 12,
                              borderRadius: 999,
                              overflow: "hidden",
                              marginRight: 4,
                            }}
                          >
                            {chain.iconUrl && (
                              <img
                                alt={chain.name ?? "Chain icon"}
                                src={chain.iconUrl}
                                style={{ width: 12, height: 12 }}
                              />
                            )}
                          </div>
                        )}
                        {chain.name}
                      </button>

                      <button onClick={openAccountModal} type="button">
                        {account.displayName}
                        {account.displayBalance
                          ? ` (${account.displayBalance})`
                          : ""}
                      </button>
                    </div>
                  );
                })()}
              </div>
            );
          }}
        </ConnectButton.Custom>
      </div>
      {/* <button
        onClick={() =>
          addNewContractRecord(
            0xb72a04b01bb80dfd6a42ea8e0907b892286113f2,
            "",
            "testnet",
            1
          )
        }
      >
        Set Record
      </button>
      <button
        onClick={() =>
          getContractRecord(0xb72a04b01bb80dfd6a42ea8e0907b892286113f2)
        }
      >
        Get Record
      </button> */}
      <Hero />
    </div>
  );
}
