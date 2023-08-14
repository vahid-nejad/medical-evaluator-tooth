import { Combobox, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import React, { Fragment, useEffect, useState } from "react";
import { TextBox } from ".";

export interface AutoCompleteOption<T> {
  name: string;
  value: T;
}

interface IProps<T> {
  labelText?: string;
  error?: string;
  options: AutoCompleteOption<T>[];
  className?: string;
  value?: AutoCompleteOption<T>;

  onChange?: (selectedOptionValue: AutoCompleteOption<T>) => void;
  onSelect?: (selectedOptionValue: AutoCompleteOption<T>) => void;
}

export const Select = <T extends unknown>({
  className,
  options,
  labelText: lableText,
  error,
  value,
  onChange,
  onSelect,
}: IProps<T>) => {
  let [selectedOption, setSelectedOption] = useState<AutoCompleteOption<T>>();
  function select(option: AutoCompleteOption<T>) {
    setSelectedOption(option);
    onChange && onChange(option);
    onSelect && onSelect(option);
  }

  useEffect(() => {
    setSelectedOption(value);
  }, [value]);

  return (
    <div className={`${className} +  relative`}>
      {lableText && (
        <label className="mb-2 block  text-xs text-gray-600 lg:text-sm xl:text-base" htmlFor="txt">
          {lableText}
        </label>
      )}

      <div className="relative rounded">
        <Combobox value={selectedOption} onChange={select}>
          <TextBox
            className={`w-full rounded bg-slate-50 ${error && "border-red-500"}`}
            readOnly
            onChange={(event) => ""}
            value={selectedOption ? selectedOption.name : ""}
          />
          <Combobox.Button className="absolute  inset-y-0 left-1 flex items-center pr-2">
            <ChevronDownIcon className="h-5 w-5 text-gray-400 " aria-hidden="true" />
          </Combobox.Button>
          <Transition
            as={Fragment}
            enter="transition ease-in duration-100 origin-top"
            enterFrom="opacity-0 scale-y-75"
            enterTo="opacity-100 scale-y-100"
            leave="transition ease-in duration-100 origin-top"
            leaveFrom="opacity-100 scale-y-100"
            leaveTo="opacity-0 scale-y-75 "
          >
            <Combobox.Options
              className={
                "absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
              }
            >
              {options.map((opt) => (
                /* Use the `active` state to conditionally style the active option. */
                /* Use the `selected` state to conditionally style the selected option. */
                <Combobox.Option
                  key={typeof opt.value === "string" ? opt.value : (opt.value as any).id}
                  value={opt}
                  as={Fragment}
                >
                  {({ active, selected }) => (
                    <li
                      className={`
                       rounded-sm p-1 hover:cursor-pointer hover:bg-cyan-400
                    
                      ${selected && "bg-teal-600 text-white"}
                      `}
                    >
                      {opt.name}
                    </li>
                  )}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Transition>
        </Combobox>
      </div>

      {error && <p className="text-red-600">{error}</p>}
    </div>
  );
};

Select.displayName = "Select";
