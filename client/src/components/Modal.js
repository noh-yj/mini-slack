import React, { useState } from "react";
import styled from "styled-components";

const Modal = (props) => {
  // Modal close button
  const [isModalOpen, setModal] = useState(true);

  const closeModal = () => {
    setModal(false);
  };

  return (
    <React.Fragment>
      {isModalOpen && (
        <ModalFrame>
          <ModalClose onClick={closeModal}>닫기</ModalClose>
        </ModalFrame>
      )}
    </React.Fragment>
  );
};

const ModalFrame = styled.div`
  width: 500px;
  min-height: 428px;
  max-height: 80vh;
  pointer-events: all;
  position: absolute;
  background: black;
`;

const ModalClose = styled.button`
  background: gray !important;
  color: white;
`;

export default Modal;
