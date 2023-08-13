import React, { useEffect } from "react";

interface IProps {
  percent: number;
  className?: string;
}
export const ProgressBar = ({ percent, className }: IProps) => {
  return (
    <div className={className + "   border overflow-hidden"}>
      <div
        className="bg-white float-left  h-full"
        style={{ width: `${percent <= 100 ? 100 - percent : 0}%` }}
      ></div>
    </div>
  );
};
