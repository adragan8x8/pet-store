import React from "react";
import { FormFieldDiv } from "../styled/FormFieldDiv.styled";

export default function FormInput({ input, meta, field, placeholder }) {
  return (
    <FormFieldDiv>
      <label>{field}</label>
      <input {...input} type="text" placeholder={placeholder} />
      {(meta.error || meta.submitError) && meta.touched && (
        <span>{meta.error || meta.submitError}</span>
      )}
    </FormFieldDiv>
  );
}
