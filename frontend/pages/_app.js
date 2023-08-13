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
// import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { ChakraProvider } from "@chakra-ui/react";
import localFont from "@next/font/local";
import Navbar from "../components/navbar";
import "../styles/globals.css";

const myFont = localFont({ src: "./CalSans-SemiBold.woff2" });

const modeSepolia = {
  id: 919,
  name: "Mode Testnet",
  network: "modeTestnet",
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
  [optimism, optimismGoerli, zora, zoraTestnet, base, baseGoerli, modeSepolia],
  [publicProvider()]
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
    <ChakraProvider>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains}>
          <main className={myFont.className}>
            <Navbar />
            <Component {...pageProps} />
          </main>
        </RainbowKitProvider>
      </WagmiConfig>
    </ChakraProvider>
  );
}

export default MyApp;
