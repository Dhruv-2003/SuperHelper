import chalk from "chalk";
import inquirer from "inquirer";
import figlet from "figlet";
import { createSpinner } from "nanospinner";
import fsPromises from "fs/promises";
import path, { dirname } from "path";
import fetch from "node-fetch";

const API_ENDPOINT = "http://localhost:3000";

// Global Variables
async function getChainId(networkName) {
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

async function welcome() {
  console.log(chalk.bold("SUPER HELPER CLI"));

  console.log(`
  Options: 
  - Compile => Compile any given contract 
  - Deploy => Deploy the Contract after compiling
  - Verify => Verify the Contract which is already deployed
  - Search => Search the Contract in the Registery with the address 
  `);
}

async function askTask() {
  const answers = await inquirer.prompt({
    name: "Task",
    type: "list",
    message: "What do you want to do ?",
    choices: ["Compile", "Deploy", "Verify", "Search"],
  });

  // Check the Task type and process it
  const choice = answers.Task;
  // console.log(choice, answers);

  if (choice == "Compile") {
    compile();
  } else if (choice == "Deploy") {
    deploy();
  } else if (choice == "Verify") {
    verify();
  } else if (choice == "Search") {
    search();
  } else {
    console.log("WRONG CHOICE");
    askTask();
  }
}

async function compile() {
  /// Take the file Path
  const answers = await inquirer.prompt({
    name: "Filepath",
    type: "input",
    message: "Enter the Contract Source File path: ",
  });
  const spinner = createSpinner("Compiling...").start();
  try {
    const filePath = answers.Filepath;

    // /// Check the file path Should have .sol in the end
    // let extension = filePath.slice(
    //   (Math.max(0, filePath.lastIndexOf(".")) || Infinity) + 1
    // );

    /// Get the file and then read it's content
    const data = await fsPromises.readFile(
      path.join(process.cwd(), filePath),
      "utf8"
    );
    // console.log(data);

    /// Call the Compile API with the SourceCode
    const response = await fetch(`${API_ENDPOINT}/api/compile`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sourceCode: data }),
    });

    /// Parse the Output and display that
    // console.log(response);
    const formattedResponse = (await response.json()).output;
    spinner.stop();

    if (response.status == 200) {
      console.log("Successfully Compiled");
      return { formattedResponse, data };
    } else {
      console.log("Compilation Failed");
      console.log(formattedResponse);
    }
  } catch (error) {
    spinner.stop();
    /// Show the Errors if present based on the API Res Code
    console.log(error);
  }
}

async function deploy() {
  const { formattedResponse, data } = await compile();

  const answers = await inquirer.prompt([
    {
      name: "contractName",
      type: "input",
      message: "Enter the Contract Name: ",
    },
    {
      name: "deployerAddress",
      type: "input",
      message: "Enter the deployer Address: ",
    },
    {
      name: "network",
      type: "list",
      message: "Choose the Network : ",
      choices: [
        "optimism",
        "optimismGoerli",
        "zora",
        "zoraTestnet",
        "base",
        "baseGoerli",
        "modeSepolia",
        "custom",
      ],
    },
    {
      name: "deployerAddress",
      type: "input",
      message: "Enter the deployer Address: ",
    },
  ]);

  ///  Same 1st step as Compile
  const spinner = createSpinner("Preparing Upload ...").start();
  try {
    const contractData = {
      name: answers.contractName,
      deployer: answers.deployerAddress,
      abi: formattedResponse?.abi,
      bytecode: formattedResponse?.bytecode,
      code: data,
      network: answers.network, /// need to check the network name
      chainId: getChainId(answers.network),
    };

    /// Move ahead if it compiles properly
    /// We can deploy directly from here by taking in thier Private Key and Signing the tx if needed
    /// Also take the network
    /// -- OR --
    if (formattedResponse) {
      spinner.update("Uploading...");
      /// Upload the Data to IPFS
      /// Show a link to then deploy it on the Chain of choices
      const response = await fetch(`${API_ENDPOINT}/api/prepareDeploy`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ contractData }),
      });

      const formattedRes = await response.json();
      spinner.stop();
      /// An API Endpoint for storing this required data on IPFS
      console.log(`CONTRACT DATA UPLOADED TO IPFS : ${formattedRes.ipfsURL}`);
      console.log(
        `TO DEPLOY , CONTINUE ON THE LINK ${formattedRes.deployLink}`
      );
    } else {
      spinner.stop();
      console.log("DATA MISSING , TRY AGAIN");
    }
  } catch (error) {
    spinner.stop();
    console.log(error);
  }
}

async function verify() {
  /// Take in the File , Compile first ,
  const { formattedResponse, data } = await compile();

  const answers = await inquirer.prompt([
    {
      name: "contractName",
      type: "input",
      message: "Enter the Contract Name: ",
    },
    {
      name: "contractAddress",
      type: "input",
      message: "Enter the deployed Contract Address: ",
    },
    {
      name: "deployerAddress",
      type: "input",
      message: "Enter the deployer Address: ",
    },
    {
      name: "network",
      type: "list",
      message: "Choose the Network : ",
      choices: [
        "optimism",
        "optimismGoerli",
        "zora",
        "zoraTestnet",
        "base",
        "baseGoerli",
        "modeSepolia",
        "custom",
      ],
    },
    {
      name: "deployerAddress",
      type: "input",
      message: "Enter the deployer Address: ",
    },
  ]);

  const spinner = createSpinner("Verifying...").start();
  try {
    const contractData = {
      name: answers.contractName,
      address: answers.contractAddress,
      deployer: answers.deployerAddress,
      abi: formattedResponse?.abi,
      bytecode: formattedResponse?.bytecode,
      code: data,
      network: answers.network, /// need to check the network name
      chainId: getChainId(answers.network),
    };

    /// All goes while , take in Address
    if (formattedResponse) {
      spinner.update("Verifying ...");
      /// Call the API with both of the info
      /// Check the Format of the data going in
      const response = await fetch(`${API_ENDPOINT}/api/verifyContract`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ contractData }),
      });

      const formattedRes = await response.json();
      spinner.stop();
      const explorerLink = `${API_ENDPOINT}/explorer/${answers.contractAddress}`;
      /// Show the Verified contract link to the User
      console.log("Contract Successfully verified");
      console.log("IPFS URL for the Data: ", formattedRes.ipfsURL);
      console.log(`The contract can be explored here : ${explorerLink}`);
    } else {
      console.log("Verification Failed , Try Again !!");
      spinner.stop();
    }
  } catch (error) {
    spinner.stop();
    console.log(error);
  }
}

async function search() {
  /// take in the address
  const answers = await inquirer.prompt({
    name: "contractAddress",
    type: "input",
    message: "Enter the deployed Contract Address: ",
  });

  const spinner = createSpinner("Fetching...").start();
  /// Call the API to check if the Address does exit ??
  try {
    const response = await fetch(`${API_ENDPOINT}/api/searchContract`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ contractAddress: answers.contractAddress }),
    });

    // console.log(response);
    const formattedResponse = (await response.json()).output;
    if (formattedResponse) {
      spinner.stop();
      console.log("Contract Successfully fetched !!");
      console.log(
        "IPFS URI for the contract data : ",
        formattedResponse.ipfsURL
      );
      const explorerLink = `${API_ENDPOINT}/explorer/${answers.contractAddress}`;
      console.log(
        `Contract can be further looked and explored on : ${explorerLink}`
      );
    } else {
      spinner.stop();
      console.log("Contract Not found , Verify First !!");
    }
  } catch (error) {
    spinner.stop();
    console.log(error);
  }

  /// Show the info , or display the same info on a fixed link
}

// Processes
console.clear();
await welcome();
await askTask();
