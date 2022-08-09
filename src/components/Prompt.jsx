import React, { useCallback, useContext, useEffect, useState } from "react";
import { UNSAFE_NavigationContext as NavigationContext } from "react-router-dom";
import Modal from "./Modal";
import { PrimaryButton } from "../styled/PrimaryButton.styled";
import { SecondaryButton } from "../styled/SecondaryButton.styled";

export default function Prompt({
  title,
  subtitle,
  primaryButtonMessage,
  secondaryButtonMessage,
  when,
}) {
  const { navigator } = useContext(NavigationContext);
  const [showModal, setShowModal] = useState(false);
  const [currentTx, setCurrentTx] = useState(null);

  const blocker = useCallback(
    (tx) => {
      setCurrentTx(tx);
      setShowModal(true);
    },
    [setShowModal]
  );

  useEffect(() => {
    if (!when) return;
    const unblock = navigator.block((tx) => {
      const autoUnblockingTx = {
        ...tx,
        retry() {
          unblock();
          tx.retry();
        },
      };
      blocker(autoUnblockingTx);
    });
    return unblock;
  }, [blocker, when, navigator]);

  return (
    <>
      {showModal && (
        <Modal setShowModal={setShowModal}>
          <h1>{title}</h1>
          <p>{subtitle}</p>
          <PrimaryButton
            onClick={() => {
              currentTx.retry();
            }}
          >
            {primaryButtonMessage}
          </PrimaryButton>
          <SecondaryButton
            onClick={() => {
              setShowModal(false);
            }}
          >
            {secondaryButtonMessage}
          </SecondaryButton>
        </Modal>
      )}
    </>
  );
}
