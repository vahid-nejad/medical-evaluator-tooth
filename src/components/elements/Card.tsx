import React from "react";

interface IProps extends React.InputHTMLAttributes<HTMLDivElement> {}
export const Card = ({ className, children, ...props }: IProps) => {
  return (
    <div {...props} className={`border rounded-md shadow ${className}`}>
      {children}
    </div>
  );
};
