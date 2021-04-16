import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { WechatOutlined } from '@ant-design/icons';
import { Empty } from 'antd';
import Msg from './Msg';

function ChatList({ socket, targetName }) {
  const [msgList, setMsgList] = useState([]);
  useEffect(() => {
    socket.on('receive', (res) => {
      setMsgList((msgList) => [...msgList, res]);
      //   console.log(res);
    });
    socket.on('load', (res) => {
      //   console.log(res);
      setMsgList(() => [...res]);
    });
    return () => {
      socket.disconnect();
    };
  }, [socket]);
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
