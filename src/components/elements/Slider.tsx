import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import React, { useRef } from 'react';

interface IProps {
  children: React.ReactNode;
  className?: string;
}
export const Slider = ({ children, className }: IProps) => {
  const ref = useRef<HTMLDivElement>(null);
  function scrollTo(offset: number) {
    ref.current!.scroll({
      left: ref.current!.scrollLeft + offset,
      behavior: 'smooth',
    });
  }
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <button
        onClick={() => scrollTo(350)}
        className={
          'absolute top-1/2 right-2 z-10 h-9 w-9 -translate-y-1/2 rounded-full border-none bg-white/50 shadow  shadow-white/50 transition hover:bg-white hover:text-cyan-500 hover:shadow-md hover:shadow-white/50 '
        }
      >
        <ChevronRightIcon className="absolute top-1/2 left-1/2 w-4 -translate-x-1/2 -translate-y-1/2 transition hover:text-sky-500" />
      </button>
      <div ref={ref} className={' flex overflow-x-hidden  '}>
        {children}
      </div>
      <button
        onClick={() => scrollTo(-350)}
        className={
          'absolute left-2 z-10 h-9 w-9 rounded-full border-none bg-white/50  shadow-white/50 transition duration-300 hover:bg-white hover:text-cyan-500 hover:shadow-md  hover:shadow-white/50 '
        }
      >
        <ChevronLeftIcon className="absolute  top-1/2 left-1/2 w-4 -translate-x-1/2 -translate-y-1/2 transition" />
      </button>
    </div>
  );
};
