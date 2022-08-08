import React, { useState } from "react";
import { deletePet } from "../service/petsAPI";
import Modal from "./Modal";
import { SubmitButton } from "../styled/SubmitButton.styled";
import { SubmitButtonSecondary } from "../styled/SubmitButtonSecondary.styled";

export default function DeletePet({
  index,
  showModal,
  setShowModal,
  onDelete,
}) {
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    const response = await deletePet(index);
    if (response.ok) {
      setError(null);
      setShowModal(false);
      onDelete();
    } else setError("There was an error! Try again!");
  };
  if (showModal)
    return (
      <Modal setShowModal={setShowModal}>
        <p style={{ color: "darkred" }}>{error}</p>
        <h1>Are you sure you want to delete this?</h1>
        <p>
          If you press that delete button, you won't be able to get this pet
          back again!
        </p>
        <SubmitButton onClick={() => handleDelete()}>delete</SubmitButton>
        <SubmitButtonSecondary onClick={() => setShowModal(false)}>
          cancel
        </SubmitButtonSecondary>
      </Modal>
    );
}
