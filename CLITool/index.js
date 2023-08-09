import chalk from "chalk";
import inquirer from "inquirer";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

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
    type: "input",
    message: "What do you want to do ?",
    default() {
      return "compile";
    },
  });

  // convert answers in lowerCase
  // Check the Task type and process it
}

async function compile() {
  /// Take the file Path
  /// Get the file and then read it's content
  /// Call the Compile API with the SourceCode
  /// Parse the Output and display that
  /// Show the Errors if present based on the API Res Code
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
