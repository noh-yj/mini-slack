import React, { useState } from 'react';
import styled from 'styled-components';
import { Input, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { actionCreators as chatActions } from '../redux/modules/chat';

function ChatInput({ room }) {
  const dispatch = useDispatch();
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
    // 채팅 전송, 디스패치
    dispatch(chatActions.msgSubmit(Info));
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
