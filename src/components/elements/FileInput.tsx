import React, { useState } from "react";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  children?: React.ReactNode;
  lablText?: string;
  onSelect?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  justButton?: boolean;
}

export const FileInput = React.forwardRef<HTMLInputElement, IProps>(
  (
    {
      children,
      className,
      lablText,
      onChange,
      onSelect,
      error,

      justButton = false,

      ...props
    },
    ref,
  ) => {
    const [fileName, setFileName] = useState("");
    function fileChangedHandler(e: any) {
      const file = e.target.files[0];
      setFileName(file.name);
      onChange && onChange(e);
      onSelect && onSelect(e);
    }

    const getVariant = (variant?: string) => {
      switch (variant) {
        case "primary":
          return "bg-violet-500 hover:bg-violet-700 text-white";
        case "danger":
          return "bg-red-500 hover:bg-red-700 text-white ";
        case "success":
          return "bg-green-500 hover:bg-green-700 text-white ";
        case "outline-danger":
          return "bg-white text-red-500 border border-red-500 hover:text-white hover:bg-red-700  ";
        case "outline-danger":
          return "bg-white text-red-500 border border-red-500 hover:text-white hover:bg-red-700  ";
        case "outline-success":
          return "bg-white text-green-500 border border-green-500 hover:text-white hover:bg-green-700  ";
        case "outline-warning":
          return "bg-white text-amber-400 border border-amber-500 hover:text-white hover:bg-amber-500  ";
        case "outline-primary":
          return "bg-white text-violet-500 border border-violet-500 hover:text-white hover:bg-violet-700  ";

        default:
          return "bg-violet-500 hover:bg-violet-700 hover:bg-gra text-white shadow shadow-violet-600/25 hover:shadow-violet-600/75";
      }
    };
    return (
      <div dir="rtl" className={className}>
        {lablText && (
          <label
            className="block text-gray-600 text-xs lg:text-sm xl:text-base mb-2"
            htmlFor="txt"
          >
            {lablText}
          </label>
        )}
        <label
          className={`${
            !justButton &&
            "w-full  relative border flex items-center rounded-md"
          } cursor-pointer  group`}
        >
          <div
            className={` inline-block h-full  py-3 ${
              justButton ? "rounded-md" : "rounded-r-md"
            } px-2  text-white transition duration-500  ${getVariant()}`}
          >
            <input
              className="hidden"
              ref={ref}
              onChange={(e) => fileChangedHandler(e)}
              {...props}
              type="file"
            />
            انتخاب فایل
          </div>
          <span className={`${justButton && "hidden"} mx-2 `}>{fileName}</span>
        </label>
        {error && (
          <p className="text-red-600 text-right animate-shake">{error}</p>
        )}
      </div>
    );
  },
);
FileInput.displayName = "FileInput";
