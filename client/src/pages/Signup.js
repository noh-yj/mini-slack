import React, { useState } from 'react';
import styled from 'styled-components';
import { emailCheck, userpasswordCheck } from '../shared/common';
import axios from 'axios';
// 회원가입 페이지

function Signup(props) {
  const [user_email, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [user_name, setUserName] = useState('');

  const signup = () => {
    // 유효성 검증
    if (
      password === '' ||
      passwordCheck === '' ||
      user_name === '' ||
      user_email === ''
    ) {
      window.alert('회원 정보를 모두 입력하세요.');
      return;
    }
    if (password !== passwordCheck) {
      window.alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
      return;
    }
    if (!userpasswordCheck(password) || !userpasswordCheck(passwordCheck)) {
      window.alert('비밀번호는 형식이 맞지 않습니다.');
      return;
    }

    if (!emailCheck(user_email)) {
      window.alert('이메일 형식이 맞지 않습니다.');
      return;
    }
  };
  const checkEmail = () => {
    axios({
      method: 'post',
      url: `/auth/checkEmail`,
      data: { email: user_email },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Container>
      <MainContainer>
        <TitleBox>
          <Title>회원 가입</Title>
        </TitleBox>
        <SignupTitleBox>
          <SignupTitle>회원 정보 입력</SignupTitle>
        </SignupTitleBox>
        <SignupBox>
          <table>
            <tbody>
              <tr>
                <th>아이디</th>
                <td>
                  <input
                    type='text'
                    placeholder='ex) abc@email.com'
                    onChange={(e) => {
                      setUserEmail(e.target.value);
                    }}
                  />
                </td>
                <td>
                  <IdCheckBtn onClick={checkEmail}>중복확인</IdCheckBtn>
                </td>
              </tr>
              <tr>
                <th>비밀번호</th>
                <td>
                  <input
                    type='password'
                    placeholder='영문, 숫자 조합 4~16자 이내'
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </td>
              </tr>
              <tr>
                <th>비밀번호 확인</th>
                <td>
                  <input
                    type='password'
                    onChange={(e) => {
                      setPasswordCheck(e.target.value);
                    }}
                  />
                </td>
              </tr>
              <tr>
                <th>이름</th>
                <td>
                  <input
                    type='text'
                    onChange={(e) => {
                      setUserName(e.target.value);
                    }}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </SignupBox>
        <div>
          <SignupBtn onClick={signup}>회원가입</SignupBtn>
        </div>
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
  @media only screen and (max-width: 768px) {
    margin: auto 20px;
  }
`;

const TitleBox = styled.div`
  margin-top: 55px;
`;
const Title = styled.div`
  font-size: 21px;
  font-weight: bold;
  text-align: center;
  color: #0d0d0d;
  margin-bottom: 5px;
`;
const SignupTitleBox = styled.div`
  margin-top: 30px;
`;
const SignupTitle = styled.div`
  color: #000;
  font-weight: bold;
  text-align: center;
  padding-bottom: 10px;
  border-bottom: 2px solid #000;
`;

const SignupBox = styled.div`
  padding: 15px 20px 20px;
  @media only screen and (max-width: 768px) {
    padding: 15px 0 15px;
  }
  & table {
    border-spacing: 0;
    border: 0;
    border-collapse: collapse;
    width: 100%;
    height: 100%;
    & tbody {
      margin: 0;
      padding: 0;
      & th {
        height: 15px;
        font-size: 13px;
        text-align: left;
        color: #2c2c2c;
        width: 30%;
        vertical-align: initial;
        line-height: 44px;
      }
      & td {
        padding-bottom: 5px;
        & input {
          width: 100%;
          height: 44px;
          font-size: 11px;
          color: #2c2c2c;
          margin-bottom: 10px;
          border-radius: 2px;
          border: 0.7px solid #dadada;
          padding: 14px;
          box-sizing: border-box;
        }
      }
    }
  }
`;

const IdCheckBtn = styled.button`
  width: 100%;
  height: 44px;
  font-size: 13px;
  background: #ff6f61;
  color: #fff;
  margin-bottom: 10px;
  border-radius: 2px;
  margin-left: 10px;
  border: 0.7px solid #e7e7e7;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  @media only screen and (max-width: 768px) {
    width: 60px;
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

export default Signup;
