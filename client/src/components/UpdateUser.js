import React from 'react';
import styled from 'styled-components';
import { Button, Input } from 'antd';

function UpdateUser({ status, close }) {
  return (
    <>
      {status ? (
        <>
          <Container onClick={close} />
          <ModalContainer>
            <TitleBox>
              <Title>내 프로필 편집</Title>
            </TitleBox>
            <Input type='text' placeholder='성명' />
            <Input type='text' placeholder='상태메세지' />
            <Input type='text' placeholder='비밀번호' />
            <Input type='text' placeholder='비밀번호 확인' />
            <br />
            <Button type='default' block>
              취소
            </Button>
            <br />
            <Button type='primary' block>
              변경사항 저장
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
  height: 800px;
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

export default UpdateUser;
