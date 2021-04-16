import React, { useEffect } from 'react';
import styled from 'styled-components';
import { WechatOutlined } from '@ant-design/icons';
import { Empty } from 'antd';
import Msg from './Msg';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as chatActions } from '../redux/modules/chat';

function ChatList({ targetName }) {
  const dispatch = useDispatch();
  // 스토어에서 채팅리스트 가져옴
  const msgList = useSelector((state) => state.chat.chat_list);

  useEffect(() => {
    // 로드될때 채팅 목록 디스패치
    dispatch(chatActions.loadChatList());
    // 메세지 보낼때 디스패치
    dispatch(chatActions.addChatList());

    return () => {
      // 채팅 나가면 소켓 연결 해제
      chatActions.socket.disconnect();
    };
  }, [dispatch]);
  return (
    <>
      <Title>
        <WechatOutlined style={{ color: '#6F9CEB', marginRight: '12px' }} />
        {targetName}님과 대화
      </Title>
      <ChatBox>
        {msgList.length === 0 ? (
          <EmptyPost>
            <Empty />
          </EmptyPost>
        ) : null}
        {msgList.map((val, idx) => {
          return (
            <>
              <Msg key={idx} {...val} />
            </>
          );
        })}
      </ChatBox>
    </>
  );
}

const Title = styled.h1`
  color: rgba(0, 0, 0, 0.7);
  font-size: 20px;
  text-align: center;
`;

const ChatBox = styled.div`
  padding: 20px;
`;
const EmptyPost = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: default;
`;

export default ChatList;
