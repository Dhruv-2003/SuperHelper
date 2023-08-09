import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import {
  base,
  baseGoerli,
  mainnet,
  optimism,
  optimismGoerli,
  zora,
  zoraTestnet,
} from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const modeSepolia = {
  id: 919,
  name: "Mode Testnet",
  network: "Filecoin — HyperSpace testnet",
  nativeCurrency: {
    decimals: 18,
    name: "ETH",
    symbol: "ETH",
  },
  rpcUrls: {
    public: {
      http: ["https://sepolia.mode.network"],
    },
    default: {
      http: ["https://sepolia.mode.network"],
    },
  },
  blockExplorers: {
    default: {
      name: "Mode Sepolia Explorer",
      url: "https://sepolia.explorer.mode.network/",
    },
  },
  testnet: true,
};

const { chains, publicClient } = configureChains(
  [
    mainnet,
    optimism,
    optimismGoerli,
    zora,
    zoraTestnet,
    base,
    baseGoerli,
    modeSepolia,
  ],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  projectId: "952483bf7a0f5ace4c40eb53967f1368",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

function MyApp({ Component, pageProps }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
