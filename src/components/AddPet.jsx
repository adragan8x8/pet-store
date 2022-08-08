import React, { useMemo, useState, useEffect } from "react";
import PetForm from "./PetForm";
import { FORM_ERROR } from "final-form";
import { addPet } from "../service/petsAPI";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { PrimaryButton } from "../styled/PrimaryButton.styled";
import { SecondaryButton } from "../styled/SecondaryButton.styled";

export default function AddPet() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    window.history.pushState(null, document.title, window.location.pathname);
    window.addEventListener("popstate", () => setShowModal(true));
    return () =>
      window.removeEventListener("popstate", () => setShowModal(true));
  }, []);

  const initialValues = useMemo(
    () => ({
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
    }),
    []
  );

  const navigate = useNavigate();

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
      else {
        navigate(`/pets/${response.id}`);
      }
    };

    return callAddPet();
  }

  return (
    <>
      {showModal && (
        <Modal setShowModal={setShowModal}>
          <h1>Are you sure?</h1>
          <p>If you go back now, this pet won't be added!</p>
          <PrimaryButton onClick={() => navigate("/pets")}>
            Yes! Take me back!
          </PrimaryButton>
          <SecondaryButton
            onClick={() => {
              setShowModal(false);
              window.history.pushState(
                null,
                document.title,
                window.location.pathname
              );
            }}
          >
            No! I will stay!
          </SecondaryButton>
        </Modal>
      )}
      <PetForm
        initialValues={initialValues}
        onSubmit={onAddSubmit}
        type="add"
        setShowModal={setShowModal}
      ></PetForm>
    </>
  );
}
