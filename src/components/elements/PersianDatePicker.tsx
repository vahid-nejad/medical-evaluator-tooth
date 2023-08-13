"use client";
import React, { useRef } from "react";
import DatePicker, {
  CalendarProps,
  DateObject,
  DatePickerProps,
} from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
interface IProps {
  labelText?: string;
  error?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  onChange?: (date: Date) => void;
  value?: Date;
}
type Props = Omit<CalendarProps, "onChange"> & DatePickerProps & IProps;

export const PersianDatePicker = ({
  labelText,
  error,
  children,
  disabled,
  onChange,
  value,
  ...props
}: Props) => {
  const ref = useRef<any>();
  function handleChange(selectedDates: DateObject) {
    onChange && onChange(selectedDates.toDate());
  }

  return (
    <div
      onBlur={() => setTimeout(() => ref.current?.closeCalendar(), 300)}
      className="flex flex-col items-stretch"
    >
      {labelText && (
        <label
          className={`block text-slate-600 text-right mb-2 text-xs lg:text-sm xl:text-base ${
            disabled && "text-slate-300"
          }`}
          htmlFor="txt"
        >
          {labelText}
        </label>
      )}
      <DatePicker
        disabled={disabled}
        value={value}
        onChange={handleChange}
        calendar={persian}
        locale={persian_fa}
        format="YYYY/MM/DD"
        calendarPosition="bottom-right"
        inputClass={`border  disabled:border-slate-100 w-full block outline-none py-2 px-1 transition-all text-xs lg:text-sm xl:text-base  bg-slate-50 focus:shadow focus:shadow-blue-500 
        ${error ? " border-red-500   animate-shake" : "border-slate-400"} ${
          children ? "rounded-r-md" : "rounded-md"
        }`}
        {...props}
        ref={ref}
      />
      {error && (
        <p className="text-red-600 text-right animate-shake">{error}</p>
      )}
    </div>
  );
};
