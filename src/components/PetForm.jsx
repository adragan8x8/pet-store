import React from "react";
import { Field, Form, FormSpy } from "react-final-form";
import { FormFieldDiv } from "../styled/FormFieldDiv.styled";
import { PrimaryButton } from "../styled/PrimaryButton.styled";
import FormInput from "./FormInput";
import { SecondaryButton } from "../styled/SecondaryButton.styled";
import { useNavigate } from "react-router-dom";

export default function PetForm({
  initialValues,
  onSubmit,
  type,
  setFormChanged,
}) {
  const navigate = useNavigate();
  if (!initialValues) return <p>Loading...</p>;
  return (
    <Form
      onSubmit={onSubmit}
      initialValues={{
        name: initialValues.name ? initialValues.name : "",
        status: initialValues.status ? initialValues.status : "",
      }}
      validate={(values) => {
        const errors = {};
        if (!values.name) errors.name = "Required!";
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

          <FormFieldDiv>
            <label>status</label>
            <Field name="status" component="select">
              <option value="available">available</option>
              <option value="pending">pending</option>
              <option value="sold">sold</option>
            </Field>
          </FormFieldDiv>

          <FormSpy
            onChange={(props) => {
              setFormChanged(
                !(
                  (!props.submitSucceeded &&
                    !props.submitFailed &&
                    props.pristine) ||
                  (props.submitSucceeded && !props.modifiedSinceLastSubmit)
                )
              );
            }}
          />

          <PrimaryButton
            disabled={
              submitting ||
              (!submitSucceeded && !submitFailed && pristine) ||
              (submitSucceeded && !modifiedSinceLastSubmit)
            }
            type="submit"
          >
            {type}
          </PrimaryButton>
          <SecondaryButton
            type="button"
            onClick={() => {
              navigate(-1);
            }}
          >
            cancel
          </SecondaryButton>
          {submitError && <div style={{ color: "darkred" }}>{submitError}</div>}
          {submitSucceeded && (
            <div style={{ color: "green" }}>Operation successful!</div>
          )}
        </form>
      )}
    />
  );
}
