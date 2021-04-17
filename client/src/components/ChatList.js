import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Empty, Spin } from 'antd';
import { WechatOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as chatActions } from '../redux/modules/chat';
import Msg from './Msg';

function ChatList({ targetName }) {
  const dispatch = useDispatch();
  // 스토어에서 채팅리스트 가져옴
  const msgList = useSelector((state) => state.chat.chat_list);
  const loading = useSelector((state) => state.chat.is_loading);

  // 채팅 생성 시 또는 채팅방 들어갈때 스크롤이 있을경우 가장 최신 채팅을 보게함
  const endPoint = useRef(null);
  const bottomView = () => {
    endPoint.current?.scrollIntoView();
  };
  useEffect(() => {
    // 로드될때 채팅 목록 디스패치
    dispatch(chatActions.loadChatList());
    // 메세지 보낼때 디스패치
    dispatch(chatActions.addChatList());
  }, [dispatch]);

  useEffect(() => {
    bottomView();
  }, [msgList]);

  return (
    <>
      {loading ? (
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
      ) : (
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
            <div ref={endPoint}></div>
          </ChatBox>
        </>
      )}
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
