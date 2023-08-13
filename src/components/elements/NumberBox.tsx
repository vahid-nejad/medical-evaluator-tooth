import React, { useState } from 'react';
interface IProps {
  labelText?: string;
  error?: string;
  children?: React.ReactNode;
  onChange?: (num: number) => void;
  initialvalue?: number;
  className?: string;
  type?: string;
  min?: number;
  max?: number;
}

const addCommas = (num: string) =>
  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

const removeNonNumeric = (num: string) => num.toString().replace(/[^0-9]/g, '');

export const NumberInput = React.forwardRef<HTMLInputElement, IProps>(
  (
    {
      className,
      children,
      labelText: lableText,
      error,
      initialvalue,
      onChange,
      ...props
    },
    ref,
  ) => {
    const [value, setValue] = useState<string>(initialvalue?.toString() || '0');
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(addCommas(removeNonNumeric(e.target.value)));
      onChange && onChange(parseInt(removeNonNumeric(e.target.value)));
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
          <input
            id="txt"
            className={`block  w-full border bg-slate-50 py-2 px-1 text-xs outline-none transition-all focus:shadow focus:shadow-blue-500  disabled:border-slate-100 lg:text-sm xl:text-base 
              ${
                error ? ' animate-shake   border-red-500' : 'border-slate-400'
              } ${children ? 'rounded-r-md' : 'rounded-md'}`}
            ref={ref}
            value={value}
            onChange={handleChange}
            {...props}
          ></input>

          <div className="flex">{children}</div>
        </div>
        {error && (
          <p className="animate-shake text-right text-red-600">{error}</p>
        )}
      </div>
    );
  },
);

NumberInput.displayName = 'TextBox';
