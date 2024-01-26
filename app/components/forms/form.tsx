"use client";

import React from "react";

import InputField, { InputFieldProps } from "./inputField";

interface FormProps {
  inputFields: InputFieldProps[];
  submitAction: (event: React.FormEvent<HTMLFormElement>) => void;
}

const Form: React.FC<FormProps> = ({ inputFields, submitAction }) => {
  return (
    <form onSubmit={submitAction}>
      {inputFields.map((field) => (
        <InputField {...field} />
      ))}
    </form>
  );
};

export default Form;
