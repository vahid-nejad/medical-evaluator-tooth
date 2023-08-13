import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { Card, CardTableTd } from '.';
export interface DataTableHeader<T> {
  text: string;
  sortable?: boolean;
  value: keyof T;
}

export type DataTableData<T> = { [P in keyof T]?: any };

interface IProps<T> {
  headers: DataTableHeader<T>[];
  items: DataTableData<T>[];
  routeProp?: keyof T;
  className?: string;
  onChange?: (item: DataTableData<T>) => void;
  // onSort?: (header: DataTableHeader<T>, sortType?: "ASC" | "DES") => void;
}
const textAlignClass = {
  start: 'text-start',
  center: 'text-center',
  end: 'text-end',
};
export const DataTable = <T extends unknown>(props: IProps<T>) => {
  const [selectedItem, setSelectedItem] = useState<DataTableData<T>>();
  const items = props.items;

  const router = useRouter();

  return (
    <>
      <div className={`hidden md:block ${props.className}`}>
        <table className="w-full table-auto border-separate border-spacing-0 overflow-hidden rounded-md border">
          <thead className="hidden md:table-header-group	">
            <tr className="overflow-hidden bg-gradient-to-b from-sky-400 to-sky-600 text-white  ">
              {props.headers.map((header) => (
                <th
                  className={`p-2 text-center ${
                    header.sortable && 'cursor-pointer'
                  }`}
                  key={String(header.value)}
                  {...(header.sortable
                    ? {
                        onClick: () => {
                          items.sort(
                            (a, b) => b[header.value] - a[header.value],
                          );
                        },
                      }
                    : {})}
                >
                  {header.text}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                key={(item as any).id}
                className={` ${
                  (props.routeProp || props.onChange) && 'cursor-pointer'
                }  transition
                ${
                  selectedItem === item
                    ? 'bg-emerald-600 text-slate-50'
                    : 'text-slate-600  odd:bg-slate-50 hover:bg-sky-50'
                }
                ${props.routeProp && 'cursor-pointer'}`}
                {...(props.routeProp && item[props.routeProp]
                  ? { onClick: () => router.push(item[props.routeProp!]) }
                  : props.onChange
                  ? {
                      onClick: () => {
                        setSelectedItem(item);
                        props.onChange && props.onChange(item);
                      },
                    }
                  : {})}
              >
                {props.headers.map((header) => (
                  <td
                    className="p-2 text-center text-sm"
                    key={String(header.value) + (item as any).id}
                  >
                    {item[header.value]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={`md:hidden ${props.className}`}>
        {items.map((item) => (
          <Card
            key={(item as any).id}
            className={clsx(
              {
                'border-4 border-violet-600 shadow-violet-300 ':
                  selectedItem === item,
                'cursor-pointer': props.routeProp || props.onChange,
              },
              'm-2 grid  grid-cols-8 overflow-hidden transition  hover:bg-sky-50',
            )}
            {...(props.routeProp && item[props.routeProp]
              ? { onClick: () => router.push(item[props.routeProp!]) }
              : props.onChange
              ? {
                  onClick: () => {
                    setSelectedItem(item);
                    props.onChange && props.onChange(item);
                  },
                }
              : {})}
          >
            {props.headers.map((header) => (
              <CardTableTd
                isSelected={selectedItem === item}
                key={(item as any).id + String(header.value)}
                label={header.text}
              >
                {item[header.value]}
              </CardTableTd>
            ))}
          </Card>
        ))}
      </div>
    </>
  );
};
