import React, { useState } from "react";
import { deletePet } from "../service/petsAPI";
import DeleteModal from "./DeleteModal";
import { SubmitButton } from "../styled/SubmitButton.styled";
import { SubmitButtonSecondary } from "../styled/SubmitButtonSecondary.styled";

export default function DeletePet({
  index,
  showModal,
  setShowModal,
  setChangeData,
}) {
  const [error, setError] = useState(null);

  const handleDelete = async () => {
    const response = await deletePet(index);
    if (response.ok) {
      setError(null);
      setShowModal(false);
      setChangeData((data) => !data);
    } else setError("There was an error! Try again!");
  };
  if (showModal)
    return (
      <DeleteModal setShowModal={setShowModal}>
        <p style={{ color: "darkred" }}>{error}</p>
        <h1>Are you sure you want to delete this?</h1>
        <p>
          If you press that delete button now you won't be able to get this pet
          back again!
        </p>
        <SubmitButton onClick={() => handleDelete()}>delete</SubmitButton>
        <SubmitButtonSecondary onClick={() => setShowModal(false)}>
          cancel
        </SubmitButtonSecondary>
      </DeleteModal>
    );
}
