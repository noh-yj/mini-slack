import React, { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { FormOutlined, SmileOutlined } from '@ant-design/icons';
import swal from 'sweetalert';
import PostWriteModal from '../components/PostWriteModal';
import Header from '../components/Header';
import Sider from '../components/Sidebar';
import PostList from '../components/PostList';
import { getCookie } from '../shared/Cookie';

const Main = (props) => {
  const { history } = props;
  // 쿠키에 저장된 토큰 조회
  const cookie = getCookie('is_login') ? true : false;
  // 토큰이 없을 경우 사용을 못하게 로그인 화면으로 이동시키기
  if (!cookie) {
    swal({
      title: '토큰이 만료되었거나 잘못된 접근입니다.',
      text: '다시 로그인 해주세요!',
      icon: 'error',
    });
    history.replace('/');
  }
  // Modal control operations
  const [isModalOpen, setModal] = useState(false);

  const modalBtn = () => {
    setModal(true);
  };

  const closeModal = (event) => {
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
            <PostList />
          </MainRight>
        </MainContent>
        <PostWriteBtn onClick={modalBtn}>
          <FormOutlined style={{ fontSize: '30px' }} />
        </PostWriteBtn>
        <PostWriteModal status={isModalOpen} close={closeModal} />
        {/* 심심해서 만든거 */}
        <Footer>
          🎨 Palette&nbsp;&nbsp;&nbsp;&nbsp;
          <SmileOutlined spin />
        </Footer>
      </MainFrame>
    </>
  );
};

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
const Footer = styled.div`
  font-size: 24px;
  height: 95px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;
export default Main;
