import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import ReturnedFunction from "@/components/ReturnedFunction";
import {
  analyzeABI,
  contractDataType,
  functionType,
} from "@/functionality/analyzeABI";
import { Registery_ABI, Registery_address } from "@/constants/constants";
import { useAccount, useContract, useProvider } from "wagmi";
import { Contract, Wallet } from "ethers";
import { storeContract } from "@/functionality/storeData";
import { explorerLink } from "@/constants/constants";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import ReturnedSourceCode from "@/components/ReturnedSourceCode";

const private_key = process.env.NEXT_PUBLIC_PRIVATE_KEY;

const Explorer = () => {
  const router = useRouter();

  //   const [readFunctions, setReadFunctions] = useState<functionType[]>();
  //   const [writeFunctions, setWriteFunctions] = useState<functionType[]>();
  const [showType, setShowType] = useState("");
  //   const [constructors, setConstructors] = useState<functionType[]>();
  const [contractExists, setContractExists] = useState(false);
  //   const [contractData, setContractData] = useState<contractDataType>();
  const [contractAddress, setContractAddress] = useState("");
  const [ipfsURI, setIpfsURI] = useState("");
  const [isReadActive, setIsReadActive] = useState(false);
  const [isWriteActive, setIsWriteActive] = useState(false);
  const [isSourceCodeActive, setIsSourceCodeActive] = useState(false);

  const { address } = useAccount();
  const provider = useProvider();
  const Registery_Contract = useContract({
    address: Registery_address,
    abi: Registery_ABI,
    signerOrProvider: provider,
  });
  const toast = useToast();
  console.log(showType, "showtype here");
  useEffect(() => {
    const queryAddress = router.query.address;
    if (queryAddress) {
      setContractAddress(queryAddress);
    }
  }, [router.query]);

  async function searchContract() {
    if (!contractAddress) return;
    try {
      const response = await Registery_Contract?.getContractRecord(
        contractAddress
      );
      toast({
        title: "Address fetched!!!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      // console.log(response);
      if (!response) {
        toast({
          title: "Contract does not exist",
          description: "This contract does not exist in our registry",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
        // console.log("Contract does not exist");
        setContractExists(false);
        return;
        /// notify that Contract doesnot Exists
      }
      setIpfsURI(response);
      setContractExists(true);
      fetchContractData(response);
    } catch (error) {
      toast({
        title: `${error.reason}`,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      console.log(error);
    }
  }

  async function fetchContractData(ipfsURL) {
    const contractData = await (await fetch(ipfsURL)).json();
    // console.log(contractData);

    if (!contractData) {
      toast({
        title: "Contract Data not found",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      // console.log("Contract Data not found");
      return;
    }
    /// has bytecode , abi , code
    setContractData(contractData);
    setShowType("source");
    setIsSourceCodeActive(true);
    setIsReadActive(false);
    setIsWriteActive(false);
    getData(contractData.abi);
    //set default to the contract Tab and show all the data there
  }

  /// issue with the ABI type
  async function getData(abi) {
    const data = await analyzeABI(abi);
    // console.log(data);
    setReadFunctions(data?.read);
    setWriteFunctions(data?.write);

    console.log(data, "getData");
  }
  console.log(contractData);
  // now handle for the contract that does not exists
  // send the user to deploy page but with a contractAddress , so that it will not deploy the contract again and verify the contract

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-gray-50 via-sky-50 to-slate-50">
      <div className="flex flex-col justify-center mx-auto items-center">
        <div className="mt-24">
          <p className="text-4xl">Explore Contracts</p>
        </div>
        <div className="mt-20 flex flex-col">
          <div className="flex justify-start">
            <p className="text-xl font-mono">Paste Contract Address Here</p>
          </div>
          <div className="flex mt-6">
            <div className="w-[700px] border border-gray-300 rounded-xl py-2 px-2 flex">
              <input
                input={contractAddress}
                setInput={setContractAddress}
                search={searchContract}
                className="px-5 py-2 text-2xl rounded-2xl border border-black w-11/12"
              ></input>
              <button className="mx-3 border border-gray-400 px-3 py-1 rounded-xl text-2xl">
                <AiOutlineSearch />
              </button>
            </div>
          </div>
          <div className="mt-10">
            <Tabs
              colorScheme="blue"
              size="lg"
              align="center"
              isFitted
              variant="enclosed"
            >
              <TabList>
                <Tab>Read Contract</Tab>
                <Tab>Write Contract</Tab>
                <Tab>Source Code</Tab>
              </TabList>

              <TabPanels>
                <TabPanel>
                  <p>one!</p>
                </TabPanel>
                <TabPanel>
                  <p>two!</p>
                </TabPanel>
                <TabPanel>
                  <p>three!</p>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explorer;
