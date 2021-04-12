import React, { useState } from "react";
import styled from "styled-components";
import PostingModal from "../components/Modal";
import { FormOutlined } from "@ant-design/icons";

const Main = (props) => {
  // Modal control operations
  const [isModalOpen, setModal] = useState(false);
  // Modal toggle button
  const modalBtn = () => {
    if (isModalOpen) {
      setModal(false);
      return;
    }
    setModal(true);
    return;
  };

  return (
    <MainFrame>
      <TestFrame>
        <button onClick={modalBtn}>
          <FormOutlined style={{ fontSize: "30px" }} />
        </button>
        {isModalOpen && <PostingModal />}
      </TestFrame>
    </MainFrame>
  );
};

const MainFrame = styled.section`
  @media only screen and (max-width: 768px) {
    margin: 30px auto;
  }
`;

const TestFrame = styled.div`
  width: 100%;
  min-height: 100vh;
  background: yellow;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  & button {
    border: none;
    outline: none;
    background: none;
  }

  & > button:hover {
    transform: scale(1.1);
  }
`;

export default Main;
