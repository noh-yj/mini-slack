import React, { useState } from "react";
import styled from "styled-components";
import { PictureOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as postActions } from "../redux/modules/post";

function EditPostModal({ status, close, post_info }) {
  const userInfo = useSelector((state) => state.user.user);
  //const dispatch = useDispatch();
  // Image file & preview image setting
  const [file, setFile] = React.useState(null);
  const [preview, setPreview] = React.useState(post_info.imgUrl);

  // contents upload
  const [contents, setContents] = React.useState(post_info.content);
  const changeContents = (e) => {
    setContents(e.target.value);
  };

  //사진 업로드

  const selectFile = (e) => {
    if (e.target.files[0] === undefined) {
      setFile(null);
      setPreview("http://via.placeholder.com/400x300");
      return;
    }
    //file state에 현재 선택된 파일 저장
    setFile(e.target.files[0]);
    const reader = new FileReader();
    // 현재 선택된 파일을 dataurl로 변환
    reader.readAsDataURL(e.target.files[0]);
    // 변환된 dataurl을 preview state에 저장
    reader.onload = () => {
      setPreview(reader.result);
    };
  };

  return (
    <>
      {status ? (
        <>
          <Container
            onClick={(e) => {
              // setContents(null);
              //setPreview(null);
              close(e);
            }}
          >
            <ModalFrame>
              <ModalTitle>게시물 수정하기</ModalTitle>
              <ModalUserFrame>
                <Avatar
                  size={40}
                  style={{
                    backgroundColor: "#87d068",
                    cursor: "pointer",
                    margin: "0 8px 0 0",
                  }}
                  src={userInfo?.profile_img}
                >
                  {userInfo?.profile_img === " " ? userInfo?.nickname[0] : null}
                </Avatar>
                <span>{userInfo ? userInfo.nickname : "User Name"}</span>
              </ModalUserFrame>
              <ElTextarea
                wrap="hard"
                placeholder="무슨 생각을 하고 계시나요?"
                autoFocus
                autoComplete="true"
                onChange={changeContents}
                value={contents}
              />
              <Image src={preview} />
              {/* {file !== null ? (
                <>
                  <Image src={preview} />
                </>
              ) : null} */}
              <AdditionalPost>
                게시물에 추가
                {/* Image file uploader */}
                <InputLabel className="input-file-button" htmlFor="input-file">
                  <PictureOutlined />
                </InputLabel>
                <Input type="file" id="input-file" onChange={selectFile} />
              </AdditionalPost>
              <PostingBtn
                onClick={() => {
                  console.log("수정하기!");
                }}
              >
                수정
              </PostingBtn>
            </ModalFrame>
          </Container>
        </>
      ) : null}
    </>
  );
}

// Modal Styling

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2000;
`;

const ModalFrame = styled.div`
  width: 500px;
  min-height: 50%;
  max-height: 80%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #ffffff;
  border-radius: 10px;
  padding: 8px 16px;
  filter: drop-shadow(0 0 0.1rem lightgray);
  z-index: 5000;

  @media only screen and (max-width: 768px) {
    width: 80%;
  }
`;

const ModalTitle = styled.h2`
  text-align: center;
  border-bottom: 1px solid #ececec;
  font-weight: bold;
  margin: 0;
  padding: 12px 0;
`;

const ModalUserFrame = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px 0 12px 0;
  & img {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    margin-right: 8px;
  }
`;

const ElTextarea = styled.textarea`
  padding: 0 16px 40px;
  box-sizing: border-box;
  width: 100%;
  font-size: 16px;
  border: none;
  overflow: auto;
  outline: none;

  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;

  resize: none; /*remove the resize handle on the bottom right*/

  & :focus {
    border: none;
  }
`;

const AdditionalPost = styled.div`
  margin: 10px 0;
  border: 1px solid #ced0d4;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 400;
  cursor: default;

  & > div > button {
    background: none;
    border: none;
    outline: none;
    font-size: 24px;
    color: #ced0d4;
  }

  & > div > button:hover {
    color: #00a400;
    transform: scale(1.2);
    transition: all 200ms ease-in-out;
  }
`;

// Modal Button

const PostingBtn = styled.button`
  width: 100%;
  background: #ececec; //
  border: none;
  border-radius: 8px;
  outline: none;
  font-size: 16px;
  font-weight: 400;
  color: white;
  padding: 8px 0;

  &:hover {
    background: #1890ff;
  }
`;

// Image Input

const InputLabel = styled.label`
  background: none;
  border: none;
  outline: none;
  font-size: 24px;
  color: #ced0d4;
  cursor: pointer;
  &:hover {
    color: #00a400;
    transform: scale(1.2);
    transition: all 200ms ease-in-out;
  }
`;

const Input = styled.input`
  display: none;
`;

// preview image

const Image = styled.img`
  width: 40%;
  height: 40%;
`;
export default EditPostModal;
