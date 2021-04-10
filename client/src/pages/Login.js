import React, { useState } from 'react';

import styled from 'styled-components';

// 로그인 페이지

function Login(props) {
  const { history } = props;

  const [user_id, SetUserId] = useState('');
  const [password, setPassword] = useState('');
  const login = () => {
    if (user_id === '' || password === '') {
      window.alert('로그인 정보를 모두 입력해주세요.');
      return;
    }
  };
  return (
    <Container>
      <MainContainer>
        <TitleBox>
          <Title>로그인</Title>
        </TitleBox>

        <InputBox>
          <Input
            type='text'
            placeholder='아이디'
            onChange={(e) => {
              SetUserId(e.target.value);
            }}
          />
        </InputBox>
        <InputBox>
          <Input
            type='password'
            placeholder='비밀번호'
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </InputBox>
        <FindId>
          <span>
            아이디/비밀번호 찾기{' '}
            <img
              src='https://auth.dano.me/res/images/ec1e39bf2b6a3857a9e6bd2c3364a67f.png'
              alt='화살표'
            />
          </span>
        </FindId>
        <div>
          <LoginBtn onClick={login}>로그인</LoginBtn>
          <SignupBtn
            onClick={() => {
              history.push('/signup');
            }}
          >
            회원가입
          </SignupBtn>
        </div>
        <SnsBox>
          <SnsText>SNS로 시작하기</SnsText>
          <SnsBtnBox>
            <KakaoBtn>
              <img
                src='https://auth.dano.me/res/images/49c343639ceea64b1fe7f46e2d6442ef.svg'
                alt='카톡'
              />
              카카오톡
            </KakaoBtn>

            <GoogleBtn>
              <img
                src='https://tinder.com/static/build/m/143e05ff53bb18f3504332bca8beb85e.svg'
                alt='구글'
              />
              Google
            </GoogleBtn>
          </SnsBtnBox>
        </SnsBox>
      </MainContainer>
    </Container>
  );
}

const Container = styled.div`
  margin: 150px auto;
  min-width: 290px;
  max-width: 460px;
  cursor: default;
  @media only screen and (max-width: 768px) {
    margin: 30px auto;
  }
`;

const MainContainer = styled.div`
  margin: auto 40px;
`;

const TitleBox = styled.div`
  margin-bottom: 55px;
`;
const Title = styled.div`
  font-size: 21px;
  font-weight: bold;
  text-align: center;
  color: #0d0d0d;
  margin-bottom: 5px;
`;

const InputBox = styled.div`
  margin-top: 15px;
`;

const Input = styled.input`
  width: 100%;
  border: 1px solid #e7e7e7;
  background-color: #fff;
  text-align: left;
  font-size: 13px;
  color: #2c2c2c;
  padding: 0 15px;
  height: 45px;
  box-sizing: border-box;
`;

const FindId = styled.div`
  text-align: right;
  margin: 12px 0;
  font-size: 13px;
  & span {
    color: #b0b0b0;
    text-decoration: underline;
    margin: 0;
    padding: 0;
    cursor: pointer;
    & img {
      width: 7px;
      margin-left: 5px;
    }
  }
`;
const LoginBtn = styled.button`
  width: 100%;
  height: 45px;
  border-radius: 2px;
  font-size: 14px;
  border: 1px solid #e7e7e7;
  background-color: #fbfbfb;
  color: #ff6f61;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;
const SignupBtn = styled.button`
  margin-top: 10px;
  color: #fff;
  background-color: #ff6f61;
  width: 100%;
  height: 45px;
  border-radius: 2px;
  font-size: 14px;
  border: 1px solid #e7e7e7;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;

const SnsBox = styled.div`
  padding-top: 40px;
`;
const SnsText = styled.div`
  color: rgb(59, 59, 59);
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 16px;
  line-height: 14px;
`;
const SnsBtnBox = styled.div`
  display: flex;
  justify-content: space-between;
`;
const KakaoBtn = styled.a`
  height: 50px;
  width: 47%;
  border-radius: 27.5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
  background-color: rgb(254, 229, 0);
  border: 0;
  cursor: pointer;
  & img {
    width: 22px;
    margin-right: 12px;
  }
`;
const GoogleBtn = styled.a`
  height: 50px;
  width: 47%;
  border-radius: 27.5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(218, 218, 218);
  cursor: pointer;
  & img {
    width: 22px;
    margin-right: 12px;
  }
`;

export default Login;
