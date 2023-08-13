import React from "react";
interface IProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  labelText?: string;
  error?: string;
  children?: React.ReactNode;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, IProps>(
  ({ className, children, labelText: lableText, error, ...props }, ref) => {
    return (
      <div className={className + " relative"}>
        {lableText && (
          <label
            className="block text-gray-600 text-xs text-right lg:text-sm xl:text-base mb-2"
            htmlFor="txt"
          >
            {lableText}
          </label>
        )}
        <div className="flex items-center">
          <textarea
            id="txt"
            className={
              "border border-slate-400 disabled:border-slate-100 w-full block outline-none py-2 px-1   text-xs lg:text-sm xl:text-base rounded-md bg-slate-50 focus:shadow focus:shadow-blue-500 transition  " +
              (error && "border-red-500 border animate-shake")
            }
            {...props}
            ref={ref}
          ></textarea>

          <div className="-ml-7">{children}</div>
        </div>
        {error && <p className="text-red-600 text-right animate-shake">{error}</p>}
      </div>
    );
  }
);
TextArea.displayName = "TextArea";
