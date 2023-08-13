import { CheckIcon } from '@heroicons/react/24/solid';
import React, { useState } from 'react';

interface IProps {
  boxClassName?: string;
  checkClassName?: string;
  onChange?: (value: boolean) => void;
  value?: boolean;
  children?: React.ReactNode;
}
export const CheckBox = (props: IProps) => {
  const [checked, setChecked] = useState<boolean>(props.value || false);
  const handleClick = () => {
    const value = checked;
    setChecked((prev) => !prev);
    props.onChange && props.onChange(!value);
  };
  return (
    <div
      className="flex cursor-pointer items-center gap-1"
      onClick={handleClick}
    >
      <div
        className={`relative h-4 w-4 rounded border-2 border-slate-400 ${props.boxClassName}`}
      >
        {checked && (
          <CheckIcon
            className={`absolute top-1/2 left-1/2 w-4 -translate-x-1/2 -translate-y-1/2 text-green-500 ${props.checkClassName}`}
          />
        )}
      </div>
      {props.children && (
        <label className="cursor-pointer text-slate-600">
          {props.children}
        </label>
      )}
    </div>
  );
};
