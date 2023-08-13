import React from "react";
interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
}
const containerClasses = {
  top: "left-1/2 -translate-x-1/2 bottom-full mb-4",
  bottom: "left-1/2 -translate-x-1/2 top-full mt-2",
  left: "",
  right: "",
};

const arrowClasses = {
  top: "-bottom-2 left-1/2 -translate-x-1/2  border-r-transparent border-l-transparent border-b-transparent border-t-slate-800",
  bottom:
    "-top-2 left-1/2 border-b-slate-800  border-t-transparent border-r-transparent border-l-transparent",
  left: "",
  right: "",
};

export const Tooltip = ({
  children,
  text,
  position = "top",
  ...rest
}: IProps) => {
  return (
    <div className=" relative">
      <div className="peer flex justify-center items-center" {...rest}>
        {children}
      </div>
      <div
        className={` absolute w-max  bg-slate-800 text-white p-1.5 rounded z-10 hidden peer-hover:block  pointer-events-none ${containerClasses[position]}`}
      >
        {text}
        <span
          className={`absolute  pointer-events-none border-4 border-solid  ${arrowClasses[position]}`}
        />
      </div>
    </div>
  );
};
