import React, { useEffect, useState } from "react";

export const FT = () => {
  return (
    <div className="relative  border-b-2 justify-center w-full inline-flex ">
      <input
        type="text"
        placeholder=" "
        className={`rounded  border-transparent focus:border-transparent pb-0 w-full focus:ring-0 text-slate-700   peer `}
      />
      <div className="border-blue-500 absolute top-full   transition-all peer-focus:w-full  w-0 bg-sky-500 h-0.5 "></div>
      <label
        htmlFor=""
        className="absolute  text-slate-400 peer-focus:text-sky-500 peer-placeholder-shown:text-slate-500 -top-3 bg-white right-2  scale-75 px-1  transition-all duration-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:top-2.5 peer-placeholder-shown:right-3  peer-focus:-top-3 peer-focus:scale-75 peer-focus:right-2 peer-focus:bg-white peer-focus:px-1
         "
      >
        عنوان
      </label>
    </div>
  );
};
