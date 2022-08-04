import React from "react";
import ReactDOM from "react-dom";
import { Overlay } from "../styled/Overlay.styled";
import { InnerModal } from "../styled/InnerModal";

export default function DeleteModal({ children, setShowModal }) {
  return ReactDOM.createPortal(
    <>
      <Overlay onClick={() => setShowModal(false)}>
        <InnerModal onClick={(e) => e.stopPropagation()}>{children}</InnerModal>
      </Overlay>
    </>,
    document.body
  );
}
