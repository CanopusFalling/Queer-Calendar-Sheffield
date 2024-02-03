"use client";

import React from "react";
import { InputProps } from "tw-elements-react/dist/types/forms/Input/types";

const DateTimePicker: React.FC<InputProps> = ({
  label,
  labelRef,
  labelID,
  ref,
  readOnly,
  disabled,
  size,
  wrapperTag,
  theme,
  formWhite,
  counter,
  maxLength,
}) => {
  return (
    <div className="flex flex-row items-center justify-between">
      <label htmlFor={label as string} className="flex-shrink-0 m-2">
        {label}
      </label>
      <input
        type="datetime-local"
        name={label as string}
        className="min-h-[auto] w-full rounded border border-neutral-500 bg-transparent px-3 py-[0.32rem] leading-[1.6] dark:text-neutral-200 dark:placeholder:text-neutral-200"
      />
    </div>
  );
};

export default DateTimePicker;
