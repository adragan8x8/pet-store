import React, { useState } from "react";
import { deletePet } from "../service/petsAPI";
import Modal from "./Modal";
import { PrimaryButton } from "../styled/PrimaryButton.styled";
import { SecondaryButton } from "../styled/SecondaryButton.styled";

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
        <PrimaryButton onClick={() => handleDelete()}>delete</PrimaryButton>
        <SecondaryButton onClick={() => setShowModal(false)}>
          cancel
        </SecondaryButton>
      </Modal>
    );
}
