import React from "react";

interface IProps {
  className?: string;
  children?: React.ReactNode;
  onClose?: () => void;
}
export const FormHeader = ({ children, className, onClose }: IProps) => {
  return (
    <h3
      className={`text-center relative text-slate-500  bg-gradient-to-b shadow-inner rou from-white to-slate-100 py-1 ${className}`}
    >
      {children}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-1.5 left-3 hover:text-red-500"
        >
          &#x2715;
        </button>
      )}
    </h3>
  );
};
