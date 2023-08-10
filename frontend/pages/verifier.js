import React from "react";
import ConstructorArguments from "./ConstructorArgs";
import { deploy } from "../functionality/deployContract";
import { useAccount, useProvider, useTransaction } from "wagmi";
import { storeContract } from "../functionality/storeData";
import { Contract, Wallet } from "ethers";
import { Registery_ABI, Registery_address } from "../constants/constants";
import { explorerLink } from "../constants/constants";
import { useToast } from "@chakra-ui/react";
const private_key = process.env.NEXT_PUBLIC_PRIVATE_KEY;

const Verifier = () => {
  const { address } = useAccount();
  const provider = useProvider();
  const toast = useToast();

  const [contractName, setContractName] = useState("");
  const [sourceCode, setSourceCode] = useState("");
  // const [output, setOutput] = useState<{ abi: any[]; bytecode: string }>();

  const [contractAddress, setContractAddress] = useState("");
  const [error, setError] = useState("");

  const [compiled, setCompiled] = useState(false);
  const [ipfsLink, setIpfsLink] = useState("");

  /// add the ENV thing and enable
  const manager_wallet = new Wallet(private_key, provider);
  const registery_contract = new Contract(
    Registery_address,
    Registery_ABI,
    manager_wallet
  );

  /// contract with imports have to be managed , not yet handled
  async function handleCompile() {
    if (!sourceCode) {
      toast({
        title: "No source code",
        description:
          "You need to provide source code to perform compilation!!!",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });
      // console.log("no Source code set");
      return;
    }

    /// For proper handling we can change the API call format
    const response = await fetch("./api/compile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sourceCode }),
    });

    console.log(response);
    const formattedResponse = (await response.json()).output;
    // console.log(formattedResponse, "formatted response");

    if (response.status == 200) {
      setOutput(formattedResponse);
      toast({
        title: "Compilation successfull",
        description:
          "Your code was compiled succesfully, You can deploy your contract now.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      // console.log("Successfully Compiled");
      setError("Successfully Compiled");
      /// analyze the ABI and show const
      // handleABI(formattedResponse.abi);

      setCompiled(true);
    } else {
      setError(formattedResponse);
      toast({
        title: "Compilation error",
        description: `${formattedResponse}`,
        status: "error",
        duration: 2700,
        isClosable: true,
      });
    }
  }

  async function verifyContract() {
    /// store the contract info on the Web3.storage and add the data , CID to a Contract or Web2 Database
    if (!output && !contractAddress) {
      toast({
        title: "Contract Not Compiled OR Deployed!!!",
        description: `This contract is either not deployed or compiled, which is necessary for contract verification`,
        status: "error",
        duration: 2800,
        isClosable: true,
      });
      // console.log("Compile & Deploy the Contract first");
      setError("Compile & Deploy the Contract first");
      return;
    }

    const contractData = {
      name: contractName,
      address: contractAddress,
      deployer: address,
      abi: output?.abi,
      bytecode: output?.bytecode,
      code: sourceCode,
    };

    toast({
      title: "Uploading to IPFS...",
      status: "loading",
      duration: 2000,
      isClosable: true,
    });
    const CID = await storeContract(contractData);
    const IPFSURL = `https://w3s.link/ipfs/${CID}`;
    console.log(IPFSURL, "IPFSURL");
    setIpfsLink(IPFSURL);
    toast({
      title: "IPFS URL",
      description: `${IPFSURL}`,
      status: "success",
      duration: 2800,
      isClosable: true,
    });
    /// Store the IPFS link somewhere

    const tx = await registery_contract.addContractRecord(
      contractAddress,
      IPFSURL
    );
    toast({
      title: "Adding Contract to Registry",
      status: "loading",
      duration: 2500,
      isClosable: true,
    });
    await tx.wait();
    // console.log("Record Added in the registery");
    toast({
      title: "Record Added in the Registry",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  }

  return (
    <div>
      <div className="w-screen h-full bg-gradient-to-br from-gray-50 via-sky-50 to-slate-50">
        <div className="flex flex-col justify-center mx-auto items-center">
          <div className="mt-24">
            <p className="text-4xl">Verify Contracts</p>
          </div>
          <div className="mt-14">
            <p className="text-xl font-mono">Paste Contract Address Here</p>
          </div>
          <div className="flex mt-6">
            <div>
              <input
                onChange={(e) => {
                  setContractAddress(e.target.value);
                }}
                className="px-5 py-2 text-2xl rounded-2xl border border-black w-[700px]"
              ></input>
            </div>
          </div>
          <div className="mt-20 flex flex-col">
            <div className="flex justify-start">
              <p className="text-xl font-mono">Paste Contract Code Here</p>
            </div>
            <div className="flex mt-6 justify-center mx-auto">
              <textarea
                onChange={(e) => setSourceCode(e.target.value)}
                className="border border-black w-[700px] rounded-xl px-4 py-2 font-sans h-[500px]"
              ></textarea>
            </div>
            <div className="mt-7 mb-20 flex justify-center mx-auto">
              <button
                onClick={() => handleCompile()}
                className="px-10 py-1.5 rounded-xl border bg-gradient-to-r from-indigo-400 to-green-400 text-white text-xl hover:scale-110 duration-200"
              >
                Compile
              </button>
              {compiled && (
                <button
                  onClick={() => verifyContract()}
                  className="px-10 py-1.5 rounded-xl border bg-gradient-to-r from-indigo-400 to-green-400 text-white text-xl hover:scale-110 duration-200"
                >
                  Verify
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verifier;
