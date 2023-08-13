import React, { useState } from "react";

interface IProps {
  options: React.ReactElement[];
  onChange?: (selectedIndex: number) => void;
  value?: number;
  labelText?: string;
}
export const RadioGroup = ({ options, onChange, value, labelText }: IProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>(value);
  function onSelect(index: number) {
    setSelectedIndex(index);
    onChange && onChange(index);
  }
  return (
    <div>
      {labelText && (
        <label className="block text-gray-600 text-right mb-2 text-xs lg:text-sm xl:text-base">
          {labelText}
        </label>
      )}
      <div className="flex justify-evenly">
        {options.map((el, index) => (
          <Option
            key={index}
            index={index}
            selectedIndex={selectedIndex}
            onSelect={(index) => onSelect(index)}
          >
            {el}
          </Option>
        ))}
      </div>
    </div>
  );
};

interface OptionProps {
  index: number;
  selectedIndex?: number;

  onSelect: (index: number) => void;

  children: React.ReactNode;
}
const Option = (props: OptionProps) => {
  const isSelected = props.index === props.selectedIndex;
  return (
    <div
      className={`flex items-center gap-2 shadow cursor-pointer transition-colors bg-slate-50 mx-1 rounded-md p-2 py-3  flex-1 text-xs font-bold text-slate-600 lg:font-normal lg:text-sm ${
        isSelected && "bg-cyan-50"
      }`}
      onClick={() => props.onSelect(props.index)}
    >
      <div
        className={`rounded-full w-4 h-4 border transition ${
          isSelected && "border-4 border-sky-500 bg-sky-300"
        } `}
      ></div>
      {props.children}
    </div>
  );
};
