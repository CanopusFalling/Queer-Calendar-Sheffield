"use client";

import React from "react";
import { TEInput, TERipple } from "tw-elements-react";

export interface InputField {
  name: string;
  label: string;
  type: "text" | "number" | "email" | "textarea" | "checkbox";
  required?: boolean;
  placeholder?: string;
}

interface FormProps {
  inputFields: InputField[];
  submitAction: (formData: FormData) => void;
}

const Form: React.FC<FormProps> = ({ inputFields, submitAction }) => {
  return (
    <form
      action={submitAction}
      className="flex flex-col space-y-2 rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700"
    >
      {inputFields.map((field, key) => (
        <TEInput {...field} key={key} />
      ))}

      <TERipple>
        <button
          type="submit"
          className="rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
        >
          Submit
        </button>
      </TERipple>
    </form>
  );
};

export default Form;
