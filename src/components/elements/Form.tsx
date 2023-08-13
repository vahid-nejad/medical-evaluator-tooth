import React, { HTMLAttributes, HtmlHTMLAttributes } from "react";

export const Form = ({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLFormElement>) => {
  return (
    <form {...props} className={`${className} rounded-md border shadow`}>
      {children}
    </form>
  );
};
