import React, { useState, useEffect } from "react";
import PetForm from "./PetForm";
import { FORM_ERROR } from "final-form";
import { addPet } from "../petsApi/addPet";

export default function EditPet() {
  const [initialValues, setInitialValues] = useState({});

  useEffect(() => {
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
    setInitialValues(data);
  }, []);

  function onAddSubmit(values) {
    const newData = {
      ...initialValues,
      name: values.name,
      status: values.status,
      category: {
        ...initialValues.category,
        name: values.category,
      },
    };

    const callAddPet = async () => {
      const response = await addPet(newData);
      if (!response)
        return { [FORM_ERROR]: "Something happened! Please try again!" };
    };

    return callAddPet();
  }

  return (
    <PetForm
      initialValues={initialValues}
      onSubmit={onAddSubmit}
      type="add"
    ></PetForm>
  );
}
