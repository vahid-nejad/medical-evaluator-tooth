import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import React from 'react';

interface IProps {
  totalPages: number;
  onChange: (page: number) => void;
  className?: string;
  pageNumber: number;
}
export const Pagination = (props: IProps) => {
  // const [props.pageNumber, setprops.pageNumber] = React.useState<number>(1);

  if (props.pageNumber > props.totalPages) onChange(props.totalPages);

  const upperLimit =
    props.totalPages > 7
      ? props.pageNumber - 3 < 1
        ? Math.min(7, props.totalPages)
        : Math.min(props.pageNumber + 3, props.totalPages)
      : props.totalPages;

  const lowerLimit =
    props.totalPages > 7
      ? props.pageNumber + 3 > props.totalPages
        ? props.pageNumber - 7 + props.totalPages - props.pageNumber + 1
        : Math.max(props.pageNumber - 3, 1)
      : 1;

  function onChange(page: number) {
    // setprops.pageNumber(page);
    props.onChange(page);
  }

  function createButtons() {
    const buttons = [];
    if (lowerLimit !== 1) {
      buttons.push(
        <button
          className={`h-8 w-8 rounded text-center text-sm shadow transition  hover:shadow-md  md:h-6 md:w-6 ${
            props.pageNumber === 1
              ? 'bg-cyan-500 text-white'
              : 'bg-white hover:text-cyan-500'
          }`}
          key={1}
          disabled={1 === props.pageNumber}
          onClick={() => {
            onChange(1);
          }}
        >
          {1}
        </button>,
      );
      buttons.push(<span>...</span>);
    }
    for (let i = lowerLimit; i <= upperLimit; i++) {
      buttons.push(
        <button
          className={`h-8 w-8 rounded text-center text-sm shadow transition  hover:shadow-md  md:h-6 md:w-6 ${
            props.pageNumber === i
              ? 'bg-cyan-500 text-white'
              : 'bg-white hover:text-cyan-500'
          }`}
          key={i}
          disabled={i === props.pageNumber}
          onClick={() => {
            onChange(i);
          }}
        >
          {i}
        </button>,
      );
    }
    if (upperLimit !== props.totalPages) {
      buttons.push(<span>...</span>);
      buttons.push(
        <button
          className={`h-8 w-8 rounded text-center text-sm shadow transition  hover:shadow-md  md:h-6 md:w-6 ${
            props.pageNumber === props.totalPages
              ? 'bg-cyan-500 text-white'
              : 'bg-white hover:text-cyan-500'
          }`}
          key={props.totalPages}
          disabled={props.totalPages === props.pageNumber}
          onClick={() => {
            onChange(props.totalPages);
          }}
        >
          {props.totalPages}
        </button>,
      );
    }
    return buttons;
  }

  // /////////////////////////////////////////////////////////MAIN RENDER///////////////////////////////////////////////////////////////

  return (
    <div
      dir="ltr"
      className={`flex items-center justify-center gap-2 ${props.className}`}
    >
      <button
        disabled={props.pageNumber === 1}
        className={`flex h-8 w-8 items-center justify-center rounded text-center text-slate-500 shadow transition hover:enabled:text-cyan-500 enabled:hover:shadow-md disabled:text-slate-300 md:h-6 md:w-6`}
        onClick={() => {
          // setprops.pageNumber(props.pageNumber - 1);
          props.onChange(props.pageNumber - 1);
        }}
      >
        <ChevronLeftIcon className="w-5  " />
      </button>
      {createButtons()}
      <button
        className={`flex h-8 w-8 items-center justify-center rounded text-center text-slate-500 shadow transition hover:enabled:text-cyan-500 enabled:hover:shadow-md disabled:text-slate-300 md:h-6 md:w-6`}
        disabled={props.pageNumber === props.totalPages}
        onClick={() => {
          // setprops.pageNumber(props.pageNumber + 1);
          props.onChange(props.pageNumber + 1);
        }}
      >
        <ChevronLeftIcon className="w-5 rotate-180 " />
      </button>
    </div>
  );
};
