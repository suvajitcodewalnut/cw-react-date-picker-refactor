import clsx from "clsx";
import DatePicker from "react-datepicker";
import { DatePickerDay } from "../DatePickerDay/DatePickerDay";

const CALENDAR_CLASS_NAME = "!shadow-lg !flex !border-none";
const INPUT_CLASS_NAME = "focus:outline-none w-fit text-xs md:text-sm font-medium";
const DATE_FORMAT = "EEEE, dd MMM yyyy";
const POPPER_CLASS_NAME = "!py-6";

export interface DatePickerFieldProps {
  label?: string;
  labelPosition: "left" | "right";
  placeholder?: string;
  selectedDate: Date | undefined;
  comparisonDate: Date | undefined;
  onChange: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  monthsShown: number;
  calendarStartDay: number;
  markSundayAsRed?: boolean;
  dayLabel: string;
  ariaLabel: string;
}

export function DatePickerField({
  label,
  labelPosition,
  placeholder,
  selectedDate,
  comparisonDate,
  onChange,
  minDate,
  maxDate,
  monthsShown,
  calendarStartDay,
  markSundayAsRed,
  dayLabel,
  ariaLabel,
}: DatePickerFieldProps) {
  const labelPositionClass = labelPosition === "left" ? "left-3" : "right-3";

  const getDayClassName = (date: Date): string => {
    if (date.getDay() === 0 && markSundayAsRed) {
      return "!text-red-500";
    }
    return "";
  };

  const renderDayContents = (day: number, date: Date) => {
    const isSelectedDate =
      comparisonDate && date
        ? comparisonDate.getTime() === date.getTime()
        : false;

    return (
      <DatePickerDay
        dayLabel={dayLabel}
        day={day}
        date={date}
        isSelectedDate={isSelectedDate}
      />
    );
  };

  return (
    <>
      <span
        className={clsx(
          "text-sm font-semibold whitespace-nowrap absolute -top-3 px-1 bg-white text-black text-opacity-60",
          labelPositionClass
        )}
      >
        {label}
      </span>
      <div role="group" aria-label={ariaLabel}>
        <DatePicker
          dayClassName={getDayClassName}
          calendarClassName={CALENDAR_CLASS_NAME}
          className={INPUT_CLASS_NAME}
          placeholderText={placeholder}
          dateFormat={DATE_FORMAT}
          popperClassName={POPPER_CLASS_NAME}
          monthsShown={monthsShown}
          selected={selectedDate}
          selectsStart
          shouldCloseOnSelect
          startDate={selectedDate}
          onChange={(date: Date) => onChange(date)}
          calendarStartDay={calendarStartDay}
          minDate={minDate}
          maxDate={maxDate}
          renderDayContents={renderDayContents}
        />
      </div>
    </>
  );
}
