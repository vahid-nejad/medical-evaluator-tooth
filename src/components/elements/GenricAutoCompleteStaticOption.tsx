import { Fragment, useEffect, useMemo, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/24/solid';

import React from 'react';

export interface GenericAutoCompleteStaticOption<T> {
  name: string;
  value: T;
}

interface Event<T> {
  target: {
    value: T;
  };
}

interface IProps<T> {
  lableText?: string;
  options: GenericAutoCompleteStaticOption<T>[];
  onChange?: (selectedOptionValue: Event<T>) => void;
  error?: string;
  className?: string;
  value?: T;
  children?: React.ReactNode;
}

export const GenericAutoCompleteStatic = React.forwardRef(
  <T extends unknown>(
    {
      lableText,
      options,
      onChange,
      children,
      value,
      error,
      className,
    }: IProps<T>,
    ref: any,
  ) => {
    const [selectedValue, setSelectedValue] = useState<T>();
    const [query, setQuery] = useState<string>('');
    useEffect(() => {
      setSelectedValue(value);
    }, [value]);
    const filteredOptions = useMemo(
      () =>
        query === ''
          ? options
          : options.filter((opt) =>
              opt.name
                .toLowerCase()
                .replace(/\s+/g, '')
                .includes(query.toLowerCase().replace(/\s+/g, '')),
            ),
      [query, options],
    );

    function select(option: T) {
      console.log({ option });

      setSelectedValue(option);
      setQuery('');
      onChange && onChange({ target: { value: option } });
      onChange && console.log('changed');
    }

    return (
      <div className={className}>
        {lableText && (
          <label
            className="mb-2 block  text-right text-xs text-gray-600 lg:text-sm xl:text-base"
            htmlFor="txt"
          >
            {lableText}
          </label>
        )}
        <div className="flex">
          <Combobox value={selectedValue} onChange={select}>
            <div className="relative w-full ">
              <Combobox.Input
                ref={ref}
                className={`block w-full border bg-slate-50 py-2 px-1 text-xs outline-none transition-all focus:shadow focus:shadow-blue-500 lg:text-sm xl:text-base ${
                  error && 'border-red-500'
                } ${children ? 'rounded-r-md ' : 'rounded-md '}`}
                displayValue={(opt2: GenericAutoCompleteStaticOption<T>) =>
                  opt2 ? opt2.name : ''
                }
                autoComplete="on"
                onChange={(event) => setQuery(event.target.value)}
              />
              <Combobox.Button className="absolute inset-y-0 left-0 flex items-center pr-2">
                <ChevronDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </Combobox.Button>

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
                <Combobox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {filteredOptions.length === 0 && query !== '' ? (
                    <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                      چیزی پیدا نشد
                    </div>
                  ) : (
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
                              {opt.name}
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
                  )}
                </Combobox.Options>
              </Transition>
            </div>
            <div className="flex">{children}</div>
          </Combobox>
        </div>
        {error && <p className="text-red-600">{error}</p>}
      </div>
    );
  },
);

GenericAutoCompleteStatic.displayName = 'GenericAutoCompleteStatic';
