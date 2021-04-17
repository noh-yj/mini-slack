import React, { useState } from 'react';
import styled from 'styled-components';
import { Input, Button } from 'antd';
import { useSelector } from 'react-redux';
import { actionCreators as chatActions } from '../redux/modules/chat';

function ChatInput({ room }) {
  const [msg, setMsg] = useState('');
  const userImg = useSelector((state) => state.user.user?.profile_img);
  const username = useSelector((state) => state.user.user?.nickname);

  // 채팅 전송 시 방 정보, 유저 이름, 유저 프로필, 메세지 전송
  const Info = {
    room: room,
    username: username,
    profile_img: userImg,
    msg: msg,
  };
  const msgSubmit = () => {
    // 아무것도 입력하지 않은 경우 리턴
    if (msg === '') {
      return;
    }
    // 채팅 전송
    chatActions.socket.emit('send', {
      room: Info.room,
      username: Info.username,
      profile_img: Info.profile_img,
      msg: Info.msg,
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
