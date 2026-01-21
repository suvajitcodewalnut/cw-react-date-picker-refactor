import { useMemo, useState } from "react";
import clsx from "clsx";
import "react-datepicker/dist/react-datepicker.css";
import { useMobileScreen } from "@/customHooks/useMobileScreen";
import { DatePickerField } from "./DatePickerField/DatePickerField";

export interface CodewalnutCustomDatePickerProps {
  isEndDate?: boolean;
  additionalDatePickerClasses?: string;
  calendarStartFromMondayDay?: boolean;
  startDatePlaceHolder?: string;
  endDatePlaceHolder?: string;
  startDateLabel?: string;
  endDateLabel?: string;
  endDateLimit?: Date;
  markSundayAsRed?: boolean;
  maxStartDate?: Date;
  maxEndDate?: Date;
}

const BASE_CONTAINER_CLASSES =
  "h-12 pl-2 md:pl-4 w-fit pr-1 md:pr-3 flex justify-between relative group items-center border rounded-md rounded-tr-none hover:border-gray-600 border-gray-200 !border-primary border-2 hover:border-primary hover:border-2";

export function CodewalnutCustomDatePicker({
  isEndDate = false,
  additionalDatePickerClasses = "",
  calendarStartFromMondayDay = false,
  startDatePlaceHolder = "Start Date",
  startDateLabel = "Start Date",
  endDateLabel = "End Date",
  endDatePlaceHolder = "End Date",
  endDateLimit,
  markSundayAsRed = false,
  maxStartDate,
  maxEndDate,
}: CodewalnutCustomDatePickerProps) {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>();
  const isMobile = useMobileScreen();

  const datePickerDynamicClasses = useMemo(
    () =>
      clsx(BASE_CONTAINER_CLASSES, {
        [additionalDatePickerClasses]: additionalDatePickerClasses,
      }),
    [additionalDatePickerClasses]
  );


  const handleChangeStartDate = (date: Date) => {
    setStartDate(date);

    if (endDate && date.getTime() > endDate.getTime()) {
      setEndDate(date);
    }
  };

  const handleChangeEndDate = (date: Date) => setEndDate(date);

  const calendarStartDay = calendarStartFromMondayDay ? 1 : 0;
  const startDateMonthsShown = isEndDate && !isMobile ? 2 : 1;
  const endDateMonthsShown = isMobile ? 1 : 2;

  return (
    <div className={datePickerDynamicClasses}>
      <DatePickerField
        label={startDateLabel}
        labelPosition="left"
        placeholder={startDatePlaceHolder}
        selectedDate={startDate}
        comparisonDate={startDate}
        onChange={handleChangeStartDate}
        minDate={maxStartDate ?? new Date()}
        maxDate={maxEndDate ?? endDateLimit}
        monthsShown={startDateMonthsShown}
        calendarStartDay={calendarStartDay}
        markSundayAsRed={markSundayAsRed}
        dayLabel="start label"
        ariaLabel="Select departure date"
      />

      {isEndDate && (
        <>
          <span className="w-1 border-2 border-red-500 mr-3 md:mr-5 ml-1 md:ml-3" />
          <DatePickerField
            label={endDateLabel}
            labelPosition="right"
            placeholder={endDatePlaceHolder}
            selectedDate={endDate}
            comparisonDate={endDate}
            onChange={handleChangeEndDate}
            minDate={startDate}
            maxDate={endDateLimit}
            monthsShown={endDateMonthsShown}
            calendarStartDay={calendarStartDay}
            markSundayAsRed={markSundayAsRed}
            dayLabel="end label"
            ariaLabel="Select return date"
          />
        </>
      )}
    </div>
  );
}
