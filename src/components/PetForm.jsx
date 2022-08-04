import React from "react";
import { Field, Form } from "react-final-form";
import { FormFieldDiv } from "../styled/FormFieldDiv.styled";
import { SubmitButton } from "../styled/SubmitButton.styled";
import FormInput from "./FormInput";

export default function PetForm({ initialValues, onSubmit, type }) {
  if (!initialValues) return <p>Loading...</p>;
  return (
    <Form
      onSubmit={onSubmit}
      initialValues={{
        name: initialValues.name ? initialValues.name : "",
        category:
          initialValues.category && initialValues.category.name
            ? initialValues.category.name
            : "",
        status: initialValues.status ? initialValues.status : "",
      }}
      validate={(values) => {
        const errors = {};
        if (!values.name) errors.name = "Required!";
        if (!values.category) errors.category = "Required!";
        return errors;
      }}
      render={({
        submitError,
        handleSubmit,
        submitting,
        pristine,
        modifiedSinceLastSubmit,
        submitSucceeded,
        submitFailed,
      }) => (
        <form
          style={{
            maxWidth: "400px",
            margin: "auto",
            alignItems: "center",
            textAlign: "center",
            justifyContent: "center",
          }}
          onSubmit={handleSubmit}
        >
          <Field name="name">
            {({ input, meta }) => (
              <FormInput
                input={input}
                meta={meta}
                field="name"
                placeholder="Rex"
              />
            )}
          </Field>

          <Field name="category">
            {({ input, meta }) => (
              <FormInput
                input={input}
                meta={meta}
                field="category"
                placeholder="dog"
              />
            )}
          </Field>

          <FormFieldDiv>
            <label>status</label>
            <Field name="status" component="select">
              <option value="available">available</option>
              <option value="pending">pending</option>
              <option value="sold">sold</option>
            </Field>
          </FormFieldDiv>
          <SubmitButton
            disabled={
              submitting ||
              (!submitSucceeded && !submitFailed && pristine) ||
              (submitSucceeded && !modifiedSinceLastSubmit)
            }
            type="submit"
          >
            {type}
          </SubmitButton>
          {submitError && <div style={{ color: "darkred" }}>{submitError}</div>}
          {submitSucceeded && (
            <div style={{ color: "green" }}>Operation successful!</div>
          )}
        </form>
      )}
    />
  );
}
