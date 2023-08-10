import React from "react";

const Verifier = () => {
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
              <input className="px-5 py-2 text-2xl rounded-2xl border border-black w-[700px]"></input>
            </div>
          </div>
          <div className="mt-20 flex flex-col">
            <div className="flex justify-start">
              <p className="text-xl font-mono">Paste Contract Code Here</p>
            </div>
            <div className="flex mt-6 justify-center mx-auto">
              <textarea className="border border-black w-[700px] rounded-xl px-4 py-2 font-sans h-[500px]"></textarea>
            </div>
            <div className="mt-7 mb-20 flex justify-center mx-auto">
              <button className="px-10 py-1.5 rounded-xl border bg-gradient-to-r from-indigo-400 to-green-400 text-white text-xl hover:scale-110 duration-200">
                Compile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verifier;