import chalk from "chalk";
import inquirer from "inquirer";
import figlet from "figlet";
import { createSpinner } from "nanospinner";
import fsPromises from "fs/promises";
import path from "path";

// Global Variables

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
  } else if (choice == "Verify") {
  } else if (choice == "Search") {
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
    message: "Enter the Contract Source File path?",
  });
  try {
    const spinner = createSpinner("Compiling...").start();

    const filePath = answers.Filepath;

    /// Check the file path Should have .sol in the end
    extension = filePath.slice(
      (Math.max(0, filePath.lastIndexOf(".")) || Infinity) + 1
    );

    /// Get the file and then read it's content
    const data = await fsPromises.readFile(
      path.join(__dirname, filePath),
      "utf8"
    );

    /// Call the Compile API with the SourceCode
    const response = await fetch("./api/compile", {
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
    } else {
      console.log("Successfully Compiled");
      console.log(formattedResponse);
    }
  } catch (error) {
    /// Show the Errors if present based on the API Res Code
    console.log(error);
  }
}

async function deploy() {
  ///  Same 1st step as Compile
  /// Move ahead if it compiles properly
  /// We can deploy directly from here by taking in thier Private Key and Signing the tx if needed
  /// Also take the network
  /// -- OR --
  /// Upload the Data to IPFS
  /// Show a link to then deploy it on the Chain of choice
}

async function verify() {
  /// Take in the File , Compile first ,
  /// All goes while , take in Address
  /// Call the API with both of the info
  /// Check the Format of the data going in
  /// Show the Verified contract link to the User
}

async function search() {
  /// take in the address
  /// Call the API to check if the Address does exit ??
  /// Show the info , or display the same info on a fixed link
}

// Processes
console.clear();
await welcome();
await askTask();
