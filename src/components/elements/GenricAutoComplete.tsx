import { Fragment, useEffect, useMemo, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/24/solid';

import React from 'react';

interface IProps<T> {
  lableText?: string;
  options?: T[];
  onChange?: (selectedOption: T) => void;
  error?: string;
  className?: string;
  value?: T;
  children?: React.ReactNode;
  displayName: string;
  searchable?: boolean;
  disabled?: boolean;
}

export const GenericAutoComplete = React.forwardRef(
  <T extends { [key: string]: any }>(
    {
      lableText,
      options,
      onChange,
      children,
      value,
      error,
      className,
      displayName,
      searchable = true,
      disabled = false,
    }: IProps<T>,
    ref: any,
  ) => {
    const [selected, setSelected] = useState<T>();
    const [query, setQuery] = useState<string>('');
    useEffect(() => {
      setSelected(value);
    }, [value]);

    const filteredOptions = useMemo(() => {
      if (!options) return [];

      return query === ''
        ? options
        : options.filter((opt) =>
            opt[displayName]
              .toLowerCase()
              .replace(/\s+/g, '')
              .includes(query.toLowerCase().replace(/\s+/g, '')),
          );
    }, [query, options]);

    function select(option: T) {
      setSelected(option);
      setQuery('');
      onChange && onChange(option);
    }

    return (
      <div className={className}>
        {lableText && (
          <label
            className={`mb-2 block  text-right text-xs text-slate-600 lg:text-sm xl:text-base ${
              disabled && 'text-slate-300'
            }`}
            htmlFor="txt"
          >
            {lableText}
          </label>
        )}
        <div className="flex">
          <Combobox value={selected} onChange={select} disabled={disabled}>
            <div className="relative w-full ">
              <Combobox.Input
                readOnly={!searchable}
                ref={ref}
                className={`border ${
                  disabled && 'border-slate-300'
                } block w-full bg-slate-50 py-2 px-1 text-xs outline-none transition-all focus:shadow focus:shadow-blue-500 lg:text-sm xl:text-base ${
                  error && 'animate-shake border-red-500'
                } ${children ? 'rounded-r-md ' : 'rounded-md '}`}
                displayValue={(opt2: T) => (opt2 ? opt2[displayName] : '')}
                autoComplete="off"
                onChange={(event) => setQuery(event.target.value)}
              />
              {!disabled && (
                <Combobox.Button className="absolute inset-y-0 left-0 ml-1 flex items-center pr-2">
                  <ChevronDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </Combobox.Button>
              )}

              <Transition
                as={Fragment}
                enter="transition ease-in duration-100 origin-top"
                enterFrom="opacity-0 scale-y-75"
                enterTo="opacity-100 scale-y-100 z-50"
                leave="transition ease-in duration-100 origin-top"
                leaveFrom="opacity-100 scale-y-100"
                leaveTo="opacity-0 scale-y-75 "
                afterLeave={() => setQuery('')}
              >
                <Combobox.Options className="absolute z-50 mt-1 max-h-60  w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {filteredOptions.length === 0 && query !== '' ? (
                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                      چیزی پیدا نشد
                    </div>
                  ) : filteredOptions ? (
                    filteredOptions.map((opt, index) => (
                      <Combobox.Option
                        key={index}
                        className={({ active }) =>
                          `relative cursor-default select-none rounded py-2 pl-10 pr-4 hover:cursor-pointer ${
                            active ? 'bg-teal-600 text-white' : 'text-gray-900'
                          }`
                        }
                        value={opt}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? 'font-medium' : 'font-normal'
                              }`}
                            >
                              {opt[displayName]}
                            </span>
                            {selected ? (
                              <span
                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                  active ? 'text-white' : 'text-teal-600'
                                }`}
                              >
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Combobox.Option>
                    ))
                  ) : null}
                </Combobox.Options>
              </Transition>
            </div>
            <div className="flex">{children}</div>
          </Combobox>
        </div>
        {error && <p className="text-right text-red-600">{error}</p>}
      </div>
    );
  },
);

GenericAutoComplete.displayName = 'GenericAutoComplete';
