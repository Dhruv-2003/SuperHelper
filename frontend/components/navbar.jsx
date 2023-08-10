import React from "react";

const Navbar = () => {
  return (
    <div className="w-screen bg-gradient-to-br from-gray-50 via-sky-50 to-slate-50">
      <div className="flex px-10 pt-3 pb-1 justify-between">
        <p className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-green-400 text-4xl">
          SuperHelper
        </p>
        <button className="px-10 py-2 rounded-2xl border text-xl border-indigo-200 text-indigo-500">
            Sign In
        </button>
      </div>
    </div>
  );
};

export default Navbar;