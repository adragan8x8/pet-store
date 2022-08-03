import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPet } from "../api/getPet";

import { Form, Field } from "react-final-form";
import { SubmitButton } from "../styled/SubmitButton.styled";
import { FormFieldDiv } from "../styled/FormFieldDiv.styled";

export default function Pet({ type }) {
  const [initialData, setInitialData] = useState({});
  const [feedback, setFeedback] = useState("");

  let params = useParams();
  const petID = params.petID;

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPet(petID);
      setInitialData(data);
    };
    if (type === "update") fetchData();
    else {
      const data = {
        id: 0,
        category: {
          id: 0,
          name: "",
        },
        name: "",
        photoUrls: ["string"],
        tags: [
          {
            id: 0,
            name: "string",
          },
        ],
        status: "available",
      };
      setInitialData(data);
    }
  }, [petID, type]);

  function onSubmit(values) {
    const newData = {
      ...initialData,
      name: values.name,
      status: values.status,
      category: {
        ...initialData.category,
        name: values.category,
      },
    };
    fetch("https://petstore.swagger.io/v2/pet", {
      method: type === "update" ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    }).then((res) => {
      if (res.ok) {
        setFeedback("success");
      } else {
        setFeedback("failure");
      }
    });
  }

  const MyForm = () => (
    <Form
      onSubmit={onSubmit}
      initialValues={{
        name: initialData.name ? initialData.name : "",
        category:
          initialData.category && initialData.category.name
            ? initialData.category.name
            : "",
        status: initialData.status ? initialData.status : "",
      }}
      validate={(values) => {
        const errors = {};
        if (!values.name) errors.name = "Required!";
        if (!values.category) errors.category = "Required!";
        return errors;
      }}
      render={({
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
          {feedback === "success" && (
            <p style={{ color: "green" }}>Operation successful!</p>
          )}
          {feedback === "failure" && (
            <p style={{ color: "darkred" }}>
              Oops! There was an error! Try again!
            </p>
          )}

          <Field name="name">
            {({ input, meta }) => (
              <FormFieldDiv>
                <label>name</label>
                <input {...input} type="text" placeholder="Rex" />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </FormFieldDiv>
            )}
          </Field>

          <Field name="category">
            {({ input, meta }) => (
              <FormFieldDiv>
                <label>category</label>
                <input {...input} type="text" placeholder="dog" />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </FormFieldDiv>
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
        </form>
      )}
    />
  );

  return initialData ? <>{MyForm()}</> : <p>Loading...</p>;
}
