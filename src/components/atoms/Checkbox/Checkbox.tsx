import { InputHTMLAttributes } from "react";
import clsx from "clsx";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
  id: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  hint?: string;
}

export function Checkbox({
  label,
  id,
  checked,
  onChange,
  disabled = false,
  hint,
  className,
  title,
  ...rest
}: CheckboxProps) {
  return (
    <div className="mb-4" title={title}>
      <input
        type="checkbox"
        id={id}
        className={clsx("mr-2", className, {
          "cursor-not-allowed": disabled,
        })}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        {...rest}
      />
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
        {hint && <span className="text-gray-400 text-xs"> {hint}</span>}
      </label>
    </div>
  );
}
