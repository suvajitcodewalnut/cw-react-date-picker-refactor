import { ChangeEvent, useMemo, useState } from "react";
import { TextField } from "@/components/atoms/TextField/TextField";
import { Checkbox } from "@/components/atoms/Checkbox/Checkbox";
import { CodewalnutCustomDatePicker } from "@/components/atoms/CodewalnutCustomDatePicker/CodewalnutCustomDatePicker";

const DEFAULT_START_DATE_LABEL:string = "Start Date";
const DEFAULT_END_DATE_LABEL:string = "End Date";
const DOB_LABEL:string = "Date of birth";
const DOB_MAX_YEARS_AGO:number = 100;

const INPUT_CLASS_NAME =
  "border rounded-md px-3 py-2 focus:outline-none focus:ring focus:border-blue-300";

interface TextFieldConfig {
    label: string;
    value: string;
    setter: (value: string) => void;
    id: string;
    name: string;
}


export function DemoComponent() {
  const [startDateLabel, setStartDateLabel] = useState<string>(DEFAULT_START_DATE_LABEL);
  const [endDateLabel, setEndDateLabel] = useState<string>(DEFAULT_END_DATE_LABEL);
  const [startDatePlaceholder, setStartDatePlaceholder] = useState<string>(DEFAULT_START_DATE_LABEL);
  const [endDatePlaceholder, setEndDatePlaceholder] = useState<string>(DEFAULT_END_DATE_LABEL);
  const [isEndDate, setIsEndDate] = useState<boolean>(false);
  const [calendarStartFromMondayDay, setCalendarStartFromMondayDay] = useState<boolean>(false);
  const [endDateLimit, setEndDateLimit] = useState<string>("");
  const [isDob, setIsDob] = useState<boolean>(false);


  const textFieldConfigs: TextFieldConfig[] = [
    {
      label: "Start Date Label",
      value: startDateLabel,
      setter: setStartDateLabel,
      id: "startDateLabel",
      name: "startDateLabel",
    },
    {
      label: "End Date Label",
      value: endDateLabel,
      setter: setEndDateLabel,
      id: "endDateLabel",
      name: "endDateLabel",
    },
    {
      label: "Start Date Placeholder",
      value: startDatePlaceholder,
      setter: setStartDatePlaceholder,
      id: "startDatePlaceholder",
      name: "startDatePlaceholder",
    },
    {
      label: "End Date Placeholder",
      value: endDatePlaceholder,
      setter: setEndDatePlaceholder,
      id: "endDatePlaceholder",
      name: "endDatePlaceholder",
    },
  ];

  // Memoize the max start date calculation (100 years ago)
  const maxStartDateForDob = useMemo(() => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - DOB_MAX_YEARS_AGO);
    return date;
  }, []);

  const handleDobChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {checked} = event.target;
    setIsDob(checked);
    if (checked) {
      setStartDateLabel(DOB_LABEL);
      setIsEndDate(false);
    } else {
      setStartDateLabel(DEFAULT_START_DATE_LABEL);
    }
  };


  return (
    <div className="flex flex-col-reverse lg:flex-row justify-around gap-2 lg:space-x-3 md:px-4">
      <div className="lg:mt-0 p-4 border border-gray-200 rounded-md shadow-md">
        <h2 className="text-lg font-semibold mb-4 text-center">
          Custom Date Picker Demo
        </h2>

        {textFieldConfigs.map((config) => (
          <div key={config.id} className="mb-4">
            <TextField
              label={config.label}
              value={config.value}
              type="text"
              id={config.id}
              className={INPUT_CLASS_NAME}
              onChange={(event) => config.setter(event.target.value)}
              name={config.name}
            />
          </div>
        ))}

        <Checkbox
          id="isEndDate"
          label="Enable End Date"
          checked={isEndDate}
          onChange={(event) => setIsEndDate(event.target.checked)}
          disabled={isDob}
          hint={isDob ? "(DOB should be disabled)" : undefined}
          title={
            isDob
              ? "Please uncheck DOB for End Date feature"
              : "Enable End Date"
          }
        />

        <Checkbox
          id="isDob"
          label="Enable Date of Birth"
          checked={isDob}
          onChange={handleDobChange}
          title="Enable Date of birth"
        />

        <Checkbox
          id="calendarStartFromMondayDay"
          label="Calendar Starts From Monday"
          checked={calendarStartFromMondayDay}
          onChange={(event) => setCalendarStartFromMondayDay(event.target.checked)}
          title="Enable Start week as Monday"
        />

        <div className="mb-4">
          <label
            htmlFor="endDateLimit"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            End Date Limit:
          </label>
          <input
            title="Provide End Date limit"
            type="date"
            id="endDateLimit"
            className={INPUT_CLASS_NAME}
            value={endDateLimit}
            onChange={(event) => setEndDateLimit(event.target.value)}
          />
        </div>
      </div>

      <div className="lg:mx-auto mt-0 p-2 md:p-4 border border-gray-200 rounded-md shadow-md flex flex-col items-center">
        <h2 className="md:w-[500px] text-lg font-semibold mb-4 text-center">
          Preview
        </h2>
        <CodewalnutCustomDatePicker
          startDateLabel={startDateLabel}
          endDateLabel={endDateLabel}
          startDatePlaceHolder={startDatePlaceholder}
          endDatePlaceHolder={endDatePlaceholder}
          isEndDate={isEndDate}
          calendarStartFromMondayDay={calendarStartFromMondayDay}
          endDateLimit={endDateLimit ? new Date(endDateLimit) : undefined}
          maxStartDate={isDob ? maxStartDateForDob : undefined}
          maxEndDate={isDob ? new Date() : undefined}
        />
      </div>
    </div>
  );
}
