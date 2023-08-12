import {
  EAS,
  Offchain,
  SchemaEncoder,
  createOffchainURL,
} from "@ethereum-attestation-service/eas-sdk";

const EASContractAddress = ""; // decide what chain it has to be on
const EASVersion = "0.26";
const CHAINID = ""; // not decided yet

const SchemaUID = ""; // not decided chain yet
const rawSchema =
  "address ContractAddress,string IpfsURI,string Network,uint32 chainID,address DeployerAddress";

const EAS_CONFIG = {
  address: EASContractAddress,
  version: EASVersion, // 0.26
  chainId: CHAINID,
};

class EASService {
  easClient;
  //   offChain;
  signer;

  constructor(provider, signer) {
    this.easClient = new EAS(EASContractAddress);
    // this.offchain = new Offchain(EAS_CONFIG, 1);
    this.signer = signer;

    this.easClient.connect(signer);
  }

  async getAttestationData(attestationUid) {
    const attestation = await this.easClient.getAttestation(attestationUid);

    console.log(attestation);
    return attestation;
  }

  async createOnChainsAttestations(
    ContractAddress,
    IpfsURI,
    Network,
    chainID,
    DeployerAddress
  ) {
    const schemaEncoder = new SchemaEncoder(rawSchema);
    const encodedData = schemaEncoder.encodeData([
      { name: "ContractAddress", value: ContractAddress, type: "address" },
      { name: "IpfsURI", value: IpfsURI, type: "string" },
      { name: "Network", value: Network, type: "string" },
      { name: "chainID", value: chainID, type: "uint32" },
      { name: "DeployerAddress", value: DeployerAddress, type: "string" },
    ]);

    const address = await this.signer.getAddress();
    console.log(address);
    console.log(this.signer);
    console.log(this.easClient);

    const tx = await this.easClient.attest({
      schema: SchemaUID,
      data: {
        recipient: address,
        expirationTime: 0,
        revocable: true,
        data: encodedData,
      },
    });

    const newAttestationUID = await tx.wait();

    console.log("New attestation UID:", newAttestationUID);
  }

  async createOffChainAttestations(
    ContractAddress,
    IpfsURI,
    Network,
    chainID,
    DeployerAddress
  ) {
    const timestamp = Math.floor(Date.now() / 1000);
    console.log(timestamp);
    const address = await this.signer.getAddress();
    const schemaEncoder = new SchemaEncoder(rawSchema);

    const encodedData = schemaEncoder.encodeData([
      { name: "ContractAddress", value: ContractAddress, type: "address" },
      { name: "IpfsURI", value: IpfsURI, type: "string" },
      { name: "Network", value: Network, type: "string" },
      { name: "chainID", value: chainID, type: "uint32" },
      { name: "DeployerAddress", value: DeployerAddress, type: "string" },
    ]);
    console.log(encodedData);
    const offChainClient = new Offchain(EAS_CONFIG, 1);

    const signedoffchainAttestation =
      await offChainClient.signOffchainAttestation(
        {
          recipient: address,
          expirationTime: 0,
          time: timestamp,
          revocable: true,
          nonce: 0,
          schema: SchemaUID,
          version: 1,
          refUID:
            "0x0000000000000000000000000000000000000000000000000000000000000000",
          data: encodedData,
        },
        this.signer
      );
    console.log(signedoffchainAttestation);
    const uid = signedoffchainAttestation.uid;
    const url = await createOffchainURL({
      sig: signedoffchainAttestation,
      signer: address,
    });
    console.log(url);
    return { url, uid };
  }
}

export default EASService;
