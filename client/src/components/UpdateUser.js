import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Button, Input, Image } from 'antd';
import { CloseOutlined, UploadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as userActions } from '../redux/modules/user';

function UpdateUser({ status, close }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const fileInput = useRef();
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [comment_myself, setCommentMyself] = useState('');
  const [pwd, setPwd] = useState('');
  const [pwdChk, setPwdChk] = useState('');
  console.log(user);
  console.log(file, comment_myself, pwd, pwdChk);
  const selectFile = (e) => {
    setFile(fileInput.current.files[0]);
    const reader = new FileReader();
    // 현재 선택된 파일을 dataurl로 변환
    reader.readAsDataURL(fileInput.current.files[0]);
    // 변환된 dataurl을 preview state에 저장
    reader.onload = () => {
      setPreview(reader.result);
    };
  };
  const updateProfile = () => {
    // 일반 유저
    if (!user?.snsId) {
      dispatch(userActions.updateUserDB(file, comment_myself, pwd));
    }
    // 소셜로그인 유저
    dispatch(userActions.updateUserDB(file, comment_myself));
  };

  return (
    <>
      {status ? (
        <>
          <Container onClick={close} />
          <ModalContainer>
            <TitleBox>
              <Title>내 프로필 편집</Title>
              <CloseBtn onClick={close}>
                <CloseOutlined />
              </CloseBtn>
            </TitleBox>
            <UpdateBox>
              <InputBox>
                <span>이름</span>
                <Input
                  type='text'
                  placeholder='성명'
                  value={user?.nickname}
                  disabled
                />
                <span>상태 메세지</span>
                <Input
                  type='text'
                  placeholder='상태 메세지'
                  value={comment_myself}
                  onChange={(e) => {
                    setCommentMyself(e.target.value);
                  }}
                />
                {user?.snsId ? null : (
                  <>
                    <span>비밀번호</span>
                    <Input
                      type='password'
                      placeholder='비밀번호'
                      onChange={(e) => {
                        setPwd(e.target.value);
                      }}
                    />
                    <span>비밀번호 확인</span>
                    <Input
                      type='password'
                      placeholder='비밀번호 확인'
                      onChange={(e) => {
                        setPwdChk(e.target.value);
                      }}
                    />
                  </>
                )}
              </InputBox>
              <ImgBox>
                <span>이미지 업로드</span>
                <Image
                  width={200}
                  src={preview ? preview : user?.profile_img}
                  fallback='data:image/png;base64,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'
                />
                <br />
                <InputFileLabel htmlFor='input-file'>
                  <UploadOutlined />
                </InputFileLabel>

                <InputFile
                  type='file'
                  id='input-file'
                  ref={fileInput}
                  onChange={selectFile}
                />
              </ImgBox>
            </UpdateBox>
            <br />
            <br />
            <Button type='default' onClick={close} block>
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
  z-index: 10;
`;
const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 600px;
  width: 50vw;
  height: 700px;
  border-radius: 10px;
  padding: 30px;
  box-sizing: border-box;
  z-index: 20;
  cursor: default;
  @media only screen and (max-width: 768px) {
    width: 300px;
  }
`;
const TitleBox = styled.div`
  margin-bottom: 30px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 20px 20px 20px 20px;
  box-sizing: border-box;
`;
const Title = styled.div`
  width: 200px;
  font-size: 21px;
  font-weight: bold;
  text-align: center;
  color: #0d0d0d;
  margin-bottom: 5px;
`;

const CloseBtn = styled.div`
  cursor: pointer;
  font-size: 18px;
`;
const UpdateBox = styled.div`
  display: flex;
  justify-content: space-between;
`;
const InputBox = styled.div`
  box-sizing: border-box;
  padding: 0 20px;
  & input {
    margin: 15px 0;
  }
  & span {
    color: #0d0d0d;
    font-size: 12px;
  }
`;
const ImgBox = styled.div`
  display: flex;
  flex-direction: column;
  & span {
    margin: 10px auto;
    font-size: 20px;
  }
`;

const InputFileLabel = styled.label`
  background: none;
  outline: none;
  border: 1px solid;
  padding: 6px 25px;
  font-size: 24px;
  color: #ced0d4;
  cursor: pointer;
  text-align: center;
  &:hover {
    color: #1890ff;
  }
`;
const InputFile = styled.input`
  display: none;
`;

export default UpdateUser;
