import { ConnectButton } from "@rainbow-me/rainbowkit";
import { addNewContractRecord, getContractRecord } from "../firebase/methods";

const CustomButton = () => {
  const addNewChain = async (
    chainId,
    chainName,
    currName,
    currSymbol,
    currDecimals,
    rpcURL
  ) => {
    // accept Inputs as form for the new Chain to be added
    let chains = localStorage.getItem("chains");
    const newChain = {
      chainId: chainId,
      chainName: chainName,
      nativeCurrency: {
        name: currName,
        symbol: currSymbol,
        decimals: currDecimals,
      },
      rpcUrls: [rpcURL],
    };

    if (chains) {
      chains.push(newChain);
    } else {
      chains = [newChain];
    }

    localStorage.setItem("chains", chains);

    try {
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: chainId }],
      });
    } catch (switchError) {
      // This error code indicates that the chain has not been added to MetaMask.
      if (switchError.code === 4902) {
        try {
          await ethereum.request({
            method: "wallet_addEthereumChain",
            params: [newChain],
          });
        } catch (addError) {
          // handle "add" error
        }
      }
      // handle other "switch" errors
    }
  };

  const changeNetwork = async (chainId) => {
    switchNetwork(chainId);
    try {
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: chainId }],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log(accounts);
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
          (!authenticationStatus || authenticationStatus === "authenticated");
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
                  <button
                    onClick={openConnectModal}
                    type="button"
                    className="px-10 py-2 rounded-2xl border text-xl border-indigo-200 text-indigo-500"
                  >
                    Sign In
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
  );
};

export default CustomButton;
