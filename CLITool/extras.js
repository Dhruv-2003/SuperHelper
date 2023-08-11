export async function getChainId(networkName) {
  if (networkName == "optimism") {
    return 10;
  } else if (networkName == "optimismGoerli") {
    return 420;
  } else if (networkName == "zora") {
    return 7777777;
  } else if (networkName == "zoraTestnet") {
    return 999;
  } else if (networkName == "base") {
    return 8453;
  } else if (networkName == "baseGoerli") {
    return 84531;
  } else if (networkName == "modeSepolia") {
    return 919;
  } else {
    return;
  }
}
