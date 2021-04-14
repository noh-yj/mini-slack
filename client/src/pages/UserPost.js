import React, { useState } from 'react';
import styled from 'styled-components';
import { FormOutlined, SmileOutlined } from '@ant-design/icons';
import PostWriteModal from '../components/PostWriteModal';
import Header from '../components/Header';
import Sider from '../components/Sidebar';
import UserPostList from '../components/UserPostList';

function UserPost(props) {
  // Modal control operations
  const [isModalOpen, setModal] = useState(false);

  const modalBtn = () => {
    setModal(true);
  };

  const closeModal = (event) => {
    console.log(event);
    if (event === undefined) {
      setModal(false);
      return;
    }
    // 현재 함수가 걸려있는 target 과 구분해주기 위함.
    if (event.target !== event.currentTarget) {
      return;
    }
    setModal(false);
  };

  return (
    <>
      <MainFrame>
        <Header />
        <MainContent>
          <MainLeft>
            <Sider />
          </MainLeft>
          <MainRight>
            <UserPostList {...props} />
          </MainRight>
        </MainContent>
        <PostWriteBtn onClick={modalBtn}>
          <FormOutlined style={{ fontSize: '30px' }} />
        </PostWriteBtn>
        <PostWriteModal status={isModalOpen} close={closeModal} />
        {/* 심심해서 만든거 */}
        <div
          style={{
            fontSize: '24px',
            height: '95px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          Happy coding&nbsp;&nbsp;&nbsp;&nbsp;
          <SmileOutlined spin />
        </div>
      </MainFrame>
    </>
  );
}
const MainFrame = styled.div`
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

const MainContent = styled.section`
  display: flex;
  background: #f0f2f5;
  min-height: 80vh;
  box-sizing: border-box;
`;

const MainLeft = styled.section`
  height: 100%;
  min-height: 80vh;
  padding: 16px 24px;
  border-right: 1px solid rgb(235, 237, 240);
  flex-basis: 25%;
`;

const MainRight = styled.section`
  flex-basis: 75%;
  padding: 16px 24px;
  min-height: 80vh;
  &::after {
  }
`;

const PostWriteBtn = styled.button`
  position: fixed;
  top: 80%;
  right: 5%;
  &:hover {
    color: #1890ff;
    transition: all 200ms ease-in-out;
  }
`;
export default UserPost;
