import React, { useState } from 'react';
import styled from 'styled-components';
import { Input, Button } from 'antd';

function ChatInput({ socket, username, room }) {
  const [msg, setMsg] = useState('');
  const msgSubmit = () => {
    socket.emit('send', {
      room: room,
      username: username,
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
          style={{ padding: '0', paddingLeft: '14px' }}
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
  width: 95%;
  position: absolute;
  bottom: 20px;
`;

export default ChatInput;
