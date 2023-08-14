import React, { useState } from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import { BaseType } from "typescript";
type Props = {
  labelText?: string;
  error?: string;
  children?: React.ReactNode;
  onChange?: (num: number) => void;
  initialvalue?: number;
  className?: string;

  min?: number;
  max?: number;
  separator?: boolean;
};

export const NumberInput = ({
  className,
  children,
  labelText: lableText,
  error,
  initialvalue,
  onChange,
  separator = true,
  ...props
}: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = parseInt(e.target.value.replaceAll(",", ""));
    onChange && !Number.isNaN(num) && onChange(num);
  };
  return (
    <div dir="rtl" className={className}>
      {lableText && (
        <label
          className="mb-2 block text-right text-xs text-gray-600 lg:text-sm xl:text-base"
          htmlFor="txt"
        >
          {lableText}
        </label>
      )}
      <div className="relative flex items-stretch ">
        {/* <input
            id="txt"
            className={`block  w-full border bg-slate-50 py-2 px-1 text-xs outline-none transition-all focus:shadow focus:shadow-blue-500  disabled:border-slate-100 lg:text-sm xl:text-base 
              ${error ? " animate-shake   border-red-500" : "border-slate-400"} ${
              children ? "rounded-r-md" : "rounded-md"
            }`}
            type="text"
            ref={ref}
            value={value}
            onChange={handleChange}
            {...props}
          ></input> */}
        <NumericFormat
          className={`block  w-full border bg-slate-50 py-2 px-1 text-xs outline-none transition-all focus:shadow focus:shadow-blue-500  disabled:border-slate-100 lg:text-sm xl:text-base 
              ${error ? " animate-pulse   border-red-500" : "border-slate-400"} ${
            children ? "rounded-r-md" : "rounded-md"
          }`}
          value={initialvalue}
          onChange={handleChange}
          allowLeadingZeros
          {...(separator && { thousandSeparator: "," })}
          min={props.min}
          max={props.max}
        />
        <div className="flex">{children}</div>
      </div>
      {error && <p className="animate-shake text-right text-red-600">{error}</p>}
    </div>
  );
};

NumberInput.displayName = "TextBox";
