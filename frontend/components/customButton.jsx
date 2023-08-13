import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
const CustomButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
        const ready = mounted;
        const connected = ready && account && chain;
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
                    className="mt-3"
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
                  <button
                    onClick={onOpen}
                    className="mt-3 mx-2 px-5 py-1 rounded-2xl border border-indigo-200 text-indigo-500"
                  >
                    add custom chain
                  </button>
                  <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>Add Custom Chain</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        <div className="flex flex-col">
                          <div className="flex flex-col">
                            <p className="font-semibold">Chain Name</p>
                            <input type="text" className="mt-2 px-3 py-1 border border-black rounded-xl"></input>
                          </div>
                          <div className="flex flex-col mt-4">
                            <p className="font-semibold">Chain ID</p>
                            <input type="text" className="mt-2 px-3 py-1 border border-black rounded-xl"></input>
                          </div>
                          <div className="flex flex-col mt-4">
                            <p className="font-semibold">Chain RPC Url</p>
                            <input type="text" className="mt-2 px-3 py-1 border border-black rounded-xl"></input>
                          </div>
                          <div className="flex flex-col mt-4">
                            <p className="font-semibold">Currency Name</p>
                            <input type="text" className="mt-2 px-3 py-1 border border-black rounded-xl"></input>
                          </div>
                          <div className="flex flex-col mt-4">
                            <p className="font-semibold">Currency Symbol (Optional)</p>
                            <input type="text" className="mt-2 px-3 py-1 border border-black rounded-xl"></input>
                          </div>
                          <div className="mt-6 flex justify-center mx-auto mb-3 px-10 py-2 rounded-2xl border font-bold border-indigo-200 text-indigo-500">
                            <button>Add Chain</button>
                          </div>
                        </div>
                      </ModalBody>
                    </ModalContent>
                  </Modal>
                  <button onClick={openAccountModal}>
                    {/* {account.displayName} */}
                    {/* {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ""} */}
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
