import React from "react";
interface IProps {
  onChange: (pageCount: number) => void;
  defualtPageCount?: number;
  className?: string;
}
export const ItemPerPage = ({
  defualtPageCount = 12,
  onChange,
  className,
}: IProps) => {
  const [pageCount, setPageCount] = React.useState<number>(defualtPageCount);
  return (
    <div className={"flex"}>
      <div className={`flex gap-2 items-center justify-center ${className}`}>
        <span className="text-sm text-slate-500">تعداد نمایش در صفحه:</span>
        {[12, 24, 36, 48].map((item) => (
          <div
            onClick={() => {
              setPageCount(item);
              onChange(item);
            }}
            key={item}
            className={`text-sm rounded cursor-pointer transition w-8 h-8 md:w-6 md:h-6 flex items-center justify-center ${
              item === pageCount
                ? "bg-cyan-500 text-white"
                : "bg-white text-slate-600"
            }`}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};
