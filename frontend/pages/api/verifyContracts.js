// send in the ContractData as

// type contractDataType = {
//   name: string;
//   address: string;
//   deployer: string;
//   abi: any[];
//   bytecode: string;
//   code: any;
//   network: string;
//   chainId: number;
// };

import { Registery_ABI, Registery_address } from "@/constants/constants";
import { storeContract } from "@/functionality/storeData";
import { http, createWalletClient, publicActions } from "viem";
import { mainnet } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";
import {
  addNewContractRecord,
  getContractRecord,
} from "../../firebase/methods";

const PRIVATE_KEY = process.env.NEXT_PUBLIC_PRIVATE_KEY;
const RPC_LINK = process.env.NEXT_PUBLIC_RPC_URL;

async function verifyContract(req, res) {
  if (!req.body.contractData) {
    return res.status(400).json({ message: "Contract Data required" });
  }

  const contractData = req.body.contractData;

  if (!contractData) {
    return res.status(400).json({ message: "Check contract Data Again" });
  }

  try {
    const CID = await storeContract(contractData);
    const IPFSURL = `https://w3s.link/ipfs/${CID}`;
    console.log(IPFSURL);
    // setIpfsLink(IPFSURL);

    /// Store the IPFS link somewhere
    // const account = privateKeyToAccount("0x...");

    // const walletClient = createWalletClient({
    //   account,
    //   chain: mainnet,
    //   transport: http(RPC_LINK),
    // }).extend(publicActions);

    // const { request } = await walletClient.simulateContract({
    //   address: Registery_address,
    //   abi: Registery_ABI,
    //   functionName: "addContractRecord",
    //   arguments: [contractData.address, IPFSURL],
    // });

    // const tx = await walletClient.writeContract(request);

    await addNewContractRecord(
      `${contractData.address}`,
      IPFSURL,
      contractData.network,
      contractData.chainId
    );

    console.log("Record Added in the registery");

    /// Record of the tx with the txHash
    res.status(200).json({ output: contractData.address });
  } catch (error) {
    res.status(400).json({ output: error });
    console.log(error);
  }
}

export default verifyContract;
