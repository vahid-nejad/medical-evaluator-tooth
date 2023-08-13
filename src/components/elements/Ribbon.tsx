import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
}
export const Ribbon = ({ children }: IProps) => (
  <div
    className={
      " text-sm flex justify-center items-center font-bold absolute -left-8 top-3 h-6 w-32 -rotate-45 bg-pink-600 shadow-md shadow-pink-500/25 text-center text-white  z-10 group-hover:shadow-lg group-hover:shadow-pink-500/50 transition"
    }
  >
    <span className="drop-shadow shadow-white">{children}</span>
  </div>
);
