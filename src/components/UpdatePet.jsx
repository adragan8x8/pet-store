import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPet, updatePet } from "../service/petsAPI";
import PetForm from "./PetForm";
import { FORM_ERROR } from "final-form";
import Prompt from "./Prompt";

export default function UpdatePet() {
  const [initialValues, setInitialValues] = useState({});
  const [formChanged, setFormChanged] = useState(false);

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
    };
    const response = await updatePet(newData);
    if (!response)
      return { [FORM_ERROR]: "Something happened! Please try again!" };
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
        onSubmit={onUpdateSubmit}
        type="update"
        setFormChanged={setFormChanged}
      ></PetForm>
    </>
  );
}
