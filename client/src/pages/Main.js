import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { FormOutlined, PictureOutlined } from "@ant-design/icons";
import PostWriteModal from "../components/PostWriteModal";

const Main = (props) => {
  // Modal control operations
  const [isModalOpen, setModal] = useState(false);

  const modalBtn = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  return (
    <>
      <MainFrame>
        <button onClick={modalBtn}>
          <FormOutlined style={{ fontSize: "30px" }} />
        </button>
        <PostWriteModal status={isModalOpen} close={closeModal} />
      </MainFrame>
    </>
  );
};

const MainFrame = styled.div`
  width: 100%;
  min-height: 100vh;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  & > button {
    border: none;
    outline: none;
    background: none;
  }

  & > button:hover {
    transform: scale(1.1);
  }

  @media only screen and (max-width: 768px) {
    margin: 30px auto;
  }
`;

export default Main;
