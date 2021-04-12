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

  const closeModal = (event) => {
    if (event.target != event.currentTarget) {
      return;
    }
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
  padding: 8px 12px;
  background: yellow;

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

// Styling header
const MainHeader = styled.nav`
  width: 100%;
  background: red;
`;

const MainLogo = styled.img``;

const MainLeft = styled.section``;

const MainRight = styled.section`
  &::after {
  }
`;

export default Main;
