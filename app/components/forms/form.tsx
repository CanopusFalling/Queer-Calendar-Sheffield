"use client";

import React from "react";
import { InputProps } from "tw-elements-react/dist/types/forms/Input/types";
import { TEInput, TERipple, TETextarea } from "tw-elements-react";
import DateTimePicker from "./datetimePicker";
import Checkbox from "./checkbox";
// @ts-expect-error
import { useFormState } from "react-dom";

interface FormProps {
  inputFields: { props: { [key: string]: any }; description?: string }[];
  submitAction: (currentState: React.FormEvent, formData: FormData) => void;
}

const initialState = {
  message: "",
  success: null,
};

const Form: React.FC<FormProps> = ({ inputFields, submitAction }) => {
  const [state, formAction] = useFormState(submitAction, initialState);

  return (
    <form
      action={formAction}
      className="flex flex-col gap-2 rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-900"
    >
      {inputFields.map((field, key) => (
        <div key={key}>
          {(field.props as InputProps).type === "datetime-local" ? (
            <DateTimePicker {...(field.props as InputProps)} />
          ) : (field.props as InputProps).type === "textarea" ? (
            <TETextarea {...(field.props as any)} />
          ) : (field.props as InputProps).type === "checkbox" ? (
            <Checkbox {...(field.props as any)} />
          ) : (
            <TEInput {...(field.props as InputProps)} />
          )}

          {(field.props as InputProps).required && (
            <span className="font-bold not-italic text-warning text-sm mx-2">
              Required{" "}
            </span>
          )}

          {field.description && (
            <div className="italic text-sm mx-2 mb-2">{field.description}</div>
          )}
        </div>
      ))}

      <TERipple rippleColor="light">
        <button
          type="submit"
          className="inline-block rounded bg-primary px-6 pb-2 pt-2 text-l w-full font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
        >
          Submit
        </button>
      </TERipple>

      {state.success !== null && (
        <div
          className={"rounded-lg p-4 text-base ".concat(
            state.success
              ? "text-success-100 bg-success-800"
              : "text-danger-100 bg-danger-800",
          )}
          role="alert"
        >
          {state?.message}
        </div>
      )}
    </form>
  );
};

export default Form;
