import React from "react";
interface IProps {
  className?: string;
}
const Spinner = ({
  className,
}: IProps) => {
  return (
    <div
      className={`animate-spin  border-2 rounded-full border-t-sky-500 border-slate-300 ${className}`}
    ></div>
  );
};

export default Spinner;
