import React, { useMemo, useState } from "react";
import PetForm from "./PetForm";
import { FORM_ERROR } from "final-form";
import { addPet } from "../service/petsAPI";
import { useNavigate } from "react-router-dom";
import Prompt from "./Prompt";

export default function AddPet() {
  const [formChanged, setFormChanged] = useState(false);

  const initialValues = useMemo(
    () => ({
      id: 0,
      name: "",
      photoUrls: ["string"],
      status: "available",
    }),
    []
  );

  const navigate = useNavigate();

  function onAddSubmit(values) {
    const newData = {
      ...initialValues,
      name: values.name,
      status: values.status,
    };

    const callAddPet = async () => {
      const response = await addPet(newData);
      if (!response)
        return { [FORM_ERROR]: "Something happened! Please try again!" };
      else {
        navigate(`/pets/${response.id}`);
      }
    };

    return callAddPet();
  }

  return (
    <>
      <Prompt
        title="Are you sure?"
        subtitle="If you leave the page, every change made will be lost!"
        primaryButtonMessage="Yes! Leave the page!"
        secondaryButtonMessage="No! Stay on page!"
        when={formChanged}
      />
      <PetForm
        initialValues={initialValues}
        onSubmit={onAddSubmit}
        type="update"
        setFormChanged={setFormChanged}
      ></PetForm>
    </>
  );
}
