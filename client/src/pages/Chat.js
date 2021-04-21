import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Spin } from 'antd';
import { SmileOutlined, MenuOutlined } from '@ant-design/icons';
import swal from 'sweetalert';
import { getCookie } from '../shared/Cookie';
import { useSelector } from 'react-redux';
import { actionCreators as chatActions } from '../redux/modules/chat';
import Header from '../components/Header';
import Sider from '../components/Sidebar';
import ChatMain from '../components/ChatMain';
import ChatInput from '../components/ChatInput';

function Chat(props) {
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
    // 로그인창으로 이동
    history.replace('/');
  }
  const makeRoom = [props.match.params.otherId, props.match.params.myId].sort();
  // 방
  const room = makeRoom[0] + '-' + makeRoom[1];
  // 대화 상대 이름
  const targetName = props.match.params.otherName;
  // 내 이름
  const username = useSelector((state) => state.user.user?.nickname);
  // 방 생성 정보
  const Info = {
    room: room,
    username: username,
  };

  useEffect(() => {
    // 웹소켓 연결
    chatActions.socket.connect();
    return () => {
      // 채팅 페이지 나가면 웹소켓 연결 해제
      chatActions.socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      // 채팅 방 나가기
      chatActions.socket.emit('leave', { room: room });
    };
  }, [room]);

  //   웹소켓 연결이 성공하면 채팅 방 생성
  if (chatActions.socket) {
    chatActions.socket.emit('join', Info);
  }

  // 반응형 햄버거 토글
  const [toggle, setToggle] = useState(false);
  const click = () => {
    setToggle(!toggle);
  };

  return (
    <>
      <MainFrame>
        <Header />
        <ToggleBtn>
          <MenuOutlined onClick={click} />
        </ToggleBtn>
        <MainContent>
          <MainLeft toggle={toggle}>
            <Sider room={room} />
          </MainLeft>
          <MainRight toggle={toggle}>
            {chatActions.socket ? (
              <>
                <ChatMain targetName={targetName} room={room} />
                <ChatInput room={room} />
              </>
            ) : (
              <Spin
                size='large'
                tip='Loading...'
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
              />
            )}
          </MainRight>
        </MainContent>
        <Footer>
          🎨 Palette&nbsp;&nbsp;&nbsp;&nbsp;
          <SmileOutlined spin />
        </Footer>
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
`;

const ToggleBtn = styled.div`
  width: 20px;
  height: 25px;
  font-size: 20px;
  position: fixed;
  top: 14px;
  left: 10px;
  display: none;
  @media only screen and (max-width: 375px) {
    display: block;
  }
`;

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
  display: block;
  @media only screen and (max-width: 375px) {
    display: ${(props) => (props.toggle ? 'block' : 'none')};
    flex-basis: ${(props) => (props.toggle ? '100%' : '0%')};
  }
`;

const MainRight = styled.section`
  flex-basis: 75%;
  padding: 16px 24px;
  min-height: 80vh;
  @media only screen and (max-width: 768px) {
    padding: 16px 0;
  }

  @media only screen and (max-width: 375px) {
    display: ${(props) => (props.toggle ? 'none' : 'block')};
    flex-basis: ${(props) => (props.toggle ? '0%' : '100%')};
    padding: 5px;
  }
`;

const Footer = styled.div`
  font-size: 24px;
  height: 95px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  cursor: default;
  @media only screen and (max-width: 375px) {
    height: 40px;
    font-size: 18px;
  }
`;

export default Chat;
