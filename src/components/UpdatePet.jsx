import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPet, updatePet } from "../service/petsAPI";
import PetForm from "./PetForm";
import { FORM_ERROR } from "final-form";

export default function UpdatePet() {
  const [initialValues, setInitialValues] = useState({});
  const params = useParams();
  const petID = params.petID;

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPet(petID);
      setInitialValues(data);
    };
    fetchData();
  }, [petID]);

  async function onUpdateSubmit(values) {
    const newData = {
      ...initialValues,
      name: values.name,
      status: values.status,
      category: {
        ...initialValues.category,
        name: values.category,
      },
    };
    const response = await updatePet(newData);
    if (!response)
      return { [FORM_ERROR]: "Something happened! Please try again!" };
  }

  return (
    <PetForm
      initialValues={initialValues}
      onSubmit={onUpdateSubmit}
      type="update"
    ></PetForm>
  );
}
