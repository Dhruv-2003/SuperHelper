import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

const Explorer = () => {
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
              <input className="px-5 py-2 text-2xl rounded-2xl border border-black w-11/12"></input>
              <button className="mx-3 border border-gray-400 px-3 py-1 rounded-xl text-2xl">
                <AiOutlineSearch />
              </button>
            </div>
          </div>
          <div className="mt-10">
            <Tabs colorScheme='blue' size="lg" align="center" isFitted variant='enclosed'>
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