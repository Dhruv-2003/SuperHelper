import React from "react";
import baselogo from "../public/baselogo.svg";
import oplogo from "../public/oplogo.svg";
import zoralogo from "../public/zoralogo.svg";
import modelogo from "../public/modelogo.svg";
import verifylogo from "../public/verifylogo.svg";
import deploylogo from "../public/deploylogo.svg";
import explorelogo from "../public/explorelogo.svg";
import clilogo from "../public/clilogo.svg";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="">
      <div className="w-screen h-full bg-gradient-to-br from-gray-50 via-sky-50 to-slate-50">
        <div className="flex flex-col">
          <div className="flex flex-col justify-center mx-auto items-center">
            <div className="mt-28 flex flex-col">
              <p className="text-transparent text-6xl bg-clip-text bg-gradient-to-r from-indigo-500 via-indigo-400 to-green-300">
                The Developer Tools Suite
              </p>
              <p className="text-center text-6xl mt-4 font-semibold">
                for{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-200 to-green-400">
                  OP Stack
                </span>{" "}
                Chains
              </p>
              <p className="mt-6 text-center text-xl font-mono">
                {" "}
                Everything for smart contract tooling in your hands
              </p>
              <p className="mt-2 text-center text-xl font-mono">
                {" "}
                All the tools for smart contracts
              </p>
            </div>
            <div className="mt-10 flex">
              <div className="w-full flex justify-center mx-auto">
                <button className="mx-10 bg-gradient-to-r from-indigo-300 to-green-300 text-white text-xl px-12 py-2 rounded-3xl">
                  Deployer
                </button>
                <button className="mx-10 bg-gradient-to-r from-indigo-300 to-green-300 text-white text-xl px-12 py-2 rounded-3xl">
                  Explorer
                </button>
              </div>
            </div>
            <div className="mt-32">
              <div className="flex h-full w-11/12 bg-hero bg-no-repeat bg-cover bg-center bg-fixed justify-center mx-auto rounded-2xl">
                <div className="px-10 py-7">
                  <div className="flex w-full align-middle justify-center">
                    <div className="w-1/3 flex flex-col justify-start">
                      <div className="my-auto">
                        <p className="text-white text-3xl">Why Superhelper ?</p>
                        <p className="text-white text-xl mt-5">
                          Lorem ipsum dolor, sit amet consectetur adipisicing
                          elit. Velit ipsum minus, minima sed nulla, cumque
                          explicabo eveniet excepturi architecto corporis
                          voluptatem quod, sapiente quo doloremque ab ex harum
                          quia quasi?
                        </p>
                      </div>
                    </div>
                    <div className="inline-block mx-10 h-min-[400px] w-1 self-stretch bg-white opacity-100"></div>
                    <div className="w-1/2 flex justify-end">
                      <div className="grid grid-flow-col grid-cols-2 grid-rows-2 gap-x-20 gap-y-10">
                        <div className="flex flex-col">
                          <Image
                            src={verifylogo}
                            height={60}
                            width={60}
                            alt=""
                          ></Image>
                          <p className="text-white text-xl mt-2">Verifier</p>
                          <p className="text-white font-mono mt-2 ">
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Velit ipsum minus, minima sed nulla, cumque
                          </p>
                        </div>
                        <div>
                          <Image
                            src={deploylogo}
                            height={60}
                            width={60}
                            alt=""
                          ></Image>
                          <p className="text-white text-xl mt-2">Deployer</p>
                          <p className="text-white font-mono mt-2">
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Velit ipsum minus, minima sed nulla, cumque
                          </p>
                        </div>
                        <div>
                          <Image
                            src={explorelogo}
                            height={80}
                            width={80}
                            alt=""
                          ></Image>
                          <p className="text-white text-xl mt-2">Explorer</p>
                          <p className="text-white font-mono mt-2">
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Velit ipsum minus, minima sed nulla, cumque
                          </p>
                        </div>
                        <div>
                          <Image
                            src={clilogo}
                            height={60}
                            width={60}
                            alt=""
                          ></Image>
                          <p className="text-white text-xl mt-2">CLI tools</p>
                          <p className="text-white font-mono mt-2">
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Velit ipsum minus, minima sed nulla, cumque
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-20 flex flex-col mb-20">
              <p className="text-5xl">
                All{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-200 to-red-300">
                  OP stack
                </span>{" "}
                chains supported
              </p>
              <div className="grid grid-flow-col grid-cols-5 gap-x-6 mt-14">
                <Image src={baselogo} height={80} width={80} alt=""></Image>
                <Image src={oplogo} height={80} width={80} alt=""></Image>
                <Image src={zoralogo} height={80} width={80} alt=""></Image>
                <Image src={modelogo} height={80} width={80} alt=""></Image>
                <p className="font-mono w-1/3">and more ...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;