import clsx from 'clsx';
import React from 'react';

interface IProps {
  label: string;
  children: React.ReactNode;
  className?: string;
  isSelected?: boolean;
}
export const CardTableTd = (props: IProps) => {
  return (
    <>
      <p className="col-span-3 flex items-center justify-end border-b bg-gradient-to-l from-sky-400 to-sky-600 p-2 text-sm  font-bold text-white">
        {props.label}
      </p>
      <p
        className={clsx(
          {
            'bg-emerald-600 text-slate-50': props.isSelected,
            ' text-slate-600': !props.isSelected,
          },
          'items col-span-5 flex border-b p-2 pr-3 ',
          props.className,
        )}
      >
        {props.children}
      </p>
    </>
  );
};
