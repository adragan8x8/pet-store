import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPet } from "../api/getPet";

import { Form, Field } from "react-final-form";
import { SubmitButton } from "../styled/SubmitButton.styled";
import { FormFieldDiv } from "../styled/FormFieldDiv.styled";

export default function Pet() {
  let params = useParams();
  const petID = params.petID;

  const [data, setData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPet(petID);
      setData(data);
    };
    fetchData();
  }, [petID]);

  function onSubmit(formData) {
    const newName = formData.name ? formData.name : data.name;
    const newCategory = formData.category
      ? formData.category
      : data.category.name;
    const newStatus = formData.status ? formData.status : data.status;

    setData((data) => {
      const newData = { ...data };
      newData.name = newName;
      newData.category.name = newCategory;
      newData.status = newStatus;
      console.log(data, newData);
      return newData;
    });

    fetch("https://petstore.swagger.io/v2/pet", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((res) => {
      console.log(res);
    });
  }

  const MyForm = () => (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
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
          <FormFieldDiv>
            <label>name</label>
            <Field
              name="name"
              component="input"
              placeholder={data.name ? data.name : "..."}
            />
          </FormFieldDiv>
          <FormFieldDiv>
            <label>category</label>
            <Field
              name="category"
              component="input"
              placeholder={
                data.category && data.category.name ? data.category.name : "..."
              }
            />
          </FormFieldDiv>
          <FormFieldDiv>
            <label>status</label>
            <Field
              name="status"
              component="select"
              placeholder={data.status ? data.status : "..."}
            >
              <option value="available">available</option>
              <option value="pending">pending</option>
              <option value="sold">sold</option>
            </Field>
          </FormFieldDiv>
          <SubmitButton type="submit">UPDATE</SubmitButton>
        </form>
      )}
    />
  );

  return <>{MyForm()}</>;
}
