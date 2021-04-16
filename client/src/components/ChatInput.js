import React, { useState } from 'react';
import styled from 'styled-components';
import { Input, Button } from 'antd';
import { useSelector } from 'react-redux';

function ChatInput({ socket, room }) {
  const [msg, setMsg] = useState('');
  const userImg = useSelector((state) => state.user.user?.profile_img);
  const username = useSelector((state) => state.user.user?.nickname);
  const msgSubmit = () => {
    socket.emit('send', {
      room: room,
      username: username,
      profile_img: userImg,
      msg: msg,
    });
    setMsg('');
  };
  return (
    <>
      <InputBox>
        <Input
          placeholder='내용을 입력하세요...'
          suffix={
            <Button type='primary' onClick={msgSubmit}>
              전송
            </Button>
          }
          style={{
            padding: '0',
            paddingLeft: '14px',
          }}
          onChange={(e) => {
            setMsg(e.target.value);
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              msgSubmit();
            }
          }}
          value={msg}
        />
      </InputBox>
    </>
  );
}

const InputBox = styled.div`
  width: 100%;
  bottom: 0;
`;

export default ChatInput;
