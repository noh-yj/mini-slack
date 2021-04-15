import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Input } from 'antd';
import { emailCheck } from '../shared/common';
import swal from 'sweetalert';
import axios from 'axios';
import { config } from '../config';

function DeleteModal({ status, close }) {
  const [user_id, SetUserId] = useState('');
  const findPwd = () => {
    if (user_id === '') {
      swal({
        title: '찾고자 하는 아이디를 입력해주세요.',
        icon: 'warning',
      });
      return;
    }
    if (!emailCheck(user_id)) {
      swal({
        title: '이메일 형식이 맞지 않습니다.',
        icon: 'warning',
      });
      return;
    }
    axios({
      method: 'post',
      url: `${config.api}/auth/searchPwd`,
      data: { email: user_id },
    })
      .then(() => {
        swal({
          title: '메일 전송이 완료되었습니다 😊',
          icon: 'success',
        });
        close();
        SetUserId('');
      })
      .catch(() => {
        swal({
          title: '비밀번호 찾기에 실패했습니다 😞',
          icon: 'error',
        });
        close();
        SetUserId('');
      });
  };
  return (
    <>
      {status ? (
        <>
          <Container
            onClick={() => {
              close();
              SetUserId('');
            }}
          />
          <ModalContainer>
            <TitleBox>
              <Title>비밀번호 찾기</Title>
            </TitleBox>
            <Input
              type='text'
              placeholder='아이디를 입력해주세요.'
              onChange={(e) => {
                SetUserId(e.target.value);
              }}
            />
            <br />
            <Button type='primary' block onClick={findPwd}>
              찾기
            </Button>
          </ModalContainer>
        </>
      ) : null}
    </>
  );
}

const Container = styled.div`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2000;
`;
const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-width: 500px;
  width: 50vw;
  height: 300px;
  border-radius: 10px;
  padding: 30px;
  box-sizing: border-box;
  z-index: 3000;
  @media only screen and (max-width: 768px) {
    width: 300px;
  }
`;
const TitleBox = styled.div`
  margin-bottom: 30px;
`;
const Title = styled.div`
  font-size: 21px;
  font-weight: bold;
  text-align: center;
  color: #0d0d0d;
  margin-bottom: 5px;
`;
export default DeleteModal;
