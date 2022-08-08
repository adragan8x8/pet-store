import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPet, updatePet } from "../service/petsAPI";
import PetForm from "./PetForm";
import { FORM_ERROR } from "final-form";
import Modal from "./Modal";
import { PrimaryButton } from "../styled/PrimaryButton.styled";
import { SecondaryButton } from "../styled/SecondaryButton.styled";

export default function UpdatePet() {
  const [initialValues, setInitialValues] = useState({});
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const params = useParams();
  const petID = params.petID;

  useEffect(() => {
    window.history.pushState(null, document.title, window.location.pathname);
    window.addEventListener("popstate", () => setShowModal(true));
    return () =>
      window.removeEventListener("popstate", () => setShowModal(true));
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPet(petID);
      setInitialValues(data);
    };
    fetchData();
  }, [petID]);

  if (navigate.action === "POP") {
    setShowModal(true);
    navigate.block();
  }

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
    <>
      {showModal && (
        <Modal setShowModal={setShowModal}>
          <h1>Are you sure?</h1>
          <p>If you go back now, every change made will be lost!</p>
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
        onSubmit={onUpdateSubmit}
        type="update"
        linkBack={`/pets/`}
        setShowModal={setShowModal}
      ></PetForm>
    </>
  );
}
