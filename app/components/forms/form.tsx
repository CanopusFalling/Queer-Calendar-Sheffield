"use client";

import React from "react";
import { InputProps } from "tw-elements-react/dist/types/forms/Input/types";
import { TEInput, TERipple, TETextarea } from "tw-elements-react";
import DateTimePicker from "./datetimePicker";

interface FormProps {
  inputFields: { props: React.FC<InputProps>; description?: string }[];
  submitAction: (formData: FormData) => void;
}

const Form: React.FC<FormProps> = ({ inputFields, submitAction }) => {
  return (
    <form
      action={submitAction}
      className="flex flex-col gap-2 rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700"
    >
      {inputFields.map((field, key) => (
        <div key={key}>
          {(field.props as InputProps).type === "datetime-local" ? (
            <DateTimePicker {...(field.props as InputProps)} />
          ) : (field.props as InputProps).type === "textarea" ? (
            <TETextarea {...(field.props as any)} />
          ) : (
            <TEInput {...(field.props as InputProps)} />
          )}

          {field.description && (
            <div className="italic text-sm px-2">{field.description}</div>
          )}
        </div>
      ))}

      <TERipple rippleColor="light">
        <button
          type="submit"
          className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
        >
          Submit
        </button>
      </TERipple>
    </form>
  );
};

export default Form;
